'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, ImageIcon, Loader2, Wand2, RefreshCw, ScanSearch as Analysis, CircleHelp as HelpCircle } from 'lucide-react';

export default function ImageStudio() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [variationImage, setVariationImage] = useState('');
  const [error, setError] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResult('');
      setVariationImage('');
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const res = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAnalysisResult(data.analysis);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateVariation = async () => {
    if (!analysisResult) return;
    setIsGenerating(true);
    setError('');
    
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: analysisResult }),
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setVariationImage(data.imageUrl);
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
          <ImageIcon size={20} color="var(--primary)" /> Image Variation Studio
        </h3>
        
        {!previewUrl ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: '100%',
              height: '240px',
              border: '2px dashed var(--glass-border)',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              gap: '12px',
              background: 'var(--glass-bg)'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary-glow)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
          >
            <Upload size={40} color="var(--text-muted)" />
            <p style={{ color: 'var(--text-muted)' }}>Click or drag to upload source image</p>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            <img 
              src={previewUrl} 
              alt="Preview" 
              style={{ width: '100%', borderRadius: '16px', maxHeight: '400px', objectFit: 'contain', background: '#000' }}
            />
            <button 
              onClick={() => { setPreviewUrl(''); setSelectedImage(null); }}
              style={{ 
                position: 'absolute', 
                top: '16px', 
                right: '16px', 
                background: 'rgba(0,0,0,0.5)', 
                border: 'none', 
                color: '#fff', 
                padding: '8px', 
                borderRadius: '50%', 
                cursor: 'pointer' 
              }}
            >
              ×
            </button>
            <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="primary-button"
              >
                {isAnalyzing ? <Loader2 className="animate-spin" /> : <RefreshCw size={18} />}
                Analyze Image
              </button>
            </div>
          </div>
        )}
      </section>

      <AnimatePresence>
        {analysisResult && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel"
            style={{ padding: '32px' }}
          >
            <h4 style={{ marginBottom: '16px', color: 'var(--primary)' }}>Style Analysis</h4>
            <p style={{ 
              fontSize: '16px', 
              color: '#fff', 
              background: 'rgba(255,255,255,0.05)', 
              padding: '20px', 
              borderRadius: '12px',
              marginBottom: '24px'
            }}>
              {analysisResult}
            </p>
            <button 
              onClick={handleGenerateVariation}
              disabled={isGenerating}
              className="primary-button"
            >
              {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />}
              Generate Variation
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {variationImage && (
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel"
            style={{ padding: '16px' }}
          >
            <h4 style={{ margin: '16px', color: 'var(--primary)' }}>AI Variation</h4>
            <img 
              src={variationImage} 
              alt="Variation Result" 
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
