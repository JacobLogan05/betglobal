'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import { ChartBarIcon, ArrowTrendingUpIcon, EyeIcon, UserGroupIcon, SparklesIcon, BoltIcon, FireIcon, CheckCircleIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline'

export default function AnalyticsPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse position for dynamic cursor effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Mock analytics data
  const analyticsData = {
    totalViews: 15420,
    conversionRate: 12.5,
    avgSessionTime: '4:32',
    bounceRate: 23.8,
    topPerformers: [
      { name: 'Sarah Johnson', conversions: 45, revenue: 11250 },
      { name: 'Mike Chen', conversions: 38, revenue: 9500 },
      { name: 'Alex Rodriguez', conversions: 32, revenue: 8000 }
    ],
    monthlyData: [
      { month: 'Jan', signups: 120, revenue: 30000 },
      { month: 'Feb', signups: 145, revenue: 36250 },
      { month: 'Mar', signups: 168, revenue: 42000 },
      { month: 'Apr', signups: 192, revenue: 48000 }
    ]
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen relative overflow-hidden">
        {/* Revolutionary Backdrop */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950"></div>
        
        {/* Multi-Dimensional Background Architecture */}
        <div className="fixed inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(119,255,198,0.2),transparent_50%)]"></div>
        </div>

        {/* Animated Background Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Dynamic Cursor Follower */}
        <div 
          className="fixed w-96 h-96 pointer-events-none z-0 transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        ></div>

        <div className="relative z-10 space-y-16 p-8">
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
                  ANALYTICS
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  COMMAND
                </span>
              </h1>
              
              <div className="flex items-center justify-center space-x-4 text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-lg font-medium">Elite Performance Intelligence Center</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              
              <div className="mt-4 text-sm text-gray-400 font-mono">
                DATA STREAM: ACTIVE
              </div>
            </div>
          </div>

          {/* Revolutionary KPIs Grid - Quantum Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Total Views - Golden Quantum */}
            <div className="group relative">
              {/* Multi-layered Glow System */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-8 border border-yellow-500/20 group-hover:border-yellow-400/40 transition-all duration-500 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <EyeIcon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-br from-yellow-400/20 to-red-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-300 text-lg font-black uppercase tracking-widest">Total Views</p>
                  <p className="text-6xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
                    {analyticsData.totalViews.toLocaleString()}
                  </p>
                  <div className="flex items-center space-x-3 text-yellow-400">
                    <FireIcon className="h-6 w-6 animate-pulse" />
                    <span className="text-lg font-black uppercase tracking-wider">EXPLOSIVE GROWTH</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversion Rate - Emerald Sophistication */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-8 border border-emerald-500/20 group-hover:border-emerald-400/40 transition-all duration-500 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <ArrowTrendingUpIcon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-300 text-lg font-black uppercase tracking-widest">Conversion Rate</p>
                  <p className="text-6xl font-black bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl">
                    {analyticsData.conversionRate}%
                  </p>
                  <div className="flex items-center space-x-3 text-emerald-400">
                    <SparklesIcon className="h-6 w-6 animate-pulse" />
                    <span className="text-lg font-black uppercase tracking-wider">ELITE PERFORMANCE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Session Time - Crimson Alert */}
            <div className="group relative">
              {/* Multi-layered Glow System */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-400 via-pink-500 to-rose-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-400 via-pink-500 to-rose-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-8 border border-red-500/20 group-hover:border-red-400/40 transition-all duration-500 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-400 via-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <ChartBarIcon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-br from-red-400/20 to-rose-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-300 text-lg font-black uppercase tracking-widest">Avg Session Time</p>
                  <p className="text-6xl font-black bg-gradient-to-r from-red-400 via-pink-500 to-rose-500 bg-clip-text text-transparent drop-shadow-2xl">
                    {analyticsData.avgSessionTime}
                  </p>
                  <div className="flex items-center space-x-3 text-red-400">
                    <BoltIcon className="h-6 w-6 animate-pulse" />
                    <span className="text-lg font-black uppercase tracking-wider">MAXIMUM ENGAGEMENT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bounce Rate - Emerald Excellence */}
            <div className="group relative">
              {/* Multi-layered Glow System */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-8 border border-emerald-500/20 group-hover:border-emerald-400/40 transition-all duration-500 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <ArrowTrendingDownIcon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-300 text-lg font-black uppercase tracking-widest">Bounce Rate</p>
                  <p className="text-6xl font-black bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl">
                    {analyticsData.bounceRate}%
                  </p>
                  <div className="flex items-center space-x-3 text-emerald-400">
                    <CheckCircleIcon className="h-6 w-6 animate-pulse" />
                    <span className="text-lg font-black uppercase tracking-wider">PERFECT RETENTION</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Revolutionary Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Monthly Performance Chart */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-8 border border-blue-500/20 group-hover:border-blue-400/40 transition-all duration-500 shadow-2xl">
                <h3 className="text-3xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-8">Monthly Performance</h3>
                <div className="space-y-6">
                  {analyticsData.monthlyData.map((data, index) => (
                    <div key={data.month} className="group/item relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-2xl opacity-0 group-hover/item:opacity-100 transition-all duration-300"></div>
                      <div className="relative flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 group-hover/item:border-white/20 transition-all duration-300">
                        <div className="flex items-center space-x-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-2xl">
                            {data.month}
                          </div>
                          <div>
                            <p className="text-white font-bold text-xl">{data.signups} Signups</p>
                            <p className="text-gray-400 text-lg">${data.revenue.toLocaleString()} Revenue</p>
                          </div>
                        </div>
                        <div className="w-32 h-3 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${(data.signups / 200) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Performers */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-8 border border-yellow-500/20 group-hover:border-yellow-400/40 transition-all duration-500 shadow-2xl">
                <h3 className="text-3xl font-black bg-gradient-to-r from-white via-yellow-200 to-orange-300 bg-clip-text text-transparent mb-8">Top Performers</h3>
                <div className="space-y-6">
                  {analyticsData.topPerformers.map((performer, index) => (
                    <div key={performer.name} className="group/item relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-2xl opacity-0 group-hover/item:opacity-100 transition-all duration-300"></div>
                      <div className="relative flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 group-hover/item:border-white/20 transition-all duration-300">
                        <div className="flex items-center space-x-6">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-2xl ${
                            index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                            index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                            'bg-gradient-to-br from-orange-600 to-red-600'
                          }`}>
                            #{index + 1}
                          </div>
                          <div>
                            <p className="text-white font-bold text-xl">{performer.name}</p>
                            <p className="text-gray-400 text-lg">{performer.conversions} conversions</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-black text-2xl">${performer.revenue.toLocaleString()}</p>
                          <p className="text-gray-400 text-lg">Revenue</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Revolutionary Performance Insights */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-8 border border-emerald-500/20 group-hover:border-emerald-400/40 transition-all duration-500 shadow-2xl">
              <h3 className="text-3xl font-black bg-gradient-to-r from-white via-emerald-200 to-cyan-300 bg-clip-text text-transparent mb-8">Performance Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group/insight relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-2xl blur-lg opacity-0 group-hover/insight:opacity-100 transition-all duration-300"></div>
                  <div className="relative p-8 bg-green-500/10 border border-green-500/30 rounded-2xl backdrop-blur-xl">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl">
                        <ArrowTrendingUpIcon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="text-green-300 font-black text-xl">Growth Trend</h4>
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed">Conversion rates have increased by 15% this month compared to last month.</p>
                  </div>
                </div>

                <div className="group/insight relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-2xl blur-lg opacity-0 group-hover/insight:opacity-100 transition-all duration-300"></div>
                  <div className="relative p-8 bg-blue-500/10 border border-blue-500/30 rounded-2xl backdrop-blur-xl">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
                        <EyeIcon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="text-blue-300 font-black text-xl">Traffic Quality</h4>
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed">Average session time has improved, indicating better user engagement.</p>
                  </div>
                </div>

                <div className="group/insight relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 group-hover/insight:opacity-100 transition-all duration-300"></div>
                  <div className="relative p-8 bg-purple-500/10 border border-purple-500/30 rounded-2xl backdrop-blur-xl">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                        <UserGroupIcon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="text-purple-300 font-black text-xl">User Retention</h4>
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed">Bounce rate is below industry average, showing effective landing pages.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}