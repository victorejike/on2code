'use client';

import { useEffect } from 'react';

export default function ThemeProvider() {
  useEffect(() => {
    const consent = document.cookie.split(';').find(c => c.trim().startsWith('on2code_cookie_consent='));
    if (!consent) return;

    const consentValue = consent.split('=')[1];
    // If user has not accepted consent, do not apply theme
    if (consentValue !== '1') return;

    const saved = localStorage.getItem('on2code_theme');
    const apply = (dark: boolean) => {
      document.documentElement.classList.toggle('dark', dark);
    };

    if (saved === 'dark') {
      apply(true);
    } else if (saved === 'light') {
      apply(false);
    } else {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      apply(mq.matches);
    }
  }, []);
  return null;
}
