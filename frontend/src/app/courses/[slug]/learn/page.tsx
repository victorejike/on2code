'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
const GITHUB_ORG = process.env.NEXT_PUBLIC_GITHUB_ORG || 'on2code-org';

type Lesson = { id: string; title: string; summary: string; videoUrl?: string; assignmentId?: string };
type Module = { id: string; title: string; description: string; position: number; lessons: Lesson[] };
type Course = { id: string; slug: string; title: string; modules: Module[] };

const NOTES: Record<string, { content: string; code?: string; lang?: string }> = {
  'lesson-0-1': {
    content: 'Scratch is a visual programming language developed by MIT. It uses drag-and-drop blocks to represent code constructs like loops, conditionals, and variables. Perfect for understanding programming logic before writing text-based code.',
    code: `when green flag clicked\n  forever\n    if <touching mouse-pointer?> then\n      say "Hello!" for 2 seconds\n    end\n  end`,
    lang: 'scratch',
  },
  'lesson-1-1': {
    content: 'C is a general-purpose programming language. Unlike Scratch, C requires text-based code compiled into machine instructions. We cover data types, variables, and compilation using clang.',
    code: `#include <stdio.h>\n\nint main(void)\n{\n    printf("Hello, world!\\n");\n    return 0;\n}`,
    lang: 'c',
  },
  'lesson-2-1': {
    content: 'Arrays allow storing multiple values of the same type in contiguous memory. Strings in C are arrays of characters terminated by a null byte (\\0).',
    code: `#include <stdio.h>\n#include <string.h>\n\nint main(void)\n{\n    char name[] = "On2Code";\n    for (int i = 0, n = strlen(name); i < n; i++)\n        printf("%c\\n", name[i]);\n}`,
    lang: 'c',
  },
};

