'use client';

import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const has = document.cookie.split(';').some(c => c.trim().startsWith('on2code_cookie_consent='));
    if (!has) setVisible(true);
  }, []);

  const accept = () => {
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `on2code_cookie_consent=1; expires=${expires}; path=/; SameSite=Lax`;
    setVisible(false);
    // Now apply theme immediately
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  };

  const decline = () => {
    document.cookie = `on2code_cookie_consent=0; expires=${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()}; path=/; SameSite=Lax`;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6">
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">We use cookies</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            We use cookies to personalise your experience, including detecting your system theme preference for dark mode.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="rounded-full border border-gray-300 dark:border-gray-600 px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded-full bg-[#0077cc] px-4 py-2 text-xs font-semibold text-white hover:bg-[#005fa3] transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
