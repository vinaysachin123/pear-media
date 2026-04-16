import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const mockImagePath = "C:/Users/VINAY/.gemini/antigravity/brain/64362f60-0ce5-43d8-b828-5ca9203b8c18/mock_generated_image_1776320633123.png";
    const buffer = fs.readFileSync(mockImagePath);
    const base64Image = buffer.toString("base64");
    return NextResponse.json({ imageUrl: `data:image/png;base64,${base64Image}` });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
