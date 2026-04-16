import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const token = process.env.HUGGING_FACE_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "Hugging Face token not configured" }, { status: 500 });
    }

    // Using SDXL for high quality
    const model = "stabilityai/stable-diffusion-xl-base-1.0";
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            negative_prompt: "blurry, distorted, low quality, text, watermark",
          }
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Hugging Face API error");
    }

    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    return NextResponse.json({ 
      imageUrl: `data:image/png;base64,${base64Image}` 
    });
  } catch (error: any) {
    console.error("Generation Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate image" }, { status: 500 });
  }
}
