'use client'

import { useState } from 'react'
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

interface SalesRep {
  id: string
  firstName: string
  lastName: string
  role: string
  totalSignups: number
  bovadaSignups: number
  chalkboardSignups: number
  commissionsEarned: number
  commissionsPaid: number
  commissionsDue: number
  status: 'Active' | 'Inactive' | 'On Leave'
  notes?: string
}

interface SalesRepListProps {
  salesReps: SalesRep[]
}

export default function SalesRepList({ salesReps }: SalesRepListProps) {
  const [sortField, setSortField] = useState<keyof SalesRep>('totalSignups')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const handleSort = (field: keyof SalesRep) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const sortedReps = [...salesReps].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    }
    
    return 0
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-400 bg-green-500/20 border-green-500/30'
      case 'Inactive':
        return 'text-red-400 bg-red-500/20 border-red-500/30'
      case 'On Leave':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30'
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-900/40 to-black/40 border border-gray-500/20 rounded-lg backdrop-blur-sm">
      <div className="p-6 border-b border-gray-500/20">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Sales Representatives</h2>
            <p className="text-gray-400">Manage and view all sales rep performance</p>
          </div>
          <div className="text-sm text-gray-400">
            Total: {salesReps.length} reps
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-500/20">
              <th 
                className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('firstName')}
              >
                Name
                {sortField === 'firstName' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('role')}
              >
                Role
                {sortField === 'role' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('totalSignups')}
              >
                Total Signups
                {sortField === 'totalSignups' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="text-left p-4 text-gray-300 font-medium">Platform Breakdown</th>
              <th 
                className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('commissionsEarned')}
              >
                Earned
                {sortField === 'commissionsEarned' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('commissionsPaid')}
              >
                Paid
                {sortField === 'commissionsPaid' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('commissionsDue')}
              >
                Due
                {sortField === 'commissionsDue' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('status')}
              >
                Status
                {sortField === 'status' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedReps.map((rep, index) => (
              <tr 
                key={rep.id} 
                className={`border-b border-gray-500/10 hover:bg-gray-800/30 transition-colors ${
                  index % 2 === 0 ? 'bg-gray-900/20' : 'bg-transparent'
                }`}
              >
                <td className="p-4">
                  <div className="text-white font-medium">
                    {rep.firstName} {rep.lastName}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-gray-300">{rep.role}</div>
                </td>
                <td className="p-4">
                  <div className="text-white font-bold text-lg">{rep.totalSignups}</div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-300">
                      <span className="text-orange-400">Bovada:</span> {rep.bovadaSignups}
                    </div>
                    <div className="text-sm text-gray-300">
                      <span className="text-purple-400">Chalkboard:</span> {rep.chalkboardSignups}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-green-400 font-medium">
                    ${rep.commissionsEarned.toLocaleString()}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-blue-400 font-medium">
                    ${rep.commissionsPaid.toLocaleString()}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-yellow-400 font-medium">
                    ${rep.commissionsDue.toLocaleString()}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(rep.status)}`}>
                    {rep.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button
                      className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-colors"
                      title="Edit Rep"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete Rep"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {salesReps.length === 0 && (
        <div className="p-12 text-center">
          <div className="text-gray-400 text-lg mb-2">No sales representatives found</div>
          <div className="text-gray-500 text-sm">Add your first sales rep to get started</div>
        </div>
      )}
    </div>
  )
}