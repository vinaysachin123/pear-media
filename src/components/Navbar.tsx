import React from 'react';

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '24px 48px',
      position: 'absolute',
      width: '100%',
      top: 0,
      zIndex: 100,
      boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          background: 'var(--primary)',
          borderRadius: '8px',
          boxShadow: '0 0 15px var(--primary-glow)'
        }}></div>
        <span style={{ 
          fontSize: '20px', 
          fontWeight: '700', 
          fontFamily: 'var(--font-heading)',
          color: 'var(--foreground)'
        }}>Pear Media</span>
      </div>
      <div style={{ display: 'flex', gap: '32px' }}>
        <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: '500' }}>Platform</a>
        <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: '500' }}>Solutions</a>
        <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: '500' }}>Docs</a>
      </div>
      <div>
        <button className="secondary-button" style={{ padding: '8px 16px' }}>Sign In</button>
      </div>
    </nav>
  );
}
