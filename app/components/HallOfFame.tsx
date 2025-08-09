'use client'

import { TrophyIcon } from '@heroicons/react/24/solid'

interface Rep {
  id: number
  firstName: string
  lastName: string
  role: string
  totalSignups: number
  bovadaSignups: number
  chalkboardSignups: number
  commissionsEarned: number
  commissionsPaid: number
  commissionsDue: number
  status: string
  notes: string
}

interface HallOfFameProps {
  rep: Rep
}

export default function HallOfFame({ rep }: HallOfFameProps) {
  return (
    <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-lg backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-b border-yellow-500/30 p-6">
        <div className="flex items-center justify-center space-x-3">
          <TrophyIcon className="h-8 w-8 text-yellow-400" />
          <h2 className="text-2xl font-bold text-yellow-300 font-mono">HALL OF FAME</h2>
          <TrophyIcon className="h-8 w-8 text-yellow-400" />
        </div>
        <p className="text-center text-yellow-300/60 text-sm mt-2">Top Performer - Most Signups</p>
      </div>

      {/* Champion Rep */}
      <div className="p-8">
        <div className="text-center">
          {/* Crown Icon */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <TrophyIcon className="h-10 w-10 text-yellow-900" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-yellow-900 text-xs font-bold">CROWN</span>
              </div>
            </div>
          </div>

          {/* Rep Info */}
          <h3 className="text-3xl font-bold text-yellow-300 mb-2">
            {rep.firstName} {rep.lastName}
          </h3>
          <p className="text-yellow-300/80 text-lg mb-4">{rep.role}</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <div className="text-yellow-300/60 text-xs font-mono">TOTAL SIGNUPS</div>
              <div className="text-2xl font-bold text-yellow-300">{rep.totalSignups}</div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <div className="text-orange-300/60 text-xs font-mono">BOVADA</div>
              <div className="text-2xl font-bold text-orange-300">{rep.bovadaSignups}</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="text-blue-300/60 text-xs font-mono">CHALKBOARD</div>
              <div className="text-2xl font-bold text-blue-300">{rep.chalkboardSignups}</div>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="text-green-300/60 text-xs font-mono">EARNED</div>
              <div className="text-2xl font-bold text-green-300">${rep.commissionsEarned.toLocaleString()}</div>
            </div>
          </div>

          {/* Achievement Badge */}
          <div className="mt-6">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full">
              <TrophyIcon className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-yellow-300 font-bold text-sm">SIGNUP CHAMPION</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}