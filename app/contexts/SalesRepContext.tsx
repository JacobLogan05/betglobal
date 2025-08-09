'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface SalesRep {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  totalSignups: number
  bovadaSignups: number
  chalkboardSignups: number
  commissionsEarned: number
  commissionsPaid: number
  commissionsDue: number
  status: 'Active' | 'Inactive'
  joinDate: string
  lastActivity: string
  notes: string
}

interface SalesRepContextType {
  salesReps: SalesRep[]
  loading: boolean
  deleteSalesRep: (id: string) => Promise<void>
  updateSalesRep: (id: string, updatedRep: Partial<SalesRep>) => Promise<void>
  addSalesRep: (newRep: Omit<SalesRep, 'id'>) => Promise<void>
  getSalesRepById: (id: string) => SalesRep | undefined
  getKPIs: () => {
    totalReps: number
    activeReps: number
    totalSignups: number
    totalCommissionsEarned: number
    totalCommissionsPaid: number
    totalCommissionsDue: number
  }
}

const SalesRepContext = createContext<SalesRepContextType | undefined>(undefined)

// Initial mock data
const initialSalesReps: SalesRep[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@betglobal.com',
    phone: '+1 (555) 123-4567',
    role: 'Senior Sales Rep',
    totalSignups: 45,
    bovadaSignups: 28,
    chalkboardSignups: 17,
    commissionsEarned: 1800,
    commissionsPaid: 1200,
    commissionsDue: 600,
    status: 'Active',
    joinDate: '2024-01-15',
    lastActivity: '2024-03-15',
    notes: 'Top performer this quarter'
  },
  {
    id: '2',
    firstName: 'Mike',
    lastName: 'Chen',
    email: 'mike.chen@betglobal.com',
    phone: '+1 (555) 234-5678',
    role: 'Sales Rep',
    totalSignups: 38,
    bovadaSignups: 23,
    chalkboardSignups: 15,
    commissionsEarned: 1520,
    commissionsPaid: 1000,
    commissionsDue: 520,
    status: 'Active',
    joinDate: '2024-02-01',
    lastActivity: '2024-03-14',
    notes: 'Consistent performance'
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@betglobal.com',
    phone: '+1 (555) 345-6789',
    role: 'Sales Rep',
    totalSignups: 52,
    bovadaSignups: 31,
    chalkboardSignups: 21,
    commissionsEarned: 2080,
    commissionsPaid: 1500,
    commissionsDue: 580,
    status: 'Active',
    joinDate: '2023-12-10',
    lastActivity: '2024-03-15',
    notes: 'Excellent closer'
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Thompson',
    email: 'david.thompson@betglobal.com',
    phone: '+1 (555) 456-7890',
    role: 'Junior Sales Rep',
    totalSignups: 29,
    bovadaSignups: 18,
    chalkboardSignups: 11,
    commissionsEarned: 1160,
    commissionsPaid: 800,
    commissionsDue: 360,
    status: 'Active',
    joinDate: '2024-02-20',
    lastActivity: '2024-03-13',
    notes: 'Improving steadily'
  },
  {
    id: '5',
    firstName: 'Jessica',
    lastName: 'Williams',
    email: 'jessica.williams@betglobal.com',
    phone: '+1 (555) 567-8901',
    role: 'Sales Rep',
    totalSignups: 41,
    bovadaSignups: 25,
    chalkboardSignups: 16,
    commissionsEarned: 1640,
    commissionsPaid: 1100,
    commissionsDue: 540,
    status: 'Active',
    joinDate: '2024-01-08',
    lastActivity: '2024-03-15',
    notes: 'Strong relationship builder'
  },
  {
    id: '6',
    firstName: 'Alex',
    lastName: 'Martinez',
    email: 'alex.martinez@betglobal.com',
    phone: '+1 (555) 678-9012',
    role: 'Sales Rep',
    totalSignups: 33,
    bovadaSignups: 21,
    chalkboardSignups: 12,
    commissionsEarned: 1320,
    commissionsPaid: 900,
    commissionsDue: 420,
    status: 'Inactive',
    joinDate: '2023-11-15',
    lastActivity: '2024-03-01',
    notes: 'On temporary leave'
  }
]

