import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systematicPrompt = `
      You are the ReviewFlow AI Specialist. 
      You handle review management queries for a multi-branch business suite.
      Provide concise, insightful, and data-driven answers.
      Current context: 5 branches (Downtown, Harbor Grill, Westside Hub, Midtown Express, Riverside Dine). 150+ reviews analyzed.
      
      User Question: ${prompt}
    `;

        const result = await model.generateContent(systematicPrompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ answer: text });
    } catch (error: any) {
        console.error('AI Chat Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
