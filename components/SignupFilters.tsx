'use client'

import React, { useState, useEffect } from 'react'
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSignups, type SignupFilters } from '@/contexts/SignupContext'

interface SalesRep {
  id: string
  firstName: string
  lastName: string
  email: string
}

export default function SignupFilters() {
  const { filters, setFilters, fetchSignups } = useSignups()
  const [salesReps, setSalesReps] = useState<SalesRep[]>([])
  const [localFilters, setLocalFilters] = useState<SignupFilters>(filters)
  const [showFilters, setShowFilters] = useState(false)

  // Fetch sales reps for the filter dropdown
  useEffect(() => {
    const fetchSalesReps = async () => {
      try {
        const response = await fetch('/api/admin/sales-reps')
        if (response.ok) {
          const data = await response.json()
          setSalesReps(data.salesReps || [])
        }
      } catch (error) {
        console.error('Error fetching sales reps:', error)
      }
    }

    fetchSalesReps()
  }, [])

  const handleFilterChange = (key: keyof SignupFilters, value: string | undefined) => {
    const newFilters = {
      ...localFilters,
      [key]: value || undefined,
      page: 1, // Reset to first page when filters change
    }
    setLocalFilters(newFilters)
  }

  const applyFilters = () => {
    setFilters(localFilters)
    fetchSignups(localFilters)
  }

  const clearFilters = () => {
    const clearedFilters: SignupFilters = {
      page: 1,
      limit: 50,
    }
    setLocalFilters(clearedFilters)
    setFilters(clearedFilters)
    fetchSignups(clearedFilters)
  }

  const hasActiveFilters = localFilters.search || localFilters.repId || localFilters.platform || localFilters.status

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by customer name or email..."
            value={localFilters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
          />
        </div>

        {/* Filter Toggle Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
              showFilters || hasActiveFilters
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
            }`}
          >
            <FunnelIcon className="h-5 w-5" />
            Filters
            {hasActiveFilters && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-3 bg-red-500/20 text-red-300 border border-red-500/30 rounded-xl font-medium hover:bg-red-500/30 transition-all duration-200"
            >
              <XMarkIcon className="h-5 w-5" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sales Rep Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sales Representative
              </label>
              <select
                value={localFilters.repId || ''}
                onChange={(e) => handleFilterChange('repId', e.target.value)}
                className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
              >
                <option value="">All Sales Reps</option>
                {salesReps.map((rep) => (
                  <option key={rep.id} value={rep.id} className="bg-gray-800">
                    {rep.firstName} {rep.lastName}
                  </option>
                ))}
              </select>
            </div>

            {/* Platform Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Platform
              </label>
              <select
                value={localFilters.platform || ''}
                onChange={(e) => handleFilterChange('platform', e.target.value)}
                className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
              >
                <option value="">All Platforms</option>
                <option value="bovada" className="bg-gray-800">Bovada</option>
                <option value="chalkboard" className="bg-gray-800">Chalkboard</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                value={localFilters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
              >
                <option value="">All Statuses</option>
                <option value="pending" className="bg-gray-800">Pending</option>
                <option value="qualified" className="bg-gray-800">Qualified</option>
                <option value="rejected" className="bg-gray-800">Rejected</option>
              </select>
            </div>
          </div>

          {/* Apply Filters Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={applyFilters}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}