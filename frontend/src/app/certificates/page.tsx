'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

type Certificate = {
  id: string;
  courseId: string;
  courseTitle: string;
  issuedAt: string;
  certificateUrl?: string;
};

export default function CertificatesPage() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('on2code_token');
    if (!token) { setLoggedIn(false); setLoading(false); return; }
    // Certificates endpoint is Phase 1 — show empty state for now
    fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => { if (!r.ok) setLoggedIn(false); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="h-8 w-8 border-2 border-[#0077cc] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!loggedIn) return (
    <div className="flex items-center justify-center min-h-[60vh] px-6">
      <div className="text-center space-y-4">
        <p className="text-xl font-bold text-gray-900">Sign in to view your certificates</p>
        <Link href="/auth/login" className="inline-flex rounded-full bg-[#0077cc] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#005fa3] transition">
          Sign in
        </Link>
      </div>
    </div>
  );

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">My Certificates</h1>
          <p className="text-sm text-gray-500 mt-1">Certificates you've earned by completing courses</p>
        </div>

        {certs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 p-16 text-center space-y-4">
            <div className="text-5xl">🏆</div>
            <p className="font-bold text-gray-700 text-lg">No certificates yet</p>
            <p className="text-sm text-gray-400 max-w-sm mx-auto">
              Complete a course to earn a verified certificate you can share with employers.
            </p>
            <Link
              href="/courses"
              className="inline-flex rounded-full bg-[#0077cc] px-6 py-3 text-sm font-bold text-white hover:bg-[#005fa3] transition"
            >
              Browse courses
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {certs.map(cert => (
              <div key={cert.id} className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="bg-gradient-to-br from-[#0077cc] to-[#003d6b] h-28 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-3xl mb-1">🏆</div>
                    <p className="text-xs font-semibold opacity-80">Certificate of Completion</p>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-gray-900">{cert.courseTitle}</h3>
                  <p className="text-xs text-gray-400">
                    Issued {new Date(cert.issuedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <div className="flex gap-2">
                    {cert.certificateUrl && (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-[#0077cc] px-4 py-2 text-xs font-bold text-white hover:bg-[#005fa3] transition"
                      >
                        View certificate
                      </a>
                    )}
                    <button className="rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
