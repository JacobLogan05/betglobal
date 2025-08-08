'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Rep {
  id: string
  firstName: string
  lastName: string
  email: string
}

interface AddSignupFormProps {
  reps: Rep[]
}

export default function AddSignupForm({ reps }: AddSignupFormProps) {
  const [formData, setFormData] = useState({
    repId: '',
    platform: 'bovada' as 'bovada' | 'chalkboard',
    customerName: '',
    customerEmail: '',
    depositAmount: '',
    notes: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/add-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          depositAmount: parseFloat(formData.depositAmount) || 0
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage('✅ Signup added successfully!')
        setFormData({
          repId: '',
          platform: 'bovada',
          customerName: '',
          customerEmail: '',
          depositAmount: '',
          notes: ''
        })
        router.refresh()
      } else {
        setMessage(`❌ Error: ${result.error}`)
      }
    } catch (error) {
      setMessage('❌ Failed to add signup')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-purple-300 text-sm font-mono mb-2">
          SALES REP
        </label>
        <select
          value={formData.repId}
          onChange={(e) => setFormData({ ...formData, repId: e.target.value })}
          className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-400 focus:outline-none font-mono"
          required
        >
          <option value="">Select a rep...</option>
          {reps.map((rep) => (
            <option key={rep.id} value={rep.id}>
              {rep.firstName} {rep.lastName} ({rep.email})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-purple-300 text-sm font-mono mb-2">
          PLATFORM
        </label>
        <select
          value={formData.platform}
          onChange={(e) => setFormData({ ...formData, platform: e.target.value as 'bovada' | 'chalkboard' })}
          className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-400 focus:outline-none font-mono"
          required
        >
          <option value="bovada">BOVADA</option>
          <option value="chalkboard">CHALKBOARD</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-purple-300 text-sm font-mono mb-2">
            CUSTOMER NAME
          </label>
          <input
            type="text"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/40 focus:border-purple-400 focus:outline-none font-mono"
            placeholder="John Smith"
          />
        </div>

        <div>
          <label className="block text-purple-300 text-sm font-mono mb-2">
            CUSTOMER EMAIL
          </label>
          <input
            type="email"
            value={formData.customerEmail}
            onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/40 focus:border-purple-400 focus:outline-none font-mono"
            placeholder="customer@email.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-purple-300 text-sm font-mono mb-2">
          DEPOSIT AMOUNT ($)
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={formData.depositAmount}
          onChange={(e) => setFormData({ ...formData, depositAmount: e.target.value })}
          className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/40 focus:border-purple-400 focus:outline-none font-mono"
          placeholder="20.00"
        />
      </div>

      <div>
        <label className="block text-purple-300 text-sm font-mono mb-2">
          NOTES
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/40 focus:border-purple-400 focus:outline-none font-mono resize-none"
          rows={3}
          placeholder="Additional notes about this signup..."
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
      >
        {isLoading ? 'ADDING...' : 'ADD SIGNUP'}
      </button>

      {message && (
        <div className="mt-4 p-3 bg-black/50 border border-purple-500/30 rounded-lg">
          <p className="text-sm font-mono text-center">{message}</p>
        </div>
      )}
    </form>
  )
}