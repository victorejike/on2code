export default function LearnLayout({ children }: { children: React.ReactNode }) {
  // The learn page is full-screen — it manages its own internal layout
  return <>{children}</>;
}
