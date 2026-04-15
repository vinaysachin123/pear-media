import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const textModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
export const visionModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const enhancePromptSystem = `
You are an expert prompt engineer for AI image generators (like midjourney, stable diffusion, DALL-E).
Your task is to take a simple user prompt and enhance it into a highly detailed, descriptive, and stylistic prompt that will yield high-quality visual results.
- Analyze the tone and intent of the user input.
- Add details about lighting, camera angle, texture, style (e.g., cinematic, cyberpunk, oil painting, minimalist), and mood.
- Keep the enhanced prompt under 200 words.
- ONLY output the enhanced prompt text, no explanations.
`;

export const analyzeImageSystem = `
You are a visual analyst. Analyze the provided image and describe its key elements:
1. Main objects and subjects.
2. Art style (e.g., realistic, cartoon, abstract).
3. Primary color palette.
4. Mood and atmosphere.
5. Technical details (lighting, composition).
Output a detailed prompt that can be used to generate a variation of this image.
`;
