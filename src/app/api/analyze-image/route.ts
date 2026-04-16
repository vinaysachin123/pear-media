import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const analysisText = "Detailed analysis of the uploaded cyberpunk city image: Includes neon lighting, dense architecture, and futuristic vehicles. Style is cinematic and highly atmospheric.";
    return NextResponse.json({ 
      analysis: analysisText 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
