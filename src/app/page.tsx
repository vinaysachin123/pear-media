'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Type, Image as ImageIcon, Sparkles, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import TextStudio from '@/components/TextStudio';
import ImageStudio from '@/components/ImageStudio';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={{ 
        padding: '160px 24px 80px', 
        textAlign: 'center',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--glass-bg)',
            padding: '8px 16px',
            borderRadius: '100px',
            border: '1px solid var(--glass-border)',
            color: 'var(--primary)',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '24px'
          }}>
            <Sparkles size={14} />
            Driven by Next-Gen AI
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(40px, 8vw, 72px)', 
            fontWeight: '800', 
            lineHeight: '1.1',
            marginBottom: '24px',
            background: 'linear-gradient(to bottom, #fff 0%, #a0a0a0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Transform Ideas into <span style={{ color: 'var(--primary)', WebkitTextFillColor: 'var(--primary)' }}>Visual Reality</span>
          </h1>
          
          <p style={{ 
            fontSize: '18px', 
            color: 'var(--text-muted)', 
            maxWidth: '600px', 
            margin: '0 auto 40px',
            lineHeight: '1.6'
          }}>
            Pear Media integrates high-performance NLP and Diffusion models to enhance your creative workflow from prompt to pixel.
          </p>
        </motion.div>
      </section>

      {/* Main Dashboard */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '12px', 
          marginBottom: '48px',
          background: 'var(--secondary)',
          padding: '6px',
          borderRadius: '16px',
          width: 'fit-content',
          margin: '0 auto 48px',
          border: '1px solid var(--glass-border)'
        }}>
          <button 
            onClick={() => setActiveTab('text')}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'text' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'text' ? '#fff' : 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
          >
            <Type size={18} />
            Text Studio
          </button>
          <button 
            onClick={() => setActiveTab('image')}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'image' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'image' ? '#fff' : 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
          >
            <ImageIcon size={18} />
            Image Studio
          </button>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === 'text' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'text' ? <TextStudio /> : <ImageStudio />}
        </motion.div>
      </section>

      {/* Footer Decoration */}
      <footer style={{ marginTop: '100px', textAlign: 'center', padding: '40px', borderTop: '1px solid var(--glass-border)' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          &copy; 2026 Pear Media Engine. Powered by Gemini & Hugging Face.
        </p>
      </footer>
    </main>
  );
}
