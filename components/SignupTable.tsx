'use client'

import React, { useState } from 'react'
import { 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import { useSignups, type Signup } from '@/contexts/SignupContext'

interface SignupTableProps {
  onEditSignup?: (signup: Signup) => void
  onViewSignup?: (signup: Signup) => void
}

export default function SignupTable({ onEditSignup, onViewSignup }: SignupTableProps) {
  const { signups, loading, deleteSignup, updateSignup } = useSignups()
  const [sortField, setSortField] = useState<keyof Signup>('signupDate')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleSort = (field: keyof Signup) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleDelete = async (signupId: string) => {
    if (!confirm('Are you sure you want to delete this signup? This action cannot be undone.')) {
      return
    }

    setDeletingId(signupId)
    try {
      await deleteSignup(signupId)
    } finally {
      setDeletingId(null)
    }
  }

  const handleStatusChange = async (signupId: string, newStatus: 'pending' | 'qualified' | 'rejected') => {
    await updateSignup(signupId, { status: newStatus })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount: string | undefined) => {
    if (!amount) return '-'
    return `$${parseFloat(amount).toLocaleString()}`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'qualified':
        return <CheckCircleIcon className="h-4 w-4 text-green-400" />
      case 'pending':
        return <ClockIcon className="h-4 w-4 text-yellow-400" />
      case 'rejected':
        return <XCircleIcon className="h-4 w-4 text-red-400" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border"
    
    switch (status) {
      case 'qualified':
        return `${baseClasses} bg-green-500/20 text-green-300 border-green-500/30`
      case 'pending':
        return `${baseClasses} bg-yellow-500/20 text-yellow-300 border-yellow-500/30`
      case 'rejected':
        return `${baseClasses} bg-red-500/20 text-red-300 border-red-500/30`
      default:
        return `${baseClasses} bg-gray-500/20 text-gray-300 border-gray-500/30`
    }
  }

  const getPlatformBadge = (platform: string) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
    
    switch (platform) {
      case 'bovada':
        return `${baseClasses} bg-orange-500/20 text-orange-300 border border-orange-500/30`
      case 'chalkboard':
        return `${baseClasses} bg-purple-500/20 text-purple-300 border border-purple-500/30`
      default:
        return `${baseClasses} bg-gray-500/20 text-gray-300 border border-gray-500/30`
    }
  }

  const SortButton = ({ field, children }: { field: keyof Signup; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 text-left hover:text-white transition-colors duration-200"
    >
      {children}
      {sortField === field && (
        sortDirection === 'asc' 
          ? <ChevronUpIcon className="h-4 w-4" />
          : <ChevronDownIcon className="h-4 w-4" />
      )}
    </button>
  )

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-900/90 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-300">Loading signups...</span>
        </div>
      </div>
    )
  }

  if (signups.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-900/90 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <EyeIcon className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No signups found</h3>
          <p className="text-gray-400">Try adjusting your filters or search criteria.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                <SortButton field="customerName">Customer</SortButton>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                <SortButton field="platform">Platform</SortButton>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                <SortButton field="repName">Sales Rep</SortButton>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                <SortButton field="signupDate">Signup Date</SortButton>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                <SortButton field="depositAmount">Deposit</SortButton>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                <SortButton field="status">Status</SortButton>
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {signups.map((signup) => (
              <tr key={signup.id} className="hover:bg-white/5 transition-colors duration-200">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-white font-medium">
                      {signup.customerName || 'N/A'}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {signup.customerEmail || 'No email'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={getPlatformBadge(signup.platform)}>
                    {signup.platform === 'bovada' ? 'Bovada' : 'Chalkboard'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {signup.repName}
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {formatDate(signup.signupDate)}
                </td>
                <td className="px-6 py-4 text-white font-medium">
                  {formatCurrency(signup.depositAmount)}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={signup.status}
                    onChange={(e) => handleStatusChange(signup.id, e.target.value as any)}
                    className="bg-transparent border-none text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="pending" className="bg-gray-800">Pending</option>
                    <option value="qualified" className="bg-gray-800">Qualified</option>
                    <option value="rejected" className="bg-gray-800">Rejected</option>
                  </select>
                  <div className="mt-1">
                    <span className={getStatusBadge(signup.status)}>
                      {getStatusIcon(signup.status)}
                      {signup.status.charAt(0).toUpperCase() + signup.status.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {onViewSignup && (
                      <button
                        onClick={() => onViewSignup(signup)}
                        className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                        title="View Details"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                    )}
                    {onEditSignup && (
                      <button
                        onClick={() => onEditSignup(signup)}
                        className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-all duration-200"
                        title="Edit Signup"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(signup.id)}
                      disabled={deletingId === signup.id}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 disabled:opacity-50"
                      title="Delete Signup"
                    >
                      {deletingId === signup.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></div>
                      ) : (
                        <TrashIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}