import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - QuickWrite",
  description: "Sign in to your QuickWrite account",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[440px]">
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-background shadow-none",
              formButtonPrimary: "bg-primary hover:bg-primary/90",
              socialButtonsIconButton: "hover:bg-primary/90",
              footerActionLink: "hover:text-primary",
              oauthButtonsIconButton: "hover:bg-primary/90",
            },
            layout: {
              socialButtonsPlacement: "top",
              socialButtonsVariant: "iconButton",
              privacyPageUrl: "/privacy",
              termsPageUrl: "/terms",
              shimmer: true,
            },
          }}
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          redirectUrl="/dashboard"
          afterSignInUrl="/dashboard"
        />
      </div>
    </div>
  );
} 