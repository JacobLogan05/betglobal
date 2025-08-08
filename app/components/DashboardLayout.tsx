'use client'

import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  UsersIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon,
  CogIcon,
  DocumentTextIcon,
  TrophyIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

interface DashboardLayoutProps {
  children: React.ReactNode
  currentUser: any
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Sales Reps', href: '/admin/reps', icon: UsersIcon },
  { name: 'Signups', href: '/admin/signups', icon: UserGroupIcon },
  { name: 'Commissions', href: '/admin/commissions', icon: CurrencyDollarIcon },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
  { name: 'Bonuses', href: '/admin/bonuses', icon: TrophyIcon },
  { name: 'Reports', href: '/admin/reports', icon: DocumentTextIcon },
  { name: 'Settings', href: '/admin/settings', icon: CogIcon },
]

export default function DashboardLayout({ children, currentUser }: DashboardLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>

      {/* Header */}
      <div className="relative z-10 border-b border-cyan-500/20 bg-black/50 backdrop-blur-sm">
        <div className="px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              BET GLOBAL OS
            </h1>
            <div className="text-cyan-300/60 text-xs font-mono">
              [ NEURAL COMMAND INTERFACE ACTIVE ]
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-cyan-300">
                {currentUser?.firstName || 'Admin'} {currentUser?.lastName || 'User'}
              </div>
              <div className="text-xs text-purple-300/60 font-mono uppercase">
                {currentUser?.role || 'ADMIN'}
              </div>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>

      <div className="flex relative z-10">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-black/30 backdrop-blur-sm border-r border-cyan-500/20 min-h-screen">
          <nav className="p-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-gray-400 hover:text-cyan-300 hover:bg-gray-800/30'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* System Status */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="text-xs text-green-300 font-mono">SYSTEM ONLINE</div>
              </div>
              <div className="text-xs text-green-300/60 mt-1">All systems operational</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  )
}