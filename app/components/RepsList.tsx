'use client'

import { useState } from 'react'

interface Rep {
  id: string
  firstName: string
  lastName: string
  email: string
  isActive: boolean
  hireDate: Date | null
  createdAt: Date
}

interface RepsListProps {
  reps: Rep[]
}

export default function RepsList({ reps }: RepsListProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')

  const filteredReps = reps.filter(rep => {
    if (filter === 'active') return rep.isActive
    if (filter === 'inactive') return !rep.isActive
    return true
  })

  const toggleRepStatus = async (repId: string, currentStatus: boolean) => {
    try {
      const response = await fetch('/api/admin/toggle-rep-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repId, isActive: !currentStatus }),
      })

      if (response.ok) {
        window.location.reload()
      }
    } catch (error) {
      console.error('Failed to toggle rep status:', error)
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-900/40 to-black/40 border border-cyan-500/20 rounded-lg backdrop-blur-sm">
      <div className="p-6 border-b border-cyan-500/20">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-cyan-300 mb-2">Sales Reps Management</h2>
            <p className="text-cyan-300/60 text-sm font-mono">[ NEURAL AGENT DIRECTORY ]</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                filter === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'bg-black/30 text-cyan-300/60 border border-cyan-500/10 hover:border-cyan-500/30'
              }`}
            >
              ALL ({reps.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                filter === 'active'
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : 'bg-black/30 text-green-300/60 border border-green-500/10 hover:border-green-500/30'
              }`}
            >
              ACTIVE ({reps.filter(r => r.isActive).length})
            </button>
            <button
              onClick={() => setFilter('inactive')}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                filter === 'inactive'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                  : 'bg-black/30 text-red-300/60 border border-red-500/10 hover:border-red-500/30'
              }`}
            >
              INACTIVE ({reps.filter(r => !r.isActive).length})
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {filteredReps.length > 0 ? (
          <div className="space-y-4">
            {filteredReps.map((rep) => (
              <div
                key={rep.id}
                className="flex items-center justify-between p-4 bg-cyan-900/10 border border-cyan-500/20 rounded-lg hover:border-cyan-500/40 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${rep.isActive ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <div>
                    <h3 className="text-white font-medium">
                      {rep.firstName} {rep.lastName}
                    </h3>
                    <p className="text-cyan-300/60 text-sm font-mono">{rep.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-cyan-300">
                      Joined: {new Date(rep.createdAt).toLocaleDateString()}
                    </p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-mono ${
                      rep.isActive 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {rep.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleRepStatus(rep.id, rep.isActive)}
                    className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                      rep.isActive
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30'
                        : 'bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30'
                    }`}
                  >
                    {rep.isActive ? 'DEACTIVATE' : 'ACTIVATE'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-cyan-300/40 text-6xl mb-4 font-black">TEAM</div>
            <p className="text-cyan-300/60 font-mono">[ NO AGENTS FOUND ]</p>
            <p className="text-cyan-300/40 text-sm mt-2">
              {filter === 'all' 
                ? 'Create your first sales rep to get started'
                : `No ${filter} reps found`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}