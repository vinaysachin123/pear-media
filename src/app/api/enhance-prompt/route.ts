import { NextRequest, NextResponse } from "next/server";
import { textModel, enhancePromptSystem } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const result = await textModel.generateContent([
      { text: enhancePromptSystem },
      { text: `Enhance this prompt: ${prompt}` }
    ]);

    const enhancedText = result.response.text().trim();
    
    return NextResponse.json({ 
      original: prompt,
      enhanced: enhancedText 
    });
  } catch (error: any) {
    console.error("Enhancement Error:", error);
    return NextResponse.json({ error: error.message || "Failed to enhance prompt" }, { status: 500 });
  }
}
