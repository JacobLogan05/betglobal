'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import DashboardLayout from '../../../components/DashboardLayout'
import { 
  UserIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  CalendarIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  TrophyIcon,
  ClockIcon,
  PencilIcon,
  ArrowLeftIcon,
  SparklesIcon,
  BoltIcon,
  FireIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function SalesRepDetailPage() {
  const params = useParams()
  const repId = params.id as string
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse position for dynamic cursor effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Mock sales rep data - in a real app, this would come from a database
  const mockSalesReps = [
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@betglobal.com',
      phone: '+1 (555) 123-4567',
      role: 'Senior Sales Rep',
      totalSignups: 45,
      bovadaSignups: 28,
      chalkboardSignups: 17,
      commissionsEarned: 1800,
      commissionsPaid: 1200,
      commissionsDue: 600,
      status: 'Active' as const,
      joinDate: '2024-01-15',
      lastActivity: '2024-03-15',
      notes: 'Top performer this quarter',
      avatar: 'SJ',
      department: 'Sales',
      manager: 'John Smith',
      territory: 'North America',
      monthlyTarget: 50,
      recentSignups: [
        { id: 1, customerName: 'John Doe', platform: 'Bovada', date: '2024-03-15', commission: 40 },
        { id: 2, customerName: 'Jane Smith', platform: 'Chalkboard', date: '2024-03-14', commission: 30 },
        { id: 3, customerName: 'Mike Wilson', platform: 'Bovada', date: '2024-03-13', commission: 40 },
        { id: 4, customerName: 'Lisa Brown', platform: 'Chalkboard', date: '2024-03-12', commission: 30 },
        { id: 5, customerName: 'Tom Davis', platform: 'Bovada', date: '2024-03-11', commission: 40 }
      ]
    },
    {
      id: '2',
      firstName: 'Mike',
      lastName: 'Chen',
      email: 'mike.chen@betglobal.com',
      phone: '+1 (555) 234-5678',
      role: 'Sales Rep',
      totalSignups: 38,
      bovadaSignups: 23,
      chalkboardSignups: 15,
      commissionsEarned: 1520,
      commissionsPaid: 1000,
      commissionsDue: 520,
      status: 'Active' as const,
      joinDate: '2024-02-01',
      lastActivity: '2024-03-14',
      notes: 'Consistent performance',
      avatar: 'MC',
      department: 'Sales',
      manager: 'John Smith',
      territory: 'West Coast',
      monthlyTarget: 40,
      recentSignups: [
        { id: 1, customerName: 'Alex Johnson', platform: 'Bovada', date: '2024-03-14', commission: 40 },
        { id: 2, customerName: 'Sarah Wilson', platform: 'Chalkboard', date: '2024-03-13', commission: 30 },
        { id: 3, customerName: 'David Lee', platform: 'Bovada', date: '2024-03-12', commission: 40 }
      ]
    }
    // Add more mock data as needed
  ]

  const salesRep = mockSalesReps.find(rep => rep.id === repId)

  if (!salesRep) {
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
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-400 via-pink-500 to-rose-500 rounded-3xl mb-8 shadow-2xl shadow-red-500/25 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-pink-500 to-rose-500 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
                <UserIcon className="h-10 w-10 text-white relative z-10" />
              </div>
              
              <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-white via-red-200 to-pink-300 bg-clip-text text-transparent">
                SALES REP NOT FOUND
              </h1>
              <p className="text-gray-400 mb-8 text-lg">The sales representative you're looking for doesn't exist in our quantum database.</p>
              
              <div className="group relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-500 rounded-3xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-500"></div>
                
                <Link 
                  href="/admin/reps"
                  className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 via-blue-600 to-cyan-600 rounded-3xl text-white font-black text-lg shadow-2xl group-hover:scale-105 transition-all duration-300 backdrop-blur-xl border border-white/20"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-3" />
                  RETURN TO COMMAND CENTER
                  <SparklesIcon className="h-5 w-5 ml-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const completionRate = (salesRep.totalSignups / salesRep.monthlyTarget) * 100

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
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
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
          {/* Revolutionary Header */}
          <div className="relative">
            <div className="flex items-center justify-between mb-16">
              <div className="flex items-center space-x-6">
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
                  <Link 
                    href="/admin/reps"
                    className="relative p-4 bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl text-gray-400 hover:text-white border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 shadow-2xl group-hover:scale-110"
                  >
                    <ArrowLeftIcon className="h-6 w-6" />
                  </Link>
                </div>
                
                <div>
                  <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-transparent">
                    ELITE AGENT PROFILE
                  </h1>
                  <p className="text-gray-400 text-lg">Advanced performance analytics and management interface</p>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 rounded-3xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-500"></div>
                
                <Link
                  href={`/admin/reps/${repId}/edit`}
                  className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 rounded-3xl text-white font-black text-lg shadow-2xl group-hover:scale-105 transition-all duration-300 backdrop-blur-xl border border-white/20"
                >
                  <PencilIcon className="h-5 w-5 mr-3" />
                  MODIFY AGENT
                  <BoltIcon className="h-5 w-5 ml-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Revolutionary Profile Section */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
            
            <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-12 border border-purple-500/20 group-hover:border-purple-400/40 transition-all duration-500 shadow-2xl">
              <div className="flex items-start space-x-8">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-400 via-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    {salesRep.avatar}
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-br from-purple-400/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Elite Status Badge */}
                  <div className="absolute -top-2 -right-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                      <StarIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-5xl font-black mb-2 bg-gradient-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-transparent">
                        {salesRep.firstName} {salesRep.lastName}
                      </h2>
                      <p className="text-2xl text-gray-300 mb-4 font-bold">{salesRep.role}</p>
                      <div className="flex items-center space-x-4">
                        <span className={`px-6 py-3 rounded-2xl text-lg font-black border-2 ${
                          salesRep.status === 'Active' 
                            ? 'text-green-400 bg-green-500/20 border-green-500/40 shadow-lg shadow-green-500/25'
                            : 'text-red-400 bg-red-500/20 border-red-500/40 shadow-lg shadow-red-500/25'
                        }`}>
                          {salesRep.status}
                        </span>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">QUANTUM OPERATIONAL</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      { icon: EnvelopeIcon, label: 'Quantum Email', value: salesRep.email, color: 'from-blue-400 to-cyan-500' },
                      { icon: PhoneIcon, label: 'Neural Link', value: salesRep.phone, color: 'from-emerald-400 to-green-500' },
                      { icon: CalendarIcon, label: 'Genesis Date', value: salesRep.joinDate, color: 'from-orange-400 to-yellow-500' },
                      { icon: ClockIcon, label: 'Last Sync', value: salesRep.lastActivity, color: 'from-red-400 to-pink-500' }
                    ].map((item, index) => (
                      <div key={index} className="group/info relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl opacity-0 group-hover/info:opacity-100 transition-all duration-300"></div>
                        <div className="relative flex items-center space-x-4 p-6 bg-white/5 rounded-2xl border border-white/10 group-hover/info:border-white/20 transition-all duration-300">
                          <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg`}>
                            <item.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">{item.label}</p>
                            <p className="text-white font-bold text-lg">{item.value}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Revolutionary Performance KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Total Signups',
                value: salesRep.totalSignups,
                icon: UserIcon,
                color: 'from-purple-400 via-blue-500 to-cyan-500',
                bgColor: 'from-purple-500/20 to-cyan-500/20',
                borderColor: 'border-purple-500/20 group-hover:border-purple-400/40'
              },
              {
                title: 'Commissions Earned',
                value: `$${salesRep.commissionsEarned.toLocaleString()}`,
                icon: CurrencyDollarIcon,
                color: 'from-emerald-400 via-green-500 to-teal-500',
                bgColor: 'from-emerald-500/20 to-teal-500/20',
                borderColor: 'border-emerald-500/20 group-hover:border-emerald-400/40'
              },
              {
                title: 'Target Progress',
                value: `${Math.round(completionRate)}%`,
                icon: TrophyIcon,
                color: 'from-orange-400 via-amber-500 to-yellow-500',
                bgColor: 'from-orange-500/20 to-yellow-500/20',
                borderColor: 'border-orange-500/20 group-hover:border-orange-400/40'
              },
              {
                title: 'Performance Score',
                value: '9.8/10',
                icon: ChartBarIcon,
                color: 'from-red-400 via-pink-500 to-rose-500',
                bgColor: 'from-red-500/20 to-rose-500/20',
                borderColor: 'border-red-500/20 group-hover:border-red-400/40'
              }
            ].map((kpi, index) => (
              <div key={index} className="group relative">
                <div className={`absolute -inset-1 bg-gradient-to-r ${kpi.color} rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500 animate-pulse`}></div>
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${kpi.color} rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500`}></div>
                
                <div className={`relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-8 border ${kpi.borderColor} transition-all duration-500 shadow-2xl`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative">
                      <div className={`w-16 h-16 bg-gradient-to-br ${kpi.color} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                        <kpi.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className={`absolute -inset-2 bg-gradient-to-br ${kpi.bgColor} rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-3">{kpi.title}</p>
                    <p className="text-4xl font-black text-white mb-2">{kpi.value}</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-400 font-medium">QUANTUM ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Revolutionary Recent Activity Section */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
            
            <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-8 border border-indigo-500/20 group-hover:border-indigo-400/40 transition-all duration-500 shadow-2xl">
              <div className="flex items-center space-x-4 mb-8">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <FireIcon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-indigo-400/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-3xl font-black bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">Recent Quantum Signups</h3>
              </div>
              
              <div className="space-y-4">
                {salesRep.recentSignups.map((signup, index) => (
                  <div key={signup.id} className="group/signup relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400/10 to-purple-500/10 rounded-2xl opacity-0 group-hover/signup:opacity-100 transition-all duration-300"></div>
                    <div className="relative flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 group-hover/signup:border-white/20 transition-all duration-300">
                      <div className="flex items-center space-x-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                          {signup.customerName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg">{signup.customerName}</h4>
                          <p className="text-gray-400 text-sm">{signup.platform} • {signup.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-green-400">${signup.commission}</p>
                        <p className="text-xs text-gray-400 font-medium">COMMISSION</p>
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