'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useAnimation, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import dynamic from 'next/dynamic'

// Dynamically import SignInButton to avoid errors when ClerkProvider is not available
const SignInButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignInButton), {
  ssr: false,
  loading: () => <button className="w-full py-3 px-4 rounded-lg bg-gray-700 text-white font-medium tracking-wide">Loading...</button>
})

export default function LoginPage() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isClerkAvailable, setIsClerkAvailable] = useState(false)
  const [animationsEnabled, setAnimationsEnabled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonControls = useAnimation()
  
  // Mouse spring animation with minimal values for better performance
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 10 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 10 })
  
  // Parallax effect values
  const parallaxIntensity = 20
  const parallaxX = useTransform(smoothMouseX, [0, 100], [-parallaxIntensity, parallaxIntensity])
  const parallaxY = useTransform(smoothMouseY, [0, 100], [-parallaxIntensity, parallaxIntensity])
  
  // Secondary grid parallax effect values
  const secondaryParallaxX = useTransform(smoothMouseX, [0, 100], [-parallaxIntensity * 0.7, parallaxIntensity * 0.7])
  const secondaryParallaxY = useTransform(smoothMouseY, [0, 100], [-parallaxIntensity * 0.7, parallaxIntensity * 0.7])
  
  // Check if Clerk is properly configured
  useEffect(() => {
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    const isConfigured = 
      !!publishableKey && 
      publishableKey !== 'your_clerk_publishable_key_here'
    
    setIsClerkAvailable(isConfigured)
  }, [])
  
  // Delay animations until after initial render to improve performance
  useEffect(() => {
    // First set mounted to true
    setMounted(true)
    
    // Then enable animations after a short delay to ensure smooth initial load
    const timer = setTimeout(() => {
      setAnimationsEnabled(true)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])
  
  useEffect(() => {
    // Only add mouse movement listener if animations are enabled
    if (!animationsEnabled) return
    
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        
        setMousePosition({ x, y })
        mouseX.set(x)
        mouseY.set(y)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, animationsEnabled])

  // Button animation sequence - enhanced for more fluid motion
  useEffect(() => {
    // Skip animations if they're not enabled yet
    if (!animationsEnabled) return
    
    if (isHovering) {
      buttonControls.start({
        scale: 1.02,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 15 
        }
      })
    } else {
      buttonControls.start({
        scale: 1,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }
      })
    }
  }, [isHovering, buttonControls, animationsEnabled])

  // Show a loading state while client-side rendering is happening
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030014]">
        <div className="text-white text-xl font-medium tracking-wide">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Loading BET GLOBAL OS...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-[#030014]"
      style={{
        background: `linear-gradient(135deg, rgba(2, 0, 14, 1) 0%, rgba(10, 15, 40, 0.8) 50%, rgba(2, 0, 14, 1) 100%)`,
      }}
    >
      {/* Simplified background grid with minimal animation */}
      <motion.div 
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoNTksIDEzMCwgMjQ2LCAwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIj48L3JlY3Q+PC9zdmc+')] opacity-25"
        style={{
          x: animationsEnabled ? parallaxX : 0,
          y: animationsEnabled ? parallaxY : 0
        }}
      />
      
      {/* Secondary grid layer with minimal animation */}
      <motion.div 
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gODAgMCBMIDAgMCAwIDgwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMTM5LCA5MiwgMjQ2LCAwLjAxNSkiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSI+PC9yZWN0Pjwvc3ZnPg==')] opacity-15"
        style={{
          x: animationsEnabled ? secondaryParallaxX : 0,
          y: animationsEnabled ? secondaryParallaxY : 0
        }}
      />

      {/* CSS-only particles for maximum performance */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static particles */}
        <div className="absolute rounded-full" style={{ left: '25%', top: '20%', width: '1.5px', height: '1.5px', opacity: 0.15, background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)' }} />
        <div className="absolute rounded-full" style={{ left: '75%', top: '65%', width: '2px', height: '2px', opacity: 0.1, background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)' }} />
        <div className="absolute rounded-full" style={{ left: '40%', top: '80%', width: '1px', height: '1px', opacity: 0.2, background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0) 70%)' }} />
        <div className="absolute rounded-full" style={{ left: '85%', top: '30%', width: '1.8px', height: '1.8px', opacity: 0.12, background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0) 70%)' }} />
        <div className="absolute rounded-full" style={{ left: '15%', top: '50%', width: '1.2px', height: '1.2px', opacity: 0.18, background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)' }} />
        <div className="absolute rounded-full" style={{ left: '60%', top: '15%', width: '1.5px', height: '1.5px', opacity: 0.15, background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0) 70%)' }} />
      </div>

      {/* Simplified atmospheric glow effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px]"></div>
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-[150px]"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-black/20 rounded-full blur-[100px]"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div 
          className="max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Logo/Brand Area */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div 
              className="relative inline-block"
              whileHover={{ 
                scale: 1.03,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
            >
              {/* Simplified glow behind logo */}
              <motion.div
                className="absolute -inset-4 rounded-full blur-xl"
                style={{
                  background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0) 70%)"
                }}
                animate={{
                  opacity: animationsEnabled ? [0.3, 0.7, 0.3] : 0.3
                }}
                transition={{
                  duration: 6,
                  repeat: animationsEnabled ? Infinity : 0,
                  ease: "easeInOut"
                }}
              />
              
              <motion.h1 
                className="text-7xl font-bold mb-2 tracking-wider relative text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {/* Simplified gradient for "BET GLOBAL" */}
                <motion.span 
                  className="font-bold relative inline-block bg-gradient-to-r from-blue-500 via-white to-pink-500 text-transparent bg-clip-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  BET GLOBAL
                </motion.span>
              </motion.h1>
              
              {/* Simplified gradient line */}
              <div className="relative h-px w-full mt-4">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-pink-400/50 to-blue-400/30 opacity-70"
                  initial={{ width: 0, left: "50%", opacity: 0 }}
                  animate={{ width: "100%", left: "0%", opacity: 0.7 }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </div>
            </motion.div>
            
            {/* Simplified "OPERATING SYSTEM" text */}
            <motion.div 
              className="relative mt-6 h-5 overflow-hidden text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <motion.p 
                className="text-slate-400 text-sm font-light tracking-[0.3em] absolute inset-0 flex justify-center items-center"
              >
                OPERATING SYSTEM
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Login Card */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Card background with simplified glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-pink-500/20 rounded-xl blur-sm opacity-75"></div>
            
            <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-800">
              {/* Card header */}
              <div className="px-6 py-5 border-b border-slate-800/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <h2 className="text-white font-medium text-sm tracking-wide">Authentication Portal</h2>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                  </div>
                </div>
              </div>
              
              {/* Card content */}
              <div className="p-6">
                {/* Session initialization section */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-300 text-sm font-medium">Initialize Session</h3>
                    <div className="text-xs text-slate-500 font-light">Secure Connection</div>
                  </div>
                  
                  {/* Simplified session button */}
                  <motion.button
                    className="w-full relative overflow-hidden group"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    animate={buttonControls}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setIsLoading(true)}
                    disabled={isLoading}
                  >
                    {/* Simplified button glow */}
                    <motion.div 
                      className="absolute inset-0 rounded-xl opacity-30"
                      whileHover={{ opacity: 0.5 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="relative flex items-center justify-center space-x-3 rounded-xl bg-slate-800/80 px-8 py-4 transition-all duration-300 backdrop-blur-sm">
                      {/* Simplified text */}
                      <span className="text-white font-medium tracking-wide text-lg">
                        Initialize Session
                      </span>
                      
                      {/* Simplified arrow icon */}
                      <svg 
                        className="w-5 h-5 text-blue-400/90" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    
                    {/* Simplified button hover effect */}
                    <motion.div 
                      className="absolute inset-0 opacity-0"
                      whileHover={{ opacity: 0.2 }}
                      transition={{ duration: 0.3 }}
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)" }}
                    />
                  </motion.button>
                </motion.div>
                
                {/* Clerk authentication section */}
                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pb-2 border-t border-slate-800/50">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-slate-300 text-sm font-medium">Configure Authentication</h3>
                          <div className="text-xs text-slate-500 font-light">Clerk Identity</div>
                        </div>
                        
                        {/* Simplified Clerk button */}
                        <motion.button
                          className="w-full relative overflow-hidden group"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          {/* Simplified button glow */}
                          <motion.div 
                            className="absolute inset-0 rounded-xl opacity-30"
                            whileHover={{ opacity: 0.5 }}
                            transition={{ duration: 0.3 }}
                          />
                          
                          <div className="relative flex items-center justify-center space-x-3 rounded-xl bg-slate-950/60 px-8 py-4 transition-all duration-300 backdrop-blur-sm">
                            {/* Simplified text */}
                            <span className="text-white font-medium tracking-wide text-lg">
                              Configure Authentication
                            </span>
                            
                            {/* Simplified arrow icon */}
                            <svg 
                              className="w-5 h-5 text-pink-400/90" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                          
                          {/* Simplified button hover effect */}
                          <motion.div 
                            className="absolute inset-0 opacity-0"
                            whileHover={{ opacity: 0.2 }}
                            transition={{ duration: 0.3 }}
                            style={{ background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)" }}
                          />
                        </motion.button>
                        
                        {/* Simplified error message */}
                        <motion.div
                          className="mt-3 relative"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                        >
                          <div className="flex items-center justify-center mb-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-pink-500/80 mr-2" />
                            <p className="text-xs font-light tracking-wide text-pink-400">
                              Authentication not configured
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Simplified Security Badge */}
                <div className="relative flex items-center justify-center space-x-2 text-slate-500 text-xs mt-6">
                  {/* Simplified pulse indicator */}
                  <div className="relative w-2.5 h-2.5">
                    <div className="absolute inset-0 bg-green-400 rounded-full" />
                  </div>
                  
                  {/* Simplified security text */}
                  <div className="relative">
                    <span className="relative font-light tracking-wide text-slate-500">
                      QUANTUM-SECURED • ZERO-KNOWLEDGE PROTOCOL
                    </span>
                  </div>
                  
                  {/* Simplified shield icon */}
                  <div className="relative w-3.5 h-3.5 ml-1">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-3.5 h-3.5 text-green-500"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Simplified Footer */}
          <div className="text-center mt-12 text-slate-600 text-xs font-light tracking-[0.3em] relative">
            {/* Simple text */}
            <div className="relative">
              <div className="relative inline-block px-4 py-1 rounded-md">
                <span className="inline-block">
                  SYSTEM ONLINE • PROTECTED BY CLERK
                </span>
              </div>
            </div>
            
            {/* Simplified status indicators */}
            <div className="flex justify-center items-center space-x-3 mt-3">
              {[
                { color: "rgb(56, 189, 248)", label: "NETWORK" },
                { color: "rgb(139, 92, 246)", label: "SECURITY" },
                { color: "rgb(74, 222, 128)", label: "QUANTUM" }
              ].map((item, i) => (
                <div key={`status-${i}`} className="flex items-center">
                  {/* Status indicator */}
                  <div className="relative w-1.5 h-1.5 mr-1.5">
                    <div className="absolute inset-0 rounded-full" style={{ backgroundColor: item.color }} />
                  </div>
                  
                  {/* Status label */}
                  <div className="text-[0.6rem] tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Version number */}
            <div className="absolute bottom-0 right-0 text-[0.6rem] text-slate-600/40 font-mono">
              v1.0.42
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}