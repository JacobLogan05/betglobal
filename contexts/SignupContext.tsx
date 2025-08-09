'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Signup {
  id: string
  userId: string
  platform: 'bovada' | 'chalkboard'
  status: 'pending' | 'qualified' | 'rejected'
  signupDate: string
  qualificationDate?: string
  customerEmail?: string
  customerName?: string
  depositAmount?: string
  commissionAmount?: string
  notes?: string
  createdAt: string
  updatedAt: string
  repName: string
  repEmail: string
  commission?: {
    id: string
    amount: string
    isFirstSignup: boolean
  }
}

export interface SignupKPIs {
  totalSignups: number
  qualifiedSignups: number
  pendingSignups: number
  rejectedSignups: number
  bovadaSignups: number
  chalkboardSignups: number
  totalDeposits: string
}

export interface SignupFilters {
  repId?: string
  platform?: 'bovada' | 'chalkboard'
  status?: 'pending' | 'qualified' | 'rejected'
  search?: string
  page?: number
  limit?: number
}

interface SignupContextType {
  signups: Signup[]
  kpis: SignupKPIs | null
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  filters: SignupFilters
  setFilters: (filters: SignupFilters) => void
  fetchSignups: (filters?: SignupFilters) => Promise<void>
  addSignup: (signupData: Omit<Signup, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>
  updateSignup: (signupId: string, updates: Partial<Signup>) => Promise<boolean>
  deleteSignup: (signupId: string) => Promise<boolean>
  refreshSignups: () => Promise<void>
}

const SignupContext = createContext<SignupContextType | undefined>(undefined)

export function SignupProvider({ children }: { children: ReactNode }) {
  const [signups, setSignups] = useState<Signup[]>([])
  const [kpis, setKpis] = useState<SignupKPIs | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
  })
  const [filters, setFilters] = useState<SignupFilters>({
    page: 1,
    limit: 50,
  })

  const fetchSignups = async (newFilters?: SignupFilters) => {
    try {
      setLoading(true)
      setError(null)

      const currentFilters = newFilters || filters
      const params = new URLSearchParams()

      if (currentFilters.repId) params.append('repId', currentFilters.repId)
      if (currentFilters.platform) params.append('platform', currentFilters.platform)
      if (currentFilters.status) params.append('status', currentFilters.status)
      if (currentFilters.search) params.append('search', currentFilters.search)
      if (currentFilters.page) params.append('page', currentFilters.page.toString())
      if (currentFilters.limit) params.append('limit', currentFilters.limit.toString())

      const response = await fetch(`/api/admin/signups?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch signups')
      }

      const data = await response.json()
      
      setSignups(data.signups)
      setKpis(data.kpis)
      setPagination(data.pagination)

      if (newFilters) {
        setFilters(newFilters)
      }

    } catch (err) {
      console.error('Error fetching signups:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch signups')
    } finally {
      setLoading(false)
    }
  }

  const addSignup = async (signupData: Omit<Signup, 'id' | 'createdAt' | 'updatedAt'>): Promise<boolean> => {
    try {
      console.log('Adding new signup:', signupData)
      
      const response = await fetch('/api/admin/signups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add signup')
      }

      const data = await response.json()
      console.log('Signup add response:', data)

      // Refresh data to ensure consistency
      await fetchSignups()

      return true
    } catch (err) {
      console.error('Error adding signup:', err)
      setError(err instanceof Error ? err.message : 'Failed to add signup')
      return false
    }
  }

  const updateSignup = async (signupId: string, updates: Partial<Signup>): Promise<boolean> => {
    try {
      console.log('Updating signup:', signupId, updates)
      
      const response = await fetch(`/api/admin/signups/${signupId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update signup')
      }

      const data = await response.json()
      console.log('Signup update response:', data)

      // Update local state
      setSignups(prevSignups =>
        prevSignups.map(signup =>
          signup.id === signupId ? { ...signup, ...updates } : signup
        )
      )

      // Refresh data to ensure consistency
      await fetchSignups()

      return true
    } catch (err) {
      console.error('Error updating signup:', err)
      setError(err instanceof Error ? err.message : 'Failed to update signup')
      return false
    }
  }

  const deleteSignup = async (signupId: string): Promise<boolean> => {
    try {
      console.log('Deleting signup:', signupId)
      
      const response = await fetch(`/api/admin/signups/${signupId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete signup')
      }

      const data = await response.json()
      console.log('Signup delete response:', data)

      // Update local state by filtering out the deleted signup
      setSignups(prevSignups => prevSignups.filter(signup => signup.id !== signupId))

      // Refresh data to ensure consistency
      await fetchSignups()

      return true
    } catch (err) {
      console.error('Error deleting signup:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete signup')
      return false
    }
  }

  const refreshSignups = async () => {
    await fetchSignups(filters)
  }

  // Initial fetch
  useEffect(() => {
    fetchSignups()
  }, [])

  const value: SignupContextType = {
    signups,
    kpis,
    loading,
    error,
    pagination,
    filters,
    setFilters,
    fetchSignups,
    addSignup,
    updateSignup,
    deleteSignup,
    refreshSignups,
  }

  return (
    <SignupContext.Provider value={value}>
      {children}
    </SignupContext.Provider>
  )
}

export function useSignups() {
  const context = useContext(SignupContext)
  if (context === undefined) {
    throw new Error('useSignups must be used within a SignupProvider')
  }
  return context
}