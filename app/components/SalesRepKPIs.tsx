'use client'

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Signups */}
      <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm">
        <div className="text-center">
          <div className="text-cyan-300/60 text-sm font-mono mb-2">TOTAL SIGNUPS</div>
          <div className="text-4xl font-bold text-cyan-300 mb-2">{totalSignups}</div>
          <div className="text-xs text-cyan-300/40">All Sales Reps Combined</div>
        </div>
      </div>

      {/* Commissions Paid */}
      <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm">
        <div className="text-center">
          <div className="text-green-300/60 text-sm font-mono mb-2">COMMISSIONS PAID</div>
          <div className="text-4xl font-bold text-green-300 mb-2">${totalCommissionsPaid.toLocaleString()}</div>
          <div className="text-xs text-green-300/40">Total Paid Out</div>
        </div>
      </div>

      {/* Outstanding Commissions */}
      <div className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/30 rounded-lg p-6 backdrop-blur-sm">
        <div className="text-center">
          <div className="text-red-300/60 text-sm font-mono mb-2">OUTSTANDING</div>
          <div className="text-4xl font-bold text-red-300 mb-2">${totalCommissionsDue.toLocaleString()}</div>
          <div className="text-xs text-red-300/40">Commissions Due</div>
        </div>
      </div>
    </div>
  )
}