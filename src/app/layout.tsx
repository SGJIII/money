import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

export const metadata = {
  title: "QuickWrite - AI Content Generation Made Simple",
  description: "Generate engaging content 10x faster with AI. Perfect for social media, blogs, and marketing copy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className="h-full">
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
