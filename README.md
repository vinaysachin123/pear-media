# Pear Media ✨

Pear Media is a premium AI-powered content creation studio designed to bridge the gap between abstract ideas and visual reality. It leverages state-of-the-art NLP models (Google Gemini) and Diffusion models (Stable Diffusion XL) to provide a seamless, high-performance creative workflow.

## 🚀 Key Workflows

### 1. Text-to-Image Studio (Prompt Enhancement)
In this workflow, the system doesn't just generate an image from your text. It analyzes your tone and intent, uses Gemini to **enhance** your prompt with professional stylistic details (lighting, camera angles, texture), and then generates high-fidelity images using SDXL.

- **Flow**: User Input → AI Enhancement → User Approval → Image Generation.

### 2. Image-to-Variation Studio (Visual Reimagination)
Upload any image, and Pear Media's vision engine will deconstruct its style, theme, and composition. It then uses this visual metadata to generate a new, unique variation that maintains the essence of the original.

- **Flow**: Image Upload → Vision Analysis → AI Description → Variation Generation.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React, Framer Motion (Animations).
- **Backend**: Next.js API Routes (Node.js).
- **Styles**: Pure Vanilla CSS with a custom Design Token system (no bulky frameworks).
- **AI Models**:
  - **Google Gemini Pro 1.5**: Prompt rewriting and intent analysis.
  - **Google Gemini Flash 1.5**: Visual analysis and deconstruction.
  - **Stable Diffusion XL (via Hugging Face)**: High-resolution image generation.

## 📦 Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-link>
   cd pear-media
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root and add your keys:
   ```env
   GEMINI_API_KEY=your_google_ai_studio_key
   HUGGING_FACE_TOKEN=your_hugging_face_token
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🎨 Design Philosophy
Pear Media adopts a **Sleek Dark Mode** aesthetic, utilizing:
- **Glassmorphism**: Backdrop blurs and subtle borders for a modern feel.
- **Micro-animations**: Smooth transitions powered by Framer Motion.
- **Dynamic Blooms**: Radiant gradients that respond to the page layout.

## 📄 License
MIT License. Created for the Pear Media Assignment.
