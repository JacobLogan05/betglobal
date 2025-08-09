'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/app/components/DashboardLayout'
import { 
  ChartBarIcon, 
  UsersIcon, 
  CurrencyDollarIcon, 
  TrophyIcon,
  SparklesIcon,
  BoltIcon,
  FireIcon,
  StarIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  BeakerIcon,
  EyeIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline'
import { useSalesRep } from '@/app/contexts/SalesRepContext'

export default function AdminDashboard() {
  const { salesReps, loading } = useSalesRep()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Calculate KPIs
  const totalReps = salesReps.length
  const totalSignups = salesReps.reduce((sum, rep) => sum + rep.totalSignups, 0)
  const totalCommissions = salesReps.reduce((sum, rep) => sum + rep.commissionsEarned, 0)
  const avgSignupsPerRep = totalReps > 0 ? Math.round(totalSignups / totalReps) : 0

  const topPerformers = salesReps
    .sort((a, b) => b.totalSignups - a.totalSignups)
    .slice(0, 5)

  if (loading) {
    return (
      <DashboardLayout>
        {/* Revolutionary Loading Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-gray-950 to-slate-950"></div>
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950/50 to-slate-950"></div>
        
        {/* Quantum Loading Spinner */}
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-3xl rounded-full animate-pulse"></div>
            <div className="relative w-32 h-32 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
            <div className="absolute inset-4 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin animate-reverse"></div>
            <div className="absolute inset-8 border-4 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      {/* Revolutionary Backdrop */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-gray-950 to-slate-950"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950/50 to-slate-950"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      
      {/* Multi-Dimensional Background Architecture */}
      <div className="fixed inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_50%,transparent_75%)] bg-[length:60px_60px] animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(-45deg,transparent_25%,rgba(147,51,234,0.05)_50%,transparent_75%)] bg-[length:60px_60px] animate-pulse delay-1000"></div>
      </div>
      
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Revolutionary Cursor Follower */}
        <div 
          className="fixed pointer-events-none z-50 w-6 h-6 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-full blur-sm transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
            transform: `scale(${isVisible ? 1 : 0})`,
          }}
        />

      <div className={`relative space-y-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Revolutionary Hero Section */}
        <div className="relative">
          {/* Quantum Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl mb-8 shadow-2xl shadow-yellow-500/25 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
              <ChartBarIcon className="h-10 w-10 text-white relative z-10" />
            </div>
            
            <h1 className="text-7xl font-black mb-6 relative">
              <span className="bg-gradient-to-r from-white via-yellow-200 to-orange-300 bg-clip-text text-transparent">
                ADMIN
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                COMMAND
              </span>
            </h1>
            
            <div className="flex items-center justify-center space-x-4 text-gray-300">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-lg font-medium">Elite Financial Operations Center</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            <div className="mt-4 text-sm text-gray-400 font-mono">
              ALL SYSTEMS OPERATIONAL
            </div>
          </div>
        </div>

        {/* Revolutionary KPIs Grid */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/5 to-red-500/10 blur-3xl rounded-[2rem]"></div>
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Sales Reps - Golden Quantum */}
            <div className="group relative overflow-hidden">
              {/* Multi-layered glow system */}
              <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400/20 via-orange-500/20 to-red-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-2 bg-gradient-to-br from-yellow-400/10 via-orange-500/10 to-red-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.04] backdrop-blur-2xl border-2 border-yellow-500/30 rounded-2xl p-6 shadow-2xl group-hover:border-yellow-400/50 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 blur-xl rounded-xl"></div>
                      <div className="relative w-14 h-14 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                        <UsersIcon className="h-7 w-7 text-white animate-pulse" />
                        <FireIcon className="absolute -top-1 -right-1 h-4 w-4 text-yellow-200 animate-bounce" />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
                        {totalReps}
                      </div>
                      <div className="text-sm text-yellow-300 font-black tracking-widest uppercase">
                        ELITE AGENTS
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-lg text-gray-200 font-black uppercase tracking-wider">ACTIVE REPRESENTATIVES</div>
                    <div className="w-full bg-black/50 rounded-full h-3 shadow-inner">
                      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-3 rounded-full shadow-lg shadow-yellow-500/50 animate-pulse" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Signups */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.04] backdrop-blur-2xl rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 border border-white/20 rounded-2xl group-hover:border-green-400/30 transition-colors duration-500"></div>
              
              <div className="relative p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20 blur-xl rounded-xl"></div>
                    <div className="relative w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                      <TrophyIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                      {totalSignups}
                    </div>
                    <div className="text-xs text-green-300 font-semibold tracking-wide uppercase">
                      TOTAL SIGNUPS
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-gray-300 font-medium">Customer Acquisitions</div>
                  <div className="w-full bg-black/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Commissions */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.04] backdrop-blur-2xl rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 border border-white/20 rounded-2xl group-hover:border-yellow-400/30 transition-colors duration-500"></div>
              
              <div className="relative p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 blur-xl rounded-xl"></div>
                    <div className="relative w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                      <CurrencyDollarIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                      ${totalCommissions.toLocaleString()}
                    </div>
                    <div className="text-xs text-yellow-300 font-semibold tracking-wide uppercase">
                      COMMISSIONS
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-gray-300 font-medium">Total Earnings</div>
                  <div className="w-full bg-black/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Average Signups */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.04] backdrop-blur-2xl rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 border border-white/20 rounded-2xl group-hover:border-purple-400/30 transition-colors duration-500"></div>
              
              <div className="relative p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-500/20 blur-xl rounded-xl"></div>
                    <div className="relative w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                      <ChartBarIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                      {avgSignupsPerRep}
                    </div>
                    <div className="text-xs text-purple-300 font-semibold tracking-wide uppercase">
                      AVG PER REP
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-gray-300 font-medium">Performance Average</div>
                  <div className="w-full bg-black/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revolutionary Charts Section */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Performance Chart */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 blur-3xl rounded-[2rem]"></div>
            <div className="relative bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.04] backdrop-blur-2xl border border-white/20 rounded-2xl p-8 shadow-2xl group-hover:shadow-green-500/10 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20 blur-xl rounded-xl"></div>
                    <div className="relative w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                      <ArrowTrendingUpIcon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                      WEEKLY PERFORMANCE
                    </h3>
                    <p className="text-green-300/80 text-sm">Signups & Commissions Trend</p>
                  </div>
                </div>
                
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative mb-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                        <ArrowTrendingUpIcon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute inset-0 w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-green-500 to-emerald-500 blur-lg opacity-30"></div>
                    </div>
                    <p className="text-gray-400">Chart visualization coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Distribution */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-indigo-500/10 blur-3xl rounded-[2rem]"></div>
            <div className="relative bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.04] backdrop-blur-2xl border border-white/20 rounded-2xl p-8 shadow-2xl group-hover:shadow-blue-500/10 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-xl rounded-xl"></div>
                    <div className="relative w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                      <ChartBarIcon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      PLATFORM DISTRIBUTION
                    </h3>
                    <p className="text-blue-300/80 text-sm">Signup Sources Breakdown</p>
                  </div>
                </div>
                
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative mb-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <ChartBarIcon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute inset-0 w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-30"></div>
                    </div>
                    <p className="text-gray-400">Chart visualization coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revolutionary Top Performers */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-rose-500/10 blur-3xl rounded-[2rem]"></div>
          <div className="relative bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.04] backdrop-blur-2xl border border-white/20 rounded-2xl p-8 shadow-2xl group hover:shadow-purple-500/10 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-500/20 blur-xl rounded-xl"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                    <TrophyIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    TOP PERFORMERS
                  </h3>
                  <p className="text-purple-300/80">Elite agent leaderboard</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {topPerformers.map((rep, index) => (
                  <div key={rep.id} className="group/item relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-xl rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-between p-4 border border-white/10 rounded-xl group-hover/item:border-purple-400/30 transition-colors duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                            index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                            index === 2 ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white' :
                            'bg-gradient-to-br from-purple-400 to-pink-500 text-white'
                          }`}>
                            {index + 1}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-white">
                            {rep.firstName} {rep.lastName}
                          </div>
                          <div className="text-sm text-gray-400">{rep.email}</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-lg bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                          {rep.totalSignups} signups
                        </div>
                        <div className="text-sm text-purple-300">
                          ${rep.commissionsEarned.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}