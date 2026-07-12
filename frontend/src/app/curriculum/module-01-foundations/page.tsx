'use client';
import { useEffect, useState } from 'react';

interface ApiResponse {
  success: boolean;
  data: {
    module: string;
    content: string;
  };
  message?: string;
}

export default function Module01Page() {
  const [content, setContent] = useState<string>('Loading module content...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchModule() {
      try {
        const res = await fetch('/api/v1/curriculum/modules/module-01-foundations');
        if (!res.ok) {
          const body = await res.json();
          throw new Error(body.message || 'Unable to load curriculum');
        }
        const data: ApiResponse = await res.json();
        setContent(data.data.content);
      } catch (err: any) {
        setError(err.message || 'Unable to load curriculum');
      }
    }
    fetchModule();
  }, []);

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-red-900">
          <h1 className="text-2xl font-semibold">Unable to load module</h1>
          <p className="mt-4 text-sm leading-6">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
      <article className="prose dark:prose-invert">
        <pre className="whitespace-pre-wrap">{content}</pre>
      </article>
    </div>
  );
}
