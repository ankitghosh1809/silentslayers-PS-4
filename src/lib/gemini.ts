import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function analyzeReview(content: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Analyze the following customer review for a business.
    Extract the following details in a strict JSON format:
    - sentiment: "POSITIVE", "NEUTRAL", or "NEGATIVE"
    - categories: An array of strings containing any of these: "food", "service", "staff", "ambience", "hygiene", "pricing", "management"
    - urgencyScore: A number from 1 to 10 (10 being most urgent/critical)
    - staffMentioned: An array of names of staff members mentioned, if any
    - suggestedReply: A professional, brand-appropriate response to the review

    Review Content: "${content}"
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from markdown if needed
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Failed to parse AI response");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return null;
  }
}
