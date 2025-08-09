'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/app/components/DashboardLayout'
import SalesRepKPIs from '@/app/components/SalesRepKPIs'
import HallOfFame from '@/app/components/HallOfFame'
import SalesRepList from '@/app/components/SalesRepList'
import AddSalesRepForm from '@/app/components/AddSalesRepForm'
import { useSalesRep } from '@/app/contexts/SalesRepContext'
import { 
  TrophyIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  SparklesIcon,
  BoltIcon,
  StarIcon,
  FireIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  BeakerIcon
} from '@heroicons/react/24/outline'

export default function SalesRepsPage() {
  const { salesReps, getKPIs, loading } = useSalesRep()
  const [currentUserData] = useState({ firstName: 'Admin', lastName: 'User', role: 'admin' })
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

  if (loading) {
    return (
      <DashboardLayout currentUser={currentUserData}>
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Revolutionary Loading Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
          
          {/* Quantum Loading Spinner */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative w-32 h-32 border-4 border-transparent bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-spin">
              <div className="absolute inset-2 bg-slate-900 rounded-full"></div>
              <div className="absolute inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <UserGroupIcon className="w-12 h-12 text-white animate-pulse" />
            </div>
          </div>
          
          {/* Loading Text */}
          <div className="absolute bottom-1/3 text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-2">
              Initializing Elite Force
            </div>
            <div className="text-gray-400 font-medium">Loading sales representatives...</div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const kpis = getKPIs()

  // Top performer for Hall of Fame (convert to number ID for HallOfFame component)
  const topPerformer = salesReps.length > 0 
    ? salesReps.reduce((top, rep) => rep.totalSignups > top.totalSignups ? rep : top)
    : null
  
  const hallOfFameRepFormatted = topPerformer ? {
    ...topPerformer,
    id: parseInt(topPerformer.id) // Convert string ID to number for HallOfFame
  } : null

  return (
    <DashboardLayout currentUser={currentUserData}>
      {/* Revolutionary Cursor Follower */}
      <div 
        className={`fixed w-96 h-96 pointer-events-none z-0 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-red-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 space-y-12">
        {/* Revolutionary Hero Section */}
        <div className="relative">
          {/* Quantum Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl mb-8 shadow-2xl shadow-yellow-500/25 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
              <UserGroupIcon className="h-10 w-10 text-white relative z-10" />
            </div>
            
            <h1 className="text-7xl font-black mb-6 relative">
              <span className="bg-gradient-to-r from-white via-yellow-200 to-orange-300 bg-clip-text text-transparent">
                SALES REPS
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                COMMAND
              </span>
            </h1>
            
            <div className="flex items-center justify-center space-x-4 text-gray-300">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-lg font-medium">Elite Sales Force Management</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            <div className="mt-4 text-sm text-gray-400 font-mono">
              QUANTUM LEVEL: MAXIMUM
            </div>
          </div>
        </div>

        {/* KPIs Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-slate-900/90 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{kpis.activeReps}</div>
            <div className="text-gray-400">Active Representatives</div>
          </div>
          <div className="bg-gradient-to-br from-slate-900/90 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{kpis.totalSignups}</div>
            <div className="text-gray-400">Total Signups</div>
          </div>
          <div className="bg-gradient-to-br from-slate-900/90 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">${kpis.totalCommissionsEarned.toLocaleString()}</div>
            <div className="text-gray-400">Total Earned</div>
          </div>
        </div>
        
        <SalesRepKPIs 
          totalSignups={kpis.totalSignups}
          totalCommissionsPaid={kpis.totalCommissionsPaid}
          totalCommissionsDue={kpis.totalCommissionsDue}
        />

        {/* Hall of Fame */}
        {hallOfFameRepFormatted && (
          <HallOfFame rep={hallOfFameRepFormatted} />
        )}

        {/* Sales Rep List */}
        <div className="bg-gradient-to-br from-slate-900/90 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
          <div className="p-8 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ChartBarIcon className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Sales Representatives</h2>
              </div>
              <div className="text-sm text-gray-400">
                {kpis.totalReps} total • {kpis.activeReps} active
              </div>
            </div>
          </div>
          <div className="p-8">
            <SalesRepList />
          </div>
        </div>

        {/* Add Sales Rep Form */}
        <AddSalesRepForm />
      </div>
    </DashboardLayout>
  )
}