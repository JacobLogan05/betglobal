'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Rep {
  id: string
  firstName: string
  lastName: string
  email: string
  totalSignups: number
  totalCommissions: number
}

interface Bonus {
  id: string
  userId: string
  type: 'milestone' | 'contest' | 'first_signup'
  amount: string
  description: string
  milestone?: number
  createdAt: string
  user: {
    firstName: string
    lastName: string
  }
}

interface BonusManagerProps {
  reps: Rep[]
}

export default function BonusManager({ reps }: BonusManagerProps) {
  const [selectedRep, setSelectedRep] = useState('')
  const [bonusType, setBonusType] = useState<'milestone' | 'contest'>('milestone')
  const [milestoneAmount, setMilestoneAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [recentBonuses, setRecentBonuses] = useState<Bonus[]>([])
  const router = useRouter()

  // Milestone bonus structure based on requirements
  const milestoneStructure = [
    { signups: 10, amount: 500, description: "10 Signups Milestone" },
    { signups: 25, amount: 1000, description: "25 Signups Milestone" },
    { signups: 50, amount: 2500, description: "50 Signups Milestone" },
    { signups: 100, amount: 5000, description: "100 Signups Milestone" },
    { signups: 250, amount: 10000, description: "250 Signups Elite Milestone" },
    { signups: 500, amount: 25000, description: "500 Signups Master Milestone" }
  ]

  useEffect(() => {
    fetchRecentBonuses()
  }, [])

  const fetchRecentBonuses = async () => {
    try {
      const response = await fetch('/api/admin/bonuses')
      if (response.ok) {
        const data = await response.json()
        setRecentBonuses(data.bonuses || [])
      }
    } catch (error) {
      console.error('Failed to fetch bonuses:', error)
    }
  }

  const handleMilestoneBonus = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRep || !milestoneAmount) return

    setIsLoading(true)
    setMessage('')

    const milestone = milestoneStructure.find(m => m.signups.toString() === milestoneAmount)
    if (!milestone) return

    try {
      const response = await fetch('/api/admin/add-bonus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repId: selectedRep,
          type: 'milestone',
          amount: milestone.amount,
          description: milestone.description,
          milestone: milestone.signups
        })
      })

      const result = await response.json()

      if (response.ok) {
        setMessage(`✅ Milestone bonus awarded: $${milestone.amount}!`)
        setSelectedRep('')
        setMilestoneAmount('')
        fetchRecentBonuses()
        router.refresh()
      } else {
        setMessage(`❌ Error: ${result.error}`)
      }
    } catch (error) {
      setMessage('❌ Failed to award bonus')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCustomBonus = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRep || !customAmount || !description) return

    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/add-bonus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repId: selectedRep,
          type: bonusType,
          amount: parseFloat(customAmount),
          description
        })
      })

      const result = await response.json()

      if (response.ok) {
        setMessage(`✅ ${bonusType} bonus awarded: $${customAmount}!`)
        setSelectedRep('')
        setCustomAmount('')
        setDescription('')
        fetchRecentBonuses()
        router.refresh()
      } else {
        setMessage(`❌ Error: ${result.error}`)
      }
    } catch (error) {
      setMessage('❌ Failed to award bonus')
    } finally {
      setIsLoading(false)
    }
  }

  const getEligibleMilestones = (rep: Rep) => {
    return milestoneStructure.filter(milestone => 
      rep.totalSignups >= milestone.signups
    )
  }

  return (
    <div className="space-y-8">
      {/* Milestone Bonus System */}
      <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-lg backdrop-blur-sm">
        <div className="p-6 border-b border-yellow-500/20">
          <h3 className="text-xl font-bold text-yellow-300 mb-2 font-mono">MILESTONE BONUSES</h3>
          <p className="text-yellow-300/60 text-sm font-mono">[ AUTOMATED ACHIEVEMENT REWARDS ]</p>
        </div>
        <div className="p-6">
          <form onSubmit={handleMilestoneBonus} className="space-y-4">
            <div>
              <label className="block text-yellow-300 text-sm font-mono mb-2">
                SELECT REP
              </label>
              <select
                value={selectedRep}
                onChange={(e) => setSelectedRep(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white focus:border-yellow-400 focus:outline-none font-mono"
                required
              >
                <option value="">Choose a rep...</option>
                {reps.map((rep) => (
                  <option key={rep.id} value={rep.id}>
                    {rep.firstName} {rep.lastName} ({rep.totalSignups} signups)
                  </option>
                ))}
              </select>
            </div>

            {selectedRep && (
              <div>
                <label className="block text-yellow-300 text-sm font-mono mb-2">
                  ELIGIBLE MILESTONES
                </label>
                <select
                  value={milestoneAmount}
                  onChange={(e) => setMilestoneAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white focus:border-yellow-400 focus:outline-none font-mono"
                  required
                >
                  <option value="">Select milestone...</option>
                  {getEligibleMilestones(reps.find(r => r.id === selectedRep) || { totalSignups: 0 } as Rep).map((milestone) => (
                    <option key={milestone.signups} value={milestone.signups}>
                      {milestone.signups} Signups - ${milestone.amount.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !selectedRep || !milestoneAmount}
              className="w-full py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
            >
              {isLoading ? 'AWARDING...' : 'AWARD MILESTONE BONUS'}
            </button>
          </form>
        </div>
      </div>

      {/* Custom Bonus System */}
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg backdrop-blur-sm">
        <div className="p-6 border-b border-purple-500/20">
          <h3 className="text-xl font-bold text-purple-300 mb-2 font-mono">CUSTOM BONUSES</h3>
          <p className="text-purple-300/60 text-sm font-mono">[ MANUAL REWARD SYSTEM ]</p>
        </div>
        <div className="p-6">
          <form onSubmit={handleCustomBonus} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-purple-300 text-sm font-mono mb-2">
                  SELECT REP
                </label>
                <select
                  value={selectedRep}
                  onChange={(e) => setSelectedRep(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-400 focus:outline-none font-mono"
                  required
                >
                  <option value="">Choose a rep...</option>
                  {reps.map((rep) => (
                    <option key={rep.id} value={rep.id}>
                      {rep.firstName} {rep.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-purple-300 text-sm font-mono mb-2">
                  BONUS TYPE
                </label>
                <select
                  value={bonusType}
                  onChange={(e) => setBonusType(e.target.value as 'milestone' | 'contest')}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-400 focus:outline-none font-mono"
                >
                  <option value="milestone">MILESTONE</option>
                  <option value="contest">CONTEST</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-purple-300 text-sm font-mono mb-2">
                BONUS AMOUNT ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/40 focus:border-purple-400 focus:outline-none font-mono"
                placeholder="500.00"
                required
              />
            </div>

            <div>
              <label className="block text-purple-300 text-sm font-mono mb-2">
                DESCRIPTION
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/40 focus:border-purple-400 focus:outline-none font-mono"
                placeholder="Special performance bonus"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !selectedRep || !customAmount || !description}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
            >
              {isLoading ? 'AWARDING...' : 'AWARD CUSTOM BONUS'}
            </button>
          </form>
        </div>
      </div>

      {/* Recent Bonuses */}
      <div className="bg-gradient-to-br from-gray-900/40 to-black/40 border border-cyan-500/20 rounded-lg backdrop-blur-sm">
        <div className="p-6 border-b border-cyan-500/20">
          <h3 className="text-xl font-bold text-cyan-300 mb-2 font-mono">RECENT BONUSES</h3>
          <p className="text-cyan-300/60 text-sm font-mono">[ BONUS TRANSACTION LOG ]</p>
        </div>
        <div className="p-6">
          {recentBonuses.length > 0 ? (
            <div className="space-y-3">
              {recentBonuses.slice(0, 10).map((bonus) => (
                <div key={bonus.id} className="flex items-center justify-between p-3 bg-cyan-900/10 border border-cyan-500/20 rounded-lg">
                  <div>
                    <p className="text-white font-medium">
                      {bonus.user.firstName} {bonus.user.lastName}
                    </p>
                    <p className="text-cyan-300/60 text-sm font-mono">{bonus.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-cyan-300 font-bold">${Number(bonus.amount).toLocaleString()}</p>
                    <p className="text-cyan-300/60 text-xs font-mono">
                      {new Date(bonus.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-cyan-300/40 text-4xl mb-4">🎁</div>
              <p className="text-cyan-300/60 font-mono">[ NO BONUSES AWARDED YET ]</p>
            </div>
          )}
        </div>
      </div>

      {message && (
        <div className="p-4 bg-black/50 border border-cyan-500/30 rounded-lg">
          <p className="text-sm font-mono text-center">{message}</p>
        </div>
      )}
    </div>
  )
}