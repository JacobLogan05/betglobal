import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { SignInButton, SignUpButton } from '@clerk/nextjs'

export default async function HomePage() {
  // Only check auth if Clerk is properly configured
  if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'your_clerk_publishable_key_here') {
    const { userId } = await auth()
    if (userId) {
      redirect('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bovada-dark via-chalkboard-dark to-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            Bet Global
            <span className="block text-bovada-gold">Operating System</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Advanced commission tracking and management system for sports betting affiliates. 
            Track signups, monitor commissions, and optimize your betting operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
             process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'your_clerk_publishable_key_here' ? (
              <>
                <SignInButton mode="modal">
                  <button className="bg-bovada-gold hover:bg-bovada-gold/90 text-black font-semibold px-8 py-3 rounded-lg transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                
                <SignUpButton mode="modal">
                  <button className="border border-bovada-gold text-bovada-gold hover:bg-bovada-gold hover:text-black font-semibold px-8 py-3 rounded-lg transition-colors">
                    Get Started
                  </button>
                </SignUpButton>
              </>
            ) : (
              <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 max-w-md">
                <p className="text-yellow-300 text-sm">
                  <strong>Setup Required:</strong> Please configure your Clerk authentication keys in .env.local to enable sign-in functionality.
                </p>
              </div>
            )}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Commission Tracking</h3>
              <p className="text-gray-400">Real-time tracking of your affiliate commissions across multiple platforms</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Lead Management</h3>
              <p className="text-gray-400">Comprehensive signup tracking and lead qualification system</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Analytics Dashboard</h3>
              <p className="text-gray-400">Advanced analytics and reporting for data-driven decisions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}