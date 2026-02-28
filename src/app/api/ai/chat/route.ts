import { NextRequest, NextResponse } from "next/server";
import { chatWithAI } from "@/lib/gemini";

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();
        const answer = await chatWithAI(prompt);
        return NextResponse.json({ answer });
    } catch (error) {
        console.error("AI API Error:", error);
        return NextResponse.json({ answer: "AI temporarily in demo mode." }, { status: 500 });
    }
}
