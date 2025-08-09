'use client'

import { 
  UsersIcon, 
  SparklesIcon, 
  BoltIcon 
} from '@heroicons/react/24/outline'

interface SalesRepKPIsProps {
  totalSignups: number
  totalCommissionsPaid: number
  totalCommissionsDue: number
}

export default function SalesRepKPIs({ 
  totalSignups, 
  totalCommissionsPaid, 
  totalCommissionsDue 
}: SalesRepKPIsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Total Signups - Quantum Design */}
      <div className="group relative overflow-hidden">
        {/* Multi-layered glow system */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        
        <div className="relative bg-gradient-to-br from-white/[0.15] via-white/[0.08] to-white/[0.03] backdrop-blur-2xl border border-white/20 rounded-2xl p-8 shadow-[0_24px_48px_rgba(0,0,0,0.3)] hover:shadow-[0_32px_64px_rgba(59,130,246,0.15)] transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1">
          {/* Subtle inner border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/10 via-transparent to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl blur-md opacity-50 animate-pulse"></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25 transform group-hover:scale-110 transition-transform duration-500">
                  <UsersIcon className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="text-blue-400 text-sm font-bold tracking-wider bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
                TOTAL
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="text-4xl font-black bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent tracking-tight">
                {totalSignups}
              </div>
              <div className="text-sm text-gray-300 font-semibold tracking-wide uppercase">Total Signups</div>
              <div className="text-xs text-blue-400 font-medium bg-blue-400/5 px-2 py-1 rounded-md">
                All sales reps combined
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Commissions Paid - Purple Elegance */}
      <div className="group relative overflow-hidden">
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-400/20 to-purple-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        
        <div className="relative bg-gradient-to-br from-white/[0.15] via-white/[0.08] to-white/[0.03] backdrop-blur-2xl border border-white/20 rounded-2xl p-8 shadow-[0_24px_48px_rgba(0,0,0,0.3)] hover:shadow-[0_32px_64px_rgba(147,51,234,0.15)] transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/10 via-transparent to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl blur-md opacity-50 animate-pulse"></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/25 transform group-hover:scale-110 transition-transform duration-500">
                  <SparklesIcon className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="text-purple-400 text-sm font-bold tracking-wider bg-purple-400/10 px-3 py-1 rounded-full border border-purple-400/20">
                PAID
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="text-4xl font-black bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent tracking-tight">
                ${totalCommissionsPaid.toLocaleString()}
              </div>
              <div className="text-sm text-gray-300 font-semibold tracking-wide uppercase">Commissions Paid</div>
              <div className="text-xs text-purple-400 font-medium bg-purple-400/5 px-2 py-1 rounded-md">
                To sales team
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Commissions Due - Amber Power */}
      <div className="group relative overflow-hidden">
        <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-orange-400/20 to-amber-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
        <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        
        <div className="relative bg-gradient-to-br from-white/[0.15] via-white/[0.08] to-white/[0.03] backdrop-blur-2xl border border-white/20 rounded-2xl p-8 shadow-[0_24px_48px_rgba(0,0,0,0.3)] hover:shadow-[0_32px_64px_rgba(245,158,11,0.15)] transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/10 via-transparent to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl blur-md opacity-50 animate-pulse"></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-amber-500/25 transform group-hover:scale-110 transition-transform duration-500">
                  <BoltIcon className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="text-amber-400 text-sm font-bold tracking-wider bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                PENDING
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="text-4xl font-black bg-gradient-to-r from-white via-amber-100 to-orange-100 bg-clip-text text-transparent tracking-tight">
                ${totalCommissionsDue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-300 font-semibold tracking-wide uppercase">Outstanding</div>
              <div className="text-xs text-amber-400 font-medium bg-amber-400/5 px-2 py-1 rounded-md">
                Awaiting payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}