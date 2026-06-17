import './globals.css';

export const metadata = {
  title: 'On2Code',
  description: 'Enterprise-grade coding education platform.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
