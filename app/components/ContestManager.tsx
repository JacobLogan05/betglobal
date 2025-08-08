'use client'

import { useState, useEffect } from 'react'

interface Contest {
  id: number
  name: string
  description: string
  startDate: string
  endDate: string
  prizeDescription: string
  prizeValue: string
  isActive: boolean
  createdAt: string
}

interface ContestStats {
  totalParticipants: number
  totalSignups: number
  leaderboard: Array<{
    repName: string
    repEmail: string
    signupCount: number
    totalRevenue: number
  }>
}

export default function ContestManager() {
  const [contests, setContests] = useState<Contest[]>([])
  const [contestStats, setContestStats] = useState<{ [key: number]: ContestStats }>({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    prizeDescription: '',
    prizeValue: ''
  })

  useEffect(() => {
    fetchContests()
  }, [])

  const fetchContests = async () => {
    try {
      const response = await fetch('/api/admin/contests')
      const data = await response.json()
      
      if (data.contests) {
        setContests(data.contests)
        // Fetch stats for each contest
        data.contests.forEach((contest: Contest) => {
          fetchContestStats(contest.id)
        })
      }
    } catch (error) {
      console.error('Error fetching contests:', error)
    }
  }

  const fetchContestStats = async (contestId: number) => {
    try {
      const response = await fetch(`/api/admin/contests/${contestId}/stats`)
      const data = await response.json()
      
      if (data.stats) {
        setContestStats(prev => ({
          ...prev,
          [contestId]: data.stats
        }))
      }
    } catch (error) {
      console.error('Error fetching contest stats:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/create-contest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Contest created successfully!')
        setFormData({
          name: '',
          description: '',
          startDate: '',
          endDate: '',
          prizeDescription: '',
          prizeValue: ''
        })
        fetchContests()
      } else {
        setMessage(data.error || 'Error creating contest')
      }
    } catch (error) {
      setMessage('Error creating contest')
    } finally {
      setLoading(false)
    }
  }

  const toggleContestStatus = async (contestId: number, isActive: boolean) => {
    try {
      const response = await fetch('/api/admin/toggle-contest-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contestId, isActive: !isActive })
      })

      if (response.ok) {
        fetchContests()
      }
    } catch (error) {
      console.error('Error toggling contest status:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const isContestActive = (contest: Contest) => {
    const now = new Date()
    const start = new Date(contest.startDate)
    const end = new Date(contest.endDate)
    return contest.isActive && now >= start && now <= end
  }

  return (
    <div className="space-y-8">
      {/* Create Contest Form */}
      <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 shadow-2xl shadow-purple-500/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">🏆</span>
          </div>
          <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
            Create New Contest
          </h2>
        </div>
        
        <p className="text-purple-300/60 mb-8 font-mono text-sm">
          Set up a new sales contest with prizes and timeframes
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-purple-300 text-sm font-semibold mb-2 font-mono">
                Contest Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/40 focus:border-purple-400 focus:outline-none font-mono"
                placeholder="Q1 Sales Challenge"
                required
              />
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-semibold mb-2 font-mono">
                Prize Value ($)
              </label>
              <input
                type="number"
                value={formData.prizeValue}
                onChange={(e) => setFormData({ ...formData, prizeValue: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/40 focus:border-purple-400 focus:outline-none font-mono"
                placeholder="1000"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-purple-300 text-sm font-semibold mb-2 font-mono">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/40 focus:border-purple-400 focus:outline-none font-mono h-24 resize-none"
              placeholder="Contest rules and objectives..."
              required
            />
          </div>

          <div>
            <label className="block text-purple-300 text-sm font-semibold mb-2 font-mono">
              Prize Description
            </label>
            <input
              type="text"
              value={formData.prizeDescription}
              onChange={(e) => setFormData({ ...formData, prizeDescription: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/40 focus:border-purple-400 focus:outline-none font-mono"
              placeholder="Cash bonus + gift card"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-purple-300 text-sm font-semibold mb-2 font-mono">
                Start Date
              </label>
              <input
                type="datetime-local"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/40 focus:border-purple-400 focus:outline-none font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-semibold mb-2 font-mono">
                End Date
              </label>
              <input
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/40 focus:border-purple-400 focus:outline-none font-mono"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
          >
            {loading ? 'CREATING...' : 'CREATE CONTEST'}
          </button>

          {message && (
            <div className={`p-4 rounded-lg font-mono text-sm ${
              message.includes('Error') 
                ? 'bg-red-500/20 border border-red-500/30 text-red-300' 
                : 'bg-green-500/20 border border-green-500/30 text-green-300'
            }`}>
              {message}
            </div>
          )}
        </form>
      </div>

      {/* Active Contests */}
      <div className="space-y-6">
        {contests.map((contest) => {
          const stats = contestStats[contest.id]
          const isActive = isContestActive(contest)
          
          return (
            <div key={contest.id} className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-8 shadow-2xl shadow-cyan-500/10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">🏆</span>
                    </div>
                    <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                      {contest.name}
                    </h3>
                    {isActive && (
                      <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-300 rounded-full text-xs font-mono font-bold">
                        LIVE
                      </span>
                    )}
                    {!contest.isActive && (
                      <span className="px-3 py-1 bg-gray-500/20 border border-gray-500/30 text-gray-300 rounded-full text-xs font-mono font-bold">
                        INACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-cyan-300/60 font-mono text-sm">
                    {contest.description}
                  </p>
                </div>
                <button
                  onClick={() => toggleContestStatus(contest.id, contest.isActive)}
                  className={`px-4 py-2 rounded-lg font-mono text-sm font-bold transition-all duration-300 ${
                    contest.isActive
                      ? 'bg-red-600/20 border border-red-500/30 text-red-300 hover:bg-red-600/30'
                      : 'bg-green-600/20 border border-green-500/30 text-green-300 hover:bg-green-600/30'
                  }`}
                >
                  {contest.isActive ? 'DEACTIVATE' : 'ACTIVATE'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-black/30 p-4 rounded-lg border border-cyan-500/20">
                  <div className="text-cyan-400 text-xs font-mono mb-1">START DATE</div>
                  <div className="text-white font-mono">{formatDate(contest.startDate)}</div>
                </div>
                <div className="bg-black/30 p-4 rounded-lg border border-cyan-500/20">
                  <div className="text-cyan-400 text-xs font-mono mb-1">END DATE</div>
                  <div className="text-white font-mono">{formatDate(contest.endDate)}</div>
                </div>
                <div className="bg-black/30 p-4 rounded-lg border border-cyan-500/20">
                  <div className="text-cyan-400 text-xs font-mono mb-1">PRIZE VALUE</div>
                  <div className="text-white font-mono">${contest.prizeValue}</div>
                </div>
                <div className="bg-black/30 p-4 rounded-lg border border-cyan-500/20">
                  <div className="text-cyan-400 text-xs font-mono mb-1">PARTICIPANTS</div>
                  <div className="text-white font-mono">{stats?.totalParticipants || 0}</div>
                </div>
              </div>

              <div className="bg-black/30 p-6 rounded-lg border border-cyan-500/20">
                <h4 className="text-cyan-400 font-bold mb-4 font-mono">
                  PRIZE: {contest.prizeDescription}
                </h4>
                
                {stats?.leaderboard && stats.leaderboard.length > 0 && (
                  <div>
                    <h5 className="text-cyan-300 font-bold mb-4 font-mono">CURRENT LEADERBOARD</h5>
                    <div className="space-y-3">
                      {stats.leaderboard.slice(0, 3).map((rep, index) => (
                        <div key={rep.repEmail} className="flex justify-between items-center bg-black/40 p-4 rounded-lg border border-cyan-500/20">
                          <div className="flex items-center gap-4">
                            <span className="text-cyan-400 font-bold font-mono text-lg">
                              #{index + 1}
                            </span>
                            <span className="text-white font-mono">{rep.repName}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-mono font-bold">{rep.signupCount} signups</div>
                            <div className="text-cyan-400 font-mono text-sm">${rep.totalRevenue}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {contests.length === 0 && (
        <div className="bg-black/40 backdrop-blur-sm border border-gray-500/30 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🏆</span>
          </div>
          <p className="text-gray-400 font-mono">No contests created yet. Create your first contest above!</p>
        </div>
      )}
    </div>
  )
}