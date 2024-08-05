import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import React from 'react'

const Auth = () => {
return (
    <div>
        Auth
        <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
    </div>
)
}

export default Auth