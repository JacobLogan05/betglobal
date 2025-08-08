'use client'

import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md">
        <SignUp />
      </div>
    </div>
  )
}