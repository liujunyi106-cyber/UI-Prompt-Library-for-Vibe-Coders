'use client';

import { useEffect } from 'react';

export function NoTranslate() {
  useEffect(() => {
    // Add translate="no" to body to prevent browser auto-translation
    document.body.setAttribute('translate', 'no');
    
    // Add Google-specific meta tag to prevent auto-translation
    const meta = document.createElement('meta');
    meta.name = 'google';
    meta.content = 'notranslate';
    document.head.appendChild(meta);
    
    // Add class to all text elements to prevent translation
    const preventTranslation = () => {
      const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button, label, li, td, th');
      elements.forEach(el => {
        el.setAttribute('translate', 'no');
      });
    };
    
    // Run immediately and on DOM changes
    preventTranslation();
    
    const observer = new MutationObserver(preventTranslation);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      document.body.removeAttribute('translate');
      meta.remove();
      observer.disconnect();
    };
  }, []);

  return null;
}