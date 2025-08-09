'use client'

import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useSignups } from '@/contexts/SignupContext'

export default function SignupPagination() {
  const { pagination, filters, setFilters, fetchSignups } = useSignups()

  const handlePageChange = (newPage: number) => {
    const newFilters = { ...filters, page: newPage }
    setFilters(newFilters)
    fetchSignups(newFilters)
  }

  const handleLimitChange = (newLimit: number) => {
    const newFilters = { ...filters, limit: newLimit, page: 1 }
    setFilters(newFilters)
    fetchSignups(newFilters)
  }

  const getPageNumbers = () => {
    const { page, totalPages } = pagination
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (page >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (pagination.totalPages <= 1) {
    return null
  }

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Results Info */}
        <div className="text-sm text-gray-400">
          Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
          {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
          {pagination.total} results
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {getPageNumbers().map((pageNum, index) => (
              <React.Fragment key={index}>
                {pageNum === '...' ? (
                  <span className="px-3 py-2 text-gray-400">...</span>
                ) : (
                  <button
                    onClick={() => handlePageChange(pageNum as number)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      pagination.page === pageNum
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {pageNum}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Items per page */}
        <div className="flex items-center gap-2 text-sm">
          <label className="text-gray-400">Show:</label>
          <select
            value={pagination.limit}
            onChange={(e) => handleLimitChange(parseInt(e.target.value))}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
          >
            <option value={25} className="bg-gray-800">25</option>
            <option value={50} className="bg-gray-800">50</option>
            <option value={100} className="bg-gray-800">100</option>
          </select>
          <span className="text-gray-400">per page</span>
        </div>
      </div>
    </div>
  )
}