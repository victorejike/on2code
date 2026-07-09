'use client';

import Link from 'next/link';

export default function PreviewLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      onClick={e => e.stopPropagation()}
      className="text-xs font-semibold text-[#0077cc] hover:underline"
    >
      Preview
    </Link>
  );
}
