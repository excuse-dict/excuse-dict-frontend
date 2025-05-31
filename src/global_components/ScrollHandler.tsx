'use client';

import { useEffect } from 'react';

export default function ScrollHandler() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.app-header');
      if (header) {
        if (window.scrollY > 10) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}