import { NextRequest, NextResponse } from "next/server";
import { visionModel, analyzeImageSystem } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const imageBytes = await image.arrayBuffer();
    const result = await visionModel.generateContent([
      { text: analyzeImageSystem },
      {
        inlineData: {
          data: Buffer.from(imageBytes).toString("base64"),
          mimeType: image.type,
        },
      },
      { text: "Analyze this image and provide a prompt for a variation." }
    ]);

    const analysisText = result.response.text().trim();
    
    return NextResponse.json({ 
      analysis: analysisText 
    });
  } catch (error: any) {
    console.error("Analysis Error:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze image" }, { status: 500 });
  }
}
