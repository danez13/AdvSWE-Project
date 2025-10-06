import { Navbar } from '@/components/site/navbar'
import { AuthForm } from '@/components/auth/auth-form'

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100dvh-56px)] max-w-6xl items-center justify-center px-4">
        <AuthForm mode="signup" />
      </main>
    </>
  )
}
