import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dayanithe G S | Full Stack & AI Developer",
  description: "Level 21 Developer | Full Stack Developer, AI Developer, Web Developer. Building AI-powered solutions, scalable web applications, and automating business workflows.",
  keywords: ["Dayanithe", "Full Stack Developer", "AI Developer", "React", "Node.js", "MongoDB", "Portfolio"],
  authors: [{ name: "Dayanithe G S" }],
  openGraph: {
    title: "Dayanithe G S | Developer Portfolio",
    description: "Level 21 Full Stack & AI Developer Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
