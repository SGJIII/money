import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - QuickWrite",
  description: "Create your account and start generating content with AI",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto w-full max-w-[440px]",
            card: "bg-background shadow-none",
          },
        }}
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        redirectUrl="/dashboard"
        afterSignUpUrl="/dashboard"
        hCaptchaConfig={{
          siteKey: process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY,
        }}
      />
    </div>
  );
} 