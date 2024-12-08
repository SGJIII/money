import { auth, signIn } from "@/app/auth"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export default async function SignUpPage() {
  const session = await auth()
  if (session?.user) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[440px] p-6">
        <div className="rounded-lg border bg-card p-8">
          <h1 className="mb-6 text-2xl font-semibold">Create Account</h1>
          
          <form
            action={async () => {
              "use server"
              await signIn("google", { redirectTo: "/dashboard" })
            }}
          >
            <Button className="w-full" type="submit">
              Continue with Google
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
} 