export default function LearnPage({ params }: { params: { slug: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState('');
  const [openModules, setOpenModules] = useState<string[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'notes' | 'vscode' | 'submit'>('notes');
  const [submitResult, setSubmitResult] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [githubUsername, setGithubUsername] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetch(`${API}/courses/${params.slug}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data) return;
        setCourse(data);
        const firstModule = data.modules?.[0];
        const firstLesson = firstModule?.lessons?.[0];
        if (firstLesson) setActiveId(firstLesson.id);
        if (firstModule) setOpenModules([firstModule.id]);
      })
      .finally(() => setLoading(false));
  }, [params.slug]);

  const allLessons = course?.modules.flatMap(m => m.lessons || []) || [];
  const activeLesson = allLessons.find(l => l.id === activeId) || allLessons[0];
  const note = activeLesson ? NOTES[activeLesson.id] : null;
  const totalLessons = allLessons.length;
  const completedCount = completed.length;
  const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const toggleModule = useCallback((id: string) =>
    setOpenModules(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]), []);

  const markDone = useCallback(() => {
    if (!completed.includes(activeId)) setCompleted(prev => [...prev, activeId]);
    const idx = allLessons.findIndex(l => l.id === activeId);
    if (idx < allLessons.length - 1) setActiveId(allLessons[idx + 1].id);
  }, [activeId, allLessons, completed]);

  // Build the VS Code Web URL pointing to the student's GitHub repo
  const getVSCodeUrl = () => {
    if (githubUsername) {
      const repo = `${GITHUB_ORG}/${params.slug}-${githubUsername}`;
      return `https://vscode.dev/github/${repo}`;
    }
    // Default: open a GitHub template repo in vscode.dev
    return `https://vscode.dev/github/${GITHUB_ORG}/${params.slug}-starter`;
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('on2code_token');
    if (!token) { setSubmitResult('⚠️ Please sign in to submit.'); return; }
    if (!activeLesson?.assignmentId) { setSubmitResult('⚠️ No assignment for this lesson.'); return; }
    if (!repoUrl.trim()) { setSubmitResult('⚠️ Please enter your GitHub repository URL.'); return; }

    setSubmitting(true);
    setSubmitResult('');
    try {
      const res = await fetch(`${API}/assignments/${activeLesson.assignmentId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ language: 'github', code: repoUrl }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitResult(`✅ Submitted! Score: ${data.score}/100 — ${data.status}`);
        markDone();
      } else {
        setSubmitResult(`❌ ${data.error || 'Submission failed.'}`);
      }
    } catch {
      setSubmitResult('❌ Could not reach the server.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-[calc(100vh-57px)]">
      <div className="h-8 w-8 border-2 border-[#0077cc] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!course) return (
    <div className="flex items-center justify-center h-[calc(100vh-57px)]">
      <div className="text-center space-y-3">
        <p className="text-gray-700 font-semibold">Course not found or backend is offline.</p>
        <Link href="/courses" className="text-sm text-[#0077cc] hover:underline">← Back to courses</Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-57px)] overflow-hidden bg-white">

      {/* ── LEFT SIDEBAR ── */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} shrink-0 border-r border-gray-200 flex flex-col overflow-hidden bg-gray-50 transition-all duration-300`}>
        <div className="px-4 py-4 border-b border-gray-200 bg-white">
          <Link href={`/courses/${params.slug}`} className="text-xs text-[#0077cc] hover:underline">← Back to course</Link>
          <p className="mt-1 font-bold text-gray-900 text-sm leading-snug">{course.title}</p>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{completedCount}/{totalLessons} completed</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-[#0077cc] h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {course.modules.map(mod => (
            <div key={mod.id}>
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-semibold text-gray-800 hover:bg-gray-100 transition border-b border-gray-100"
              >
                <span>W{mod.position}: {mod.title.replace(/^Week \d+:\s*/i, '')}</span>
                <svg className={`h-4 w-4 text-gray-400 transition-transform ${openModules.includes(mod.id) ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openModules.includes(mod.id) && (mod.lessons || []).map(lesson => (
                <button
                  key={lesson.id}
                  onClick={() => setActiveId(lesson.id)}
                  className={`w-full flex items-start gap-3 px-4 py-3 text-left text-xs transition border-b border-gray-100 ${
                    activeId === lesson.id ? 'bg-[#e8f4ff] border-l-2 border-l-[#0077cc]' : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="mt-0.5 shrink-0 text-sm">
                    {completed.includes(lesson.id)
                      ? <span className="text-green-500">✓</span>
                      : lesson.assignmentId ? '📝' : lesson.videoUrl ? '▶' : '🧪'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium leading-snug truncate ${activeId === lesson.id ? 'text-[#0077cc]' : 'text-gray-700'}`}>
                      {lesson.title}
                    </p>
                    <p className="text-gray-400 mt-0.5 truncate">{lesson.summary?.slice(0, 40)}…</p>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Video player */}
        <div className="bg-black flex items-center justify-center shrink-0" style={{ height: '38%' }}>
          <div className="w-full h-full relative flex items-center justify-center">
            {activeLesson?.videoUrl && !activeLesson.videoUrl.includes('example.com') ? (
              <iframe src={activeLesson.videoUrl} className="w-full h-full" allowFullScreen title={activeLesson.title} />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="h-8 w-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
                <p className="text-white/70 text-sm font-medium">{activeLesson?.title}</p>
                <p className="text-white/40 text-xs">Video will play when a real URL is configured</p>
              </div>
            )}
            {/* Sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className="absolute top-3 left-3 z-10 rounded bg-white/20 hover:bg-white/30 px-2 py-1 text-white text-xs font-medium transition backdrop-blur-sm"
            >
              {sidebarOpen ? '◀ Hide' : '▶ Show'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center border-b border-gray-200 bg-white px-4 overflow-x-auto">
            {(['notes', 'vscode', 'submit'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition ${
                  activeTab === tab ? 'border-[#0077cc] text-[#0077cc]' : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab === 'notes' ? '📖 Notes' : tab === 'vscode' ? '💻 VS Code' : '📤 Submit'}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-3 py-2 shrink-0">
              <button
                onClick={markDone}
                className="rounded-full bg-green-500 px-4 py-1.5 text-xs font-bold text-white hover:bg-green-600 transition"
              >
                {completed.includes(activeId) ? '✓ Done' : 'Mark complete →'}
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">

            {/* ── NOTES TAB ── */}
            {activeTab === 'notes' && activeLesson && (
              <div className="px-6 py-6 max-w-3xl space-y-6">
                <h2 className="text-xl font-bold text-gray-900">{activeLesson.title}</h2>
                <p className="text-gray-700 text-sm leading-relaxed">{activeLesson.summary}</p>
                {note && (
                  <>
                    <p className="text-gray-700 text-sm leading-relaxed">{note.content}</p>
                    {note.code && (
                      <div className="rounded-xl bg-[#1e1e1e] overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#2d2d2d]">
                          <span className="h-3 w-3 rounded-full bg-red-500" />
                          <span className="h-3 w-3 rounded-full bg-yellow-500" />
                          <span className="h-3 w-3 rounded-full bg-green-500" />
                          <span className="ml-2 text-xs text-gray-400">example.{note.lang || 'c'}</span>
                        </div>
                        <pre className="px-5 py-4 text-sm text-green-300 overflow-x-auto font-mono leading-relaxed">{note.code}</pre>
                      </div>
                    )}
                  </>
                )}
                {activeLesson.assignmentId && (
                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
                    <p className="font-semibold mb-1">📝 Assignment available</p>
                    <p>This lesson has a graded assignment. Open the <strong>VS Code</strong> tab to write your code, then use the <strong>Submit</strong> tab to submit via GitHub.</p>
                  </div>
                )}
              </div>
            )}

            {/* ── VS CODE TAB ── */}
            {activeTab === 'vscode' && (
              <div className="flex flex-col h-full">
                {/* GitHub username prompt */}
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-semibold">GitHub username:</span>
                    <input
                      type="text"
                      value={githubUsername}
                      onChange={e => setGithubUsername(e.target.value.trim())}
                      placeholder="your-github-username"
                      className="border border-gray-300 rounded px-3 py-1 text-sm outline-none focus:border-[#0077cc] w-48"
                    />
                  </div>
                  <a
                    href={getVSCodeUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#0077cc] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#005fa3] transition"
                  >
                    Open in new tab ↗
                  </a>
                  <p className="text-xs text-gray-400 w-full sm:w-auto">
                    💡 Your code is saved to your GitHub repo — just like CS50's codespace.
                  </p>
                </div>

                {/* Embedded VS Code */}
                <div className="flex-1 relative">
                  <iframe
                    src={getVSCodeUrl()}
                    className="w-full h-full border-0"
                    title="VS Code Editor"
                    allow="clipboard-read; clipboard-write"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
                  />
                  {/* Overlay hint if no username */}
                  {!githubUsername && (
                    <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center backdrop-blur-sm">
                      <div className="bg-white rounded-2xl p-8 max-w-sm text-center space-y-4 shadow-2xl mx-4">
                        <div className="text-4xl">💻</div>
                        <h3 className="font-bold text-gray-900 text-lg">Open VS Code</h3>
                        <p className="text-sm text-gray-500">
                          Enter your GitHub username above to open your personal course repository in VS Code — right in the browser.
                        </p>
                        <p className="text-xs text-gray-400">
                          Don't have a GitHub account?{' '}
                          <a href="https://github.com/join" target="_blank" rel="noopener noreferrer" className="text-[#0077cc] hover:underline">
                            Create one free →
                          </a>
                        </p>
                        <input
                          type="text"
                          value={githubUsername}
                          onChange={e => setGithubUsername(e.target.value.trim())}
                          placeholder="your-github-username"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#0077cc] focus:ring-2 focus:ring-[#0077cc]/20"
                          autoFocus
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── SUBMIT TAB ── */}
            {activeTab === 'submit' && activeLesson && (
              <div className="px-6 py-6 max-w-2xl space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Submit Assignment</h2>
                  <p className="text-sm text-gray-500 mt-1">{activeLesson.title}</p>
                </div>

                {!activeLesson.assignmentId ? (
                  <p className="text-gray-400 text-sm">This lesson has no graded assignment.</p>
                ) : (
                  <>
                    {/* How to submit */}
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 space-y-3 text-sm text-gray-700">
                      <p className="font-semibold text-gray-900">How to submit</p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-600">
                        <li>Open the <strong>VS Code</strong> tab and write your solution.</li>
                        <li>Commit and push your code to your GitHub repository.</li>
                        <li>Paste your repository URL below and click Submit.</li>
                      </ol>
                    </div>

                    {/* Repo URL input */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        GitHub Repository URL
                      </label>
                      <input
                        type="url"
                        value={repoUrl}
                        onChange={e => setRepoUrl(e.target.value)}
                        placeholder={`https://github.com/${githubUsername || 'your-username'}/${params.slug}-${githubUsername || 'username'}`}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#0077cc] focus:ring-2 focus:ring-[#0077cc]/20"
                      />
                      <p className="text-xs text-gray-400">
                        Example: <code className="bg-gray-100 px-1 rounded">https://github.com/john/cs50x-2021-john</code>
                      </p>
                    </div>

                    {/* Grading rubric */}
                    <div className="rounded-xl border border-gray-200 p-4">
                      <p className="font-semibold text-gray-900 text-sm mb-3">Grading rubric</p>
                      {[{ label: 'Correctness', pts: 50 }, { label: 'Style', pts: 25 }, { label: 'Design', pts: 25 }].map(r => (
                        <div key={r.label} className="flex justify-between text-sm py-1 border-b border-gray-100 last:border-0">
                          <span className="text-gray-700">{r.label}</span>
                          <span className="font-semibold">{r.pts} pts</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm font-bold mt-2 pt-2 border-t border-gray-200">
                        <span>Total</span><span>100 pts</span>
                      </div>
                    </div>

                    {submitResult && (
                      <p className={`text-sm rounded-lg px-4 py-3 ${
                        submitResult.startsWith('✅')
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {submitResult}
                      </p>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="rounded-full bg-[#0077cc] px-6 py-3 text-sm font-bold text-white hover:bg-[#005fa3] transition disabled:opacity-60"
                    >
                      {submitting ? 'Submitting…' : '📤 Submit to On2Code'}
                    </button>
                  </>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
