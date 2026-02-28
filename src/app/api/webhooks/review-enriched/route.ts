import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { reviewId, sentiment, categories, urgencyScore, aiReplySuggestion } = body;

        if (!reviewId) {
            return NextResponse.json({ error: 'Missing reviewId' }, { status: 400 });
        }

        const updatedReview = await prisma.review.update({
            where: { id: reviewId },
            data: {
                sentiment,
                categories,
                urgencyScore,
                aiReplySuggestion,
            },
        });

        return NextResponse.json({ success: true, review: updatedReview });
    } catch (error: any) {
        console.error('Webhook Enrichment Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
