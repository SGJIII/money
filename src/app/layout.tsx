import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/layout/navbar";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: { colorPrimary: "#4F46E5" },
        elements: {
          formButtonPrimary: "bg-primary hover:bg-primary/90",
          card: "bg-background shadow-none",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} min-h-screen bg-background antialiased`}>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
