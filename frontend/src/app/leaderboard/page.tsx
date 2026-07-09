'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

type Entry = { rank: number; name: string; points: number; completedAssignments: number; userId: string };

const MOCK: Entry[] = [
  { rank: 1, name: 'Alice Chen', points: 980, completedAssignments: 12, userId: '1' },
  { rank: 2, name: 'Bob Okafor', points: 870, completedAssignments: 10, userId: '2' },
  { rank: 3, name: 'Carlos Diaz', points: 760, completedAssignments: 9, userId: '3' },
  { rank: 4, name: 'Diana Park', points: 650, completedAssignments: 8, userId: '4' },
  { rank: 5, name: 'Ethan Müller', points: 540, completedAssignments: 7, userId: '5' },
  { rank: 6, name: 'Fatima Al-Rashid', points: 430, completedAssignments: 6, userId: '6' },
  { rank: 7, name: 'George Nwosu', points: 320, completedAssignments: 5, userId: '7' },
  { rank: 8, name: 'Hannah Kim', points: 210, completedAssignments: 3, userId: '8' },
];

const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<Entry[]>(MOCK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Leaderboard endpoint is Phase 2 — use mock data for now
    setLoading(false);
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="h-8 w-8 border-2 border-[#0077cc] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="text-5xl">🏆</div>
          <h1 className="text-2xl font-extrabold text-gray-900">Leaderboard</h1>
          <p className="text-sm text-gray-500">Top learners ranked by XP points this month</p>
        </div>

        {/* Top 3 podium */}
        <div className="grid grid-cols-3 gap-4 items-end">
          {[entries[1], entries[0], entries[2]].map((e, i) => {
            if (!e) return <div key={i} />;
            const heights = ['h-24', 'h-32', 'h-20'];
            const colors = ['bg-gray-200', 'bg-yellow-400', 'bg-orange-300'];
            return (
              <div key={e.userId} className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-[#0077cc] flex items-center justify-center text-white font-extrabold text-lg">
                  {e.name[0]}
                </div>
                <p className="text-xs font-semibold text-gray-700 text-center truncate w-full">{e.name}</p>
                <p className="text-xs text-gray-400">{e.points} pts</p>
                <div className={`w-full ${heights[i]} ${colors[i]} rounded-t-xl flex items-center justify-center text-2xl`}>
                  {MEDAL[e.rank] || e.rank}
                </div>
              </div>
            );
          })}
        </div>

        {/* Full table */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Rank</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Learner</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Assignments</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {entries.map(e => (
                <tr key={e.userId} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-4 font-bold text-gray-500">
                    {MEDAL[e.rank] || `#${e.rank}`}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-[#0077cc] flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {e.name[0]}
                      </div>
                      <span className="font-semibold text-gray-900">{e.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right text-gray-500">{e.completedAssignments}</td>
                  <td className="px-5 py-4 text-right font-bold text-[#0077cc]">{e.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-xs text-gray-400">
          Leaderboard resets monthly. <Link href="/courses" className="text-[#0077cc] hover:underline">Start learning to climb the ranks →</Link>
        </p>
      </div>
    </div>
  );
}
