'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { 
  HomeIcon, 
  UsersIcon, 
  UserPlusIcon, 
  CurrencyDollarIcon,
  ChartBarIcon,
  GiftIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  BoltIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

interface DashboardLayoutProps {
  children: React.ReactNode
  currentUser?: any
}

export default function DashboardLayout({ children, currentUser }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon, gradient: 'from-yellow-400 to-orange-400' },
    { name: 'Sales Reps', href: '/admin/reps', icon: UsersIcon, gradient: 'from-orange-400 to-red-400' },
    { name: 'Signups', href: '/admin/signups', icon: UserPlusIcon, gradient: 'from-red-400 to-pink-400' },
    { name: 'Commissions', href: '/admin/commissions', icon: CurrencyDollarIcon, gradient: 'from-yellow-400 to-orange-400' },
    { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon, gradient: 'from-orange-400 to-red-400' },
    { name: 'Bonuses', href: '/admin/bonuses', icon: GiftIcon, gradient: 'from-red-400 to-pink-400' },
    { name: 'Reports', href: '/admin/reports', icon: DocumentTextIcon, gradient: 'from-yellow-400 to-orange-400' },
    { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon, gradient: 'from-orange-400 to-red-400' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Subtle grid pattern */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSidebarOpen(false)} />
        <div className={`fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-slate-950/98 to-gray-950/98 backdrop-blur-2xl border-r border-white/10 shadow-2xl transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-8 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                <BoltIcon className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent tracking-tight">
                BET GLOBAL OS
              </h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-white transition-all duration-200 p-2 hover:bg-white/5 rounded-lg"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          <nav className="p-6 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-white/10 to-white/5 border border-white/20 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl"></div>
                  )}
                  <div className={`relative z-10 w-5 h-5 mr-4 ${isActive ? `bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent` : ''}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="relative z-10 font-medium tracking-wide">{item.name}</span>
                  {isActive && (
                    <div className="absolute right-3 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 w-72">
        <div className="h-full bg-gradient-to-b from-slate-950/95 to-gray-950/95 backdrop-blur-2xl border-r border-white/10 shadow-2xl">
          <div className="flex items-center p-8 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                <BoltIcon className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent tracking-tight">
                BET GLOBAL OS
              </h1>
            </div>
          </div>
          <nav className="p-6 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-white/10 to-white/5 border border-white/20 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl"></div>
                  )}
                  <div className={`relative z-10 w-5 h-5 mr-4 ${isActive ? `bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent` : ''}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="relative z-10 font-medium tracking-wide">{item.name}</span>
                  {isActive && (
                    <div className="absolute right-3 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-72">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-gradient-to-r from-slate-950/95 to-gray-950/95 backdrop-blur-2xl border-b border-white/10 shadow-lg">
          <div className="flex items-center justify-between px-8 py-5">
            <button
              onClick={() => setSidebarOpen(true)}
              className="hidden text-gray-400 hover:text-white transition-all duration-200 p-2 hover:bg-white/5 rounded-lg"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-6">
              <div className="text-right hidden sm:block">
                <div className="text-sm text-gray-400 font-medium">Welcome back,</div>
                <div className="text-white font-semibold tracking-wide bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  {currentUser?.firstName} {currentUser?.lastName}
                </div>
              </div>
              <div className="relative">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-11 h-11 border-2 border-white/20 hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-xl"
                    }
                  }}
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-slate-950 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}