import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white flex items-center justify-center">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-purple-900/30 to-pink-900/30"></div>
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-500"></div>

      {/* Scanning Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scan"></div>
      </div>

      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
          BET GLOBAL OS
        </h1>
        <div className="text-cyan-300/60 text-sm mb-8 font-mono tracking-wider">
          [ NEURAL INTERFACE INITIALIZED ]
        </div>
        
        <SignedOut>
          <div className="space-x-4">
            <SignInButton mode="modal">
              <button className="relative bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-lg border border-cyan-400/30 shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-500/50 hover:scale-105">
                <span className="relative z-10">SIGN IN</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-lg blur opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded-lg border border-purple-400/30 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/50 hover:scale-105">
                <span className="relative z-10">SIGN UP</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-lg blur opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </SignUpButton>
          </div>
        </SignedOut>
        
        <SignedIn>
          <div className="space-y-4">
            <p className="text-xl text-cyan-300">
              <span className="text-cyan-400 font-mono">&gt;</span> SYSTEM ACCESS GRANTED
            </p>
            <div className="text-purple-300/60 text-sm font-mono">
              [ USER AUTHENTICATED ]
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </div>
    </div>
  )
}