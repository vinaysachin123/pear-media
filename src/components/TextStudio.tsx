'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Image as ImageIcon, Check, Loader2, Wand2, Send } from 'lucide-react';

export default function TextStudio() {
  const [prompt, setPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');
  const [error, setError] = useState('');

  const handleEnhance = async () => {
    if (!prompt) return;
    setIsEnhancing(true);
    setError('');
    try {
      const res = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setEnhancedPrompt(data.enhanced);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerate = async (approvedPrompt: string) => {
    setIsGenerating(true);
    setError('');
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: approvedPrompt }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setGeneratedImage(data.imageUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <section className="glass-panel" style={{ padding: '32px' }}>
        <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} color="var(--primary)" /> Text-to-Image Studio
        </h3>
        
        <div style={{ position: 'relative' }}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your vision (e.g., A minimalist forest at sunset)..."
            style={{
              width: '100%',
              minHeight: '120px',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              padding: '20px',
              color: '#fff',
              fontSize: '16px',
              fontFamily: 'inherit',
              resize: 'vertical',
              outline: 'none',
            }}
          />
          <button 
            onClick={handleEnhance}
            disabled={isEnhancing || !prompt}
            className="primary-button"
            style={{ 
              position: 'absolute', 
              bottom: '16px', 
              right: '16px',
              opacity: isEnhancing || !prompt ? 0.6 : 1
            }}
          >
            {isEnhancing ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />}
            Enhance
          </button>
        </div>
      </section>

      <AnimatePresence>
        {enhancedPrompt && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel"
            style={{ padding: '32px', border: '1px solid var(--primary-glow)' }}
          >
            <h4 style={{ marginBottom: '16px', color: 'var(--primary)' }}>Enhanced Vision</h4>
            <p style={{ 
              fontSize: '16px', 
              color: '#fff', 
              background: 'rgba(255,255,255,0.05)', 
              padding: '20px', 
              borderRadius: '12px',
              lineHeight: '1.8'
            }}>
              {enhancedPrompt}
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button 
                onClick={() => handleGenerate(enhancedPrompt)}
                disabled={isGenerating}
                className="primary-button"
              >
                {isGenerating ? <Loader2 className="animate-spin" /> : <Check size={18} />}
                Approve & Generate
              </button>
              <button 
                onClick={() => handleGenerate(prompt)}
                disabled={isGenerating}
                className="secondary-button"
              >
                Skip to Original
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {generatedImage && (
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel"
            style={{ padding: '16px', overflow: 'hidden' }}
          >
            <img 
              src={generatedImage} 
              alt="Generated Result" 
              style={{ width: '100%', borderRadius: '16px', display: 'block', maxHeight: '600px', objectFit: 'cover' }}
            />
          </motion.section>
        )}
      </AnimatePresence>

      {error && (
        <div style={{ color: '#ff4d4d', padding: '16px', background: 'rgba(255,0,0,0.1)', borderRadius: '12px' }}>
          {error}
        </div>
      )}
    </div>
  );
}
