import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Football, without opinion",
  description: "Football facts. No opinion, no interpretation, no analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <Navigation />
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-16">
          <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-neutral-500">
            Facts only. No opinion.
          </div>
        </footer>
      </body>
    </html>
  );
}