export function SalesRepProvider({ children }: { children: React.ReactNode }) {
  const [salesReps, setSalesReps] = useState<SalesRep[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch data from API on component mount
  useEffect(() => {
    fetchSalesReps()
  }, [])

  const fetchSalesReps = async () => {
    setLoading(true)
    try {
      console.log('Fetching sales reps from API...')
      const response = await fetch('/api/admin/sales-reps')
      console.log('API response status:', response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Fetched sales reps data:', data)
      setSalesReps(data)
    } catch (error) {
      console.error('Error fetching sales reps:', error)
      // Fallback to mock data if API fails
       setSalesReps(initialSalesReps)
    } finally {
      setLoading(false)
    }
  }

  const deleteSalesRep = async (id: string) => {
    try {
      console.log('Deleting sales rep with ID:', id)
      const response = await fetch(`/api/admin/sales-reps/${id}`, {
        method: 'DELETE',
      })
      
      console.log('Delete response status:', response.status)
      
      if (response.ok) {
        console.log('Delete successful, updating local state')
        setSalesReps(prev => {
          const filtered = prev.filter(rep => rep.id !== id)
          console.log('Updated sales reps:', filtered)
          return filtered
        })
        // Also refresh from API to ensure consistency
        await fetchSalesReps()
      } else {
        console.error('Failed to delete sales rep, status:', response.status)
        const errorData = await response.json()
        console.error('Error details:', errorData)
      }
    } catch (error) {
      console.error('Error deleting sales rep:', error)
    }
  }

  const updateSalesRep = async (id: string, updatedRep: Partial<SalesRep>) => {
    try {
      const response = await fetch(`/api/admin/sales-reps/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRep),
      })
      
      if (response.ok) {
        setSalesReps(prev => prev.map(rep => 
          rep.id === id ? { ...rep, ...updatedRep } : rep
        ))
      } else {
        console.error('Failed to update sales rep')
      }
    } catch (error) {
      console.error('Error updating sales rep:', error)
    }
  }

  const addSalesRep = async (newRep: Omit<SalesRep, 'id'>) => {
    try {
      console.log('Adding new sales rep:', newRep)
      const response = await fetch('/api/admin/sales-reps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRep),
    })

      console.log('Add sales rep response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Add sales rep error:', errorData)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const createdRep = await response.json()
      console.log('Created sales rep:', createdRep)
      
      // Refresh the sales reps list to get the latest data
      await fetchSalesReps()
    } catch (error) {
      console.error('Error adding sales rep:', error)
      throw error
    }
  }

  const getSalesRepById = (id: string) => {
    return salesReps.find(rep => rep.id === id)
  }

  const getKPIs = () => {
    const totalReps = salesReps.length
    const activeReps = salesReps.filter(rep => rep.status === 'Active').length
    const totalSignups = salesReps.reduce((sum, rep) => sum + rep.totalSignups, 0)
    const totalCommissionsEarned = salesReps.reduce((sum, rep) => sum + rep.commissionsEarned, 0)
    const totalCommissionsPaid = salesReps.reduce((sum, rep) => sum + rep.commissionsPaid, 0)
    const totalCommissionsDue = salesReps.reduce((sum, rep) => sum + rep.commissionsDue, 0)

    return {
      totalReps,
      activeReps,
      totalSignups,
      totalCommissionsEarned,
      totalCommissionsPaid,
      totalCommissionsDue
    }
  }

  const value: SalesRepContextType = {
    salesReps,
    loading,
    deleteSalesRep,
    updateSalesRep,
    addSalesRep,
    getSalesRepById,
    getKPIs
  }

  return (
    <SalesRepContext.Provider value={value}>
      {children}
    </SalesRepContext.Provider>
  )
}

export function useSalesRep() {
  const context = useContext(SalesRepContext)
  if (context === undefined) {
    throw new Error('useSalesRep must be used within a SalesRepProvider')
  }
  return context
}