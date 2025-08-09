'use client'

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    setIsVisible(true)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center">
      {/* Revolutionary Cursor Follower */}
      <div 
        className={`fixed w-[600px] h-[600px] pointer-events-none z-0 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(147, 51, 234, 0.06) 30%, rgba(236, 72, 153, 0.04) 60%, transparent 80%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Multi-Dimensional Background Architecture */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-purple-950/20 to-pink-950/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/10 via-transparent to-transparent"></div>
      </div>

      {/* Quantum Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>

      {/* Revolutionary Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-yellow-500/15 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-red-500/15 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-48 h-48 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-10 right-1/3 w-32 h-32 bg-gradient-to-br from-yellow-500/15 to-orange-500/10 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-gradient-to-tr from-red-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse delay-300"></div>
      </div>

      {/* Quantum Scanning Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent animate-scan"></div>
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-scan delay-2000" style={{ top: '60%' }}></div>
        <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-scan-vertical delay-1000" style={{ left: '30%' }}></div>
      </div>

      {/* Revolutionary Main Content */}
      <div className="relative z-10 text-center space-y-12">
        {/* Quantum Title Design */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
          <h1 className="relative text-8xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl tracking-tight leading-tight">
            BET GLOBAL OS
          </h1>
        </div>
        
        {/* Elite Status Indicator */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 blur-xl rounded-full"></div>
          <div className="relative text-orange-300/80 text-lg font-mono tracking-[0.3em] uppercase font-black">
            [ QUANTUM NEURAL INTERFACE INITIALIZED ]
          </div>
        </div>
        
        <SignedOut>
          {/* Revolutionary Authentication Buttons */}
          <div className="flex items-center justify-center space-x-8">
            <SignInButton mode="modal">
              <div className="group relative cursor-pointer">
                {/* Multi-layer Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/80 to-orange-600/80 rounded-2xl transition-all duration-500 group-hover:from-yellow-500/90 group-hover:to-orange-500/90"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.1] to-white/[0.05] rounded-2xl"></div>
                
                {/* Quantum Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-orange-400/0 rounded-2xl transition-all duration-500 group-hover:from-yellow-400/20 group-hover:to-orange-400/20 blur-xl"></div>
                
                {/* Revolutionary Border */}
                <div className="absolute inset-0 rounded-2xl border border-yellow-400/40 transition-all duration-500 group-hover:border-yellow-300/60 group-hover:shadow-2xl group-hover:shadow-yellow-500/30"></div>
                
                <button className="relative px-12 py-6 backdrop-blur-xl font-black text-xl text-white tracking-wide transition-all duration-500 group-hover:scale-105">
                  <span className="relative z-10 flex items-center space-x-3">
                    <span className="font-black text-xl tracking-wider">NEURAL SIGN IN</span>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  </span>
                </button>
              </div>
            </SignInButton>
            
            <SignUpButton mode="modal">
              <div className="group relative cursor-pointer">
                {/* Multi-layer Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/80 to-pink-600/80 rounded-2xl transition-all duration-500 group-hover:from-red-500/90 group-hover:to-pink-500/90"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.1] to-white/[0.05] rounded-2xl"></div>
                
                {/* Quantum Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-400/0 to-pink-400/0 rounded-2xl transition-all duration-500 group-hover:from-red-400/20 group-hover:to-pink-400/20 blur-xl"></div>
                
                {/* Revolutionary Border */}
                <div className="absolute inset-0 rounded-2xl border border-red-400/40 transition-all duration-500 group-hover:border-red-300/60 group-hover:shadow-2xl group-hover:shadow-red-500/30"></div>
                
                <button className="relative px-12 py-6 backdrop-blur-xl font-black text-xl text-white tracking-wide transition-all duration-500 group-hover:scale-105">
                  <span className="relative z-10 flex items-center space-x-3">
                    <span className="font-black text-xl tracking-wider">QUANTUM SIGN UP</span>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-300"></div>
                  </span>
                </button>
              </div>
            </SignUpButton>
          </div>
        </SignedOut>
        
        <SignedIn>
          {/* Elite Authenticated State */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 blur-2xl rounded-full"></div>
              <p className="relative text-3xl text-yellow-300 font-black">
                <span className="text-yellow-400 font-mono text-4xl font-black">&gt;</span> <span className="font-black text-2xl tracking-wider">QUANTUM ACCESS GRANTED</span>
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 blur-xl rounded-full"></div>
              <div className="relative text-red-300/80 text-lg font-mono tracking-[0.2em] uppercase font-black">
                [ ELITE USER AUTHENTICATED ]
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 blur-xl rounded-full"></div>
              <div className="relative">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  )
}