'use client'

import React from 'react'
import { 
  UserPlusIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  XCircleIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import { useSignups } from '@/contexts/SignupContext'

export default function SignupKPICards() {
  const { kpis, loading } = useSignups()

  if (loading || !kpis) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gradient-to-br from-slate-900/90 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl animate-pulse">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 bg-gray-600 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-600 rounded w-16"></div>
              </div>
              <div className="w-12 h-12 bg-gray-600 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const formatCurrency = (amount: string) => {
    return `$${parseFloat(amount).toLocaleString()}`
  }

  const kpiCards = [
    {
      title: 'Total Signups',
      value: kpis.totalSignups.toLocaleString(),
      icon: UserPlusIcon,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/5'
    },
    {
      title: 'Qualified Signups',
      value: kpis.qualifiedSignups.toLocaleString(),
      icon: CheckCircleIcon,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/5'
    },
    {
      title: 'Pending Review',
      value: kpis.pendingSignups.toLocaleString(),
      icon: ClockIcon,
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-500/10 to-orange-500/5'
    },
    {
      title: 'Rejected',
      value: kpis.rejectedSignups.toLocaleString(),
      icon: XCircleIcon,
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-500/10 to-pink-500/5'
    },
    {
      title: 'Total Deposits',
      value: formatCurrency(kpis.totalDeposits),
      icon: CurrencyDollarIcon,
      gradient: 'from-purple-500 to-indigo-500',
      bgGradient: 'from-purple-500/10 to-indigo-500/5'
    },
    {
      title: 'Conversion Rate',
      value: kpis.totalSignups > 0 
        ? `${((kpis.qualifiedSignups / kpis.totalSignups) * 100).toFixed(1)}%`
        : '0%',
      icon: ArrowTrendingUpIcon,
      gradient: 'from-teal-500 to-cyan-500',
      bgGradient: 'from-teal-500/10 to-cyan-500/5'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {kpiCards.map((card, index) => (
        <div
          key={index}
          className={`relative bg-gradient-to-br from-slate-900/90 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group`}
        >
          {/* Background gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
          
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-2">
                {card.title}
              </p>
              <p className="text-3xl font-bold text-white">
                {card.value}
              </p>
            </div>
            <div className={`w-12 h-12 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
              <card.icon className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* Additional metrics for some cards */}
          {card.title === 'Total Signups' && (
            <div className="relative mt-4 pt-4 border-t border-white/10">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Bovada:</span>
                <span className="text-orange-300 font-medium">{kpis.bovadaSignups}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-400">Chalkboard:</span>
                <span className="text-purple-300 font-medium">{kpis.chalkboardSignups}</span>
              </div>
            </div>
          )}

          {card.title === 'Qualified Signups' && kpis.totalSignups > 0 && (
            <div className="relative mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Success Rate:</span>
                <span className="text-green-300 font-medium">
                  {((kpis.qualifiedSignups / kpis.totalSignups) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}