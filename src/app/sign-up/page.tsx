import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - QuickWrite",
  description: "Create your account and start generating content with AI",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[440px]">
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-background shadow-none",
              formButtonPrimary: "bg-primary hover:bg-primary/90",
              socialButtonsIconButton: "hover:bg-primary/90",
              footerActionLink: "hover:text-primary",
            },
            layout: {
              socialButtonsPlacement: "top",
              socialButtonsVariant: "iconButton",
              privacyPageUrl: "/privacy",
              termsPageUrl: "/terms",
            },
          }}
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          redirectUrl="/dashboard"
          afterSignUpUrl="/dashboard"
          afterSignInUrl="/dashboard"
        />
      </div>
    </div>
  );
} 