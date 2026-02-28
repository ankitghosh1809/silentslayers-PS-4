import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { analyzeReview } from '@/lib/gemini';
import axios from 'axios';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { branchId, content, rating, customerName, customerEmail, staffId } = body;

        if (!branchId || !content || !rating) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Create Raw Review in DB
        const review = await prisma.review.create({
            data: {
                branchId,
                content,
                rating,
                customerName,
                customerEmail,
                staffId,
                source: 'INTERNAL',
            },
        });

        // 2. Send to n8n Webhook for processing
        // Note: In an enterprise app, this should be an async background job or a queue
        const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

        if (n8nWebhookUrl) {
            // Non-blocking trigger to n8n
            axios.post(n8nWebhookUrl, {
                reviewId: review.id,
                content: review.content,
                rating: review.rating,
                branchId: review.branchId,
            }).catch(err => console.error("n8n Trigger Error:", err.message));
        }

        // 3. Optional: Immediate Gemini analysis as fallback if n8n is slow
        const aiAnalysis = await analyzeReview(content);

        if (aiAnalysis) {
            await prisma.review.update({
                where: { id: review.id },
                data: {
                    sentiment: aiAnalysis.sentiment,
                    categories: aiAnalysis.categories,
                    urgencyScore: aiAnalysis.urgencyScore,
                    aiReplySuggestion: aiAnalysis.suggestedReply,
                }
            });
        }

        return NextResponse.json({ success: true, reviewId: review.id });
    } catch (error: any) {
        console.error('Review Submission Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
