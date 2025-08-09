'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateRepForm() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/create-rep', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage('Sales rep created successfully!')
        setFormData({ email: '', firstName: '', lastName: '' })
        router.refresh()
      } else {
          setMessage(`Error: ${result.error}`)
        }
      } catch (error) {
        setMessage('Failed to create sales rep')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-cyan-300 text-sm font-mono mb-2">
          EMAIL ADDRESS
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg text-white placeholder-cyan-300/40 focus:border-cyan-400 focus:outline-none font-mono"
          placeholder="rep@betglobal.com"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-cyan-300 text-sm font-mono mb-2">
            FIRST NAME
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg text-white placeholder-cyan-300/40 focus:border-cyan-400 focus:outline-none font-mono"
            placeholder="John"
            required
          />
        </div>

        <div>
          <label className="block text-cyan-300 text-sm font-mono mb-2">
            LAST NAME
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg text-white placeholder-cyan-300/40 focus:border-cyan-400 focus:outline-none font-mono"
            placeholder="Doe"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
      >
        {isLoading ? 'CREATING...' : 'CREATE REP'}
      </button>

      {message && (
        <div className="mt-4 p-3 bg-black/50 border border-cyan-500/30 rounded-lg">
          <p className="text-sm font-mono text-center">{message}</p>
        </div>
      )}
    </form>
  )
}