import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const enhancedText = `Cinematic wide shot of a sprawling neon-lit cyberpunk metropolis at dawn, ${prompt}, wet asphalt reflecting holographic billboards, flying vehicles weaving through towering glass skyscrapers, hazy atmosphere, highly detailed, 8k resolution, blade runner aesthetic.`;
    return NextResponse.json({ original: prompt, enhanced: enhancedText });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
