import { SignIn } from "@clerk/clerk-react"

export default function SignInPage() {
    return (
        <main className='flex h-screen w-full items-center justify-center bg-slate-800'>
            <SignIn path="/sign-in" hideNavigation />
        </main>
    )
}