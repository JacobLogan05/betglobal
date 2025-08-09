'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import { 
  UserPlusIcon, 
  PlusIcon, 
  XMarkIcon,
  SparklesIcon,
  BoltIcon,
  FireIcon,
  StarIcon,
  RocketLaunchIcon,
  TrophyIcon,
  LightBulbIcon,
  BeakerIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import { SignupProvider, useSignups } from '@/contexts/SignupContext'
import { useSalesRep } from '@/app/contexts/SalesRepContext'
import SignupKPICards from '@/components/SignupKPICards'
import SignupFilters from '@/components/SignupFilters'
import SignupTable from '@/components/SignupTable'
import SignupPagination from '@/components/SignupPagination'

interface AddSignupModalProps {
  isOpen: boolean
  onClose: () => void
}

function AddSignupModal({ isOpen, onClose }: AddSignupModalProps) {
  const { addSignup, loading } = useSignups()
  const { salesReps } = useSalesRep()
  const [formData, setFormData] = useState({
    userId: '',
    platform: 'bovada' as 'bovada' | 'chalkboard',
    status: 'pending' as 'pending' | 'qualified' | 'rejected',
    customerEmail: '',
    customerName: '',
    depositAmount: '',
    commissionAmount: '',
    notes: '',
    signupDate: new Date().toISOString().split('T')[0]
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  // Commission amount options based on platform and signup type
  const commissionOptions = [
    { value: '80', label: '$80 - First Bovada Signup' },
    { value: '40', label: '$40 - Normal Bovada Signup' },
    { value: '30', label: '$30 - Chalkboard Signup' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      // Find the selected sales rep to get their name and email
      const selectedRep = salesReps.find(rep => rep.id === formData.userId)
      if (!selectedRep) {
        setMessage('Please select a sales representative')
        setIsSubmitting(false)
        return
      }

      const success = await addSignup({
        ...formData,
        signupDate: new Date(formData.signupDate).toISOString(),
        repName: `${selectedRep.firstName} ${selectedRep.lastName}`,
        repEmail: selectedRep.email,
      })

      if (success) {
        setMessage('Signup added successfully!')
        setFormData({
          userId: '',
          platform: 'bovada',
          status: 'pending',
          customerEmail: '',
          customerName: '',
          depositAmount: '',
          commissionAmount: '',
          notes: '',
          signupDate: new Date().toISOString().split('T')[0]
        })
        setTimeout(() => {
          onClose()
          setMessage('')
        }, 1500)
      } else {
        setMessage('Failed to add signup')
      }
    } catch (error) {
      setMessage('Error adding signup')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Revolutionary Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-300" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-2 md:p-4">
        <div className="relative w-full max-w-3xl max-h-[95vh] overflow-y-auto">
          {/* Multi-Dimensional Background Architecture */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-gray-950/95 to-slate-950/95 backdrop-blur-2xl rounded-2xl md:rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 via-transparent to-emerald-500/10 rounded-2xl md:rounded-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-400/5 via-transparent to-transparent rounded-2xl md:rounded-3xl"></div>
          
          {/* Revolutionary Border System */}
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-green-400/20 shadow-2xl shadow-green-500/10"></div>
          
          {/* Modal Content */}
          <div className="relative p-4 md:p-6">
            {/* Quantum Header */}
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20 blur-xl rounded-xl md:rounded-2xl"></div>
                  <div className="relative w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl">
                    <PlusIcon className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg md:text-2xl lg:text-3xl font-black bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent">
                    CREATE NEW SIGNUP
                  </h2>
                  <p className="text-green-200/80 text-xs md:text-sm lg:text-lg mt-1">Add a new customer signup and assign to a rep</p>
                </div>
              </div>
              
              {/* Elite Close Button */}
              <button
                onClick={onClose}
                className="group relative p-2 md:p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-400/30 hover:border-red-300/50 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-400/0 to-red-500/0 rounded-xl transition-all duration-300 group-hover:from-red-400/10 group-hover:to-red-500/10 blur-xl"></div>
                <XMarkIcon className="relative h-5 w-5 md:h-6 md:w-6 text-red-300 group-hover:text-red-200 transition-colors duration-300" />
              </button>
            </div>

            {/* Revolutionary Form */}
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              {/* Sales Rep Selection */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 blur-xl rounded-xl md:rounded-2xl"></div>
                <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4">
                  <label className="block text-cyan-300 text-xs font-bold tracking-wide uppercase mb-2">
                    ASSIGN TO SALES REP
                  </label>
                  <select
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 md:py-3 bg-black/30 border border-cyan-400/30 rounded-lg text-white text-sm focus:border-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                    required
                  >
                    <option value="">Select a sales representative...</option>
                    {salesReps.map((rep) => (
                      <option key={rep.id} value={rep.id} className="bg-gray-900">
                        {rep.firstName} {rep.lastName} ({rep.email})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Platform, Status & Commission */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-xl rounded-xl md:rounded-2xl"></div>
                  <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4">
                    <label className="block text-purple-300 text-xs font-bold tracking-wide uppercase mb-2">
                      PLATFORM
                    </label>
                    <select
                      name="platform"
                      value={formData.platform}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 md:py-3 bg-black/30 border border-purple-400/30 rounded-lg text-white text-sm focus:border-purple-300/60 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      required
                    >
                      <option value="bovada" className="bg-gray-900">BOVADA</option>
                      <option value="chalkboard" className="bg-gray-900">CHALKBOARD</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 blur-xl rounded-xl md:rounded-2xl"></div>
                  <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4">
                    <label className="block text-emerald-300 text-xs font-bold tracking-wide uppercase mb-2">
                      STATUS
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 md:py-3 bg-black/30 border border-emerald-400/30 rounded-lg text-white text-sm focus:border-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                      required
                    >
                      <option value="pending" className="bg-gray-900">PENDING</option>
                      <option value="qualified" className="bg-gray-900">QUALIFIED</option>
                      <option value="rejected" className="bg-gray-900">REJECTED</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 blur-xl rounded-xl md:rounded-2xl"></div>
                  <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4">
                    <label className="block text-yellow-300 text-xs font-bold tracking-wide uppercase mb-2">
                      COMMISSION
                    </label>
                    <select
                      name="commissionAmount"
                      value={formData.commissionAmount}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 md:py-3 bg-black/30 border border-yellow-400/30 rounded-lg text-white text-sm focus:border-yellow-300/60 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
                      required
                    >
                      <option value="">Select commission...</option>
                      {commissionOptions.map((option) => (
                        <option key={option.value} value={option.value} className="bg-gray-900">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 blur-xl rounded-xl md:rounded-2xl"></div>
                  <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4">
                    <label className="block text-blue-300 text-xs font-bold tracking-wide uppercase mb-2">
                      CUSTOMER NAME
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 md:py-3 bg-black/30 border border-blue-400/30 rounded-lg text-white text-sm placeholder-gray-400 focus:border-blue-300/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="Enter customer name..."
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-cyan-500/5 blur-xl rounded-xl md:rounded-2xl"></div>
                  <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4">
                    <label className="block text-teal-300 text-xs font-bold tracking-wide uppercase mb-2">
                      CUSTOMER EMAIL
                    </label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 md:py-3 bg-black/30 border border-teal-400/30 rounded-lg text-white text-sm placeholder-gray-400 focus:border-teal-300/60 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all duration-300"
                      placeholder="Enter customer email..."
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Deposit Amount & Signup Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 blur-xl rounded-xl md:rounded-2xl"></div>
                  <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4">
                    <label className="block text-green-300 text-xs font-bold tracking-wide uppercase mb-2">
                      DEPOSIT AMOUNT
                    </label>
                    <input
                      type="number"
                      name="depositAmount"
                      value={formData.depositAmount}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 md:py-3 bg-black/30 border border-green-400/30 rounded-lg text-white text-sm placeholder-gray-400 focus:border-green-300/60 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                      placeholder="Enter deposit amount..."
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 blur-xl rounded-xl md:rounded-2xl"></div>
                  <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4">
                    <label className="block text-orange-300 text-xs font-bold tracking-wide uppercase mb-2">
                      SIGNUP DATE
                    </label>
                    <input
                      type="date"
                      name="signupDate"
                      value={formData.signupDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 md:py-3 bg-black/30 border border-orange-400/30 rounded-lg text-white text-sm focus:border-orange-300/60 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 blur-xl rounded-xl md:rounded-2xl"></div>
                <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4">
                  <label className="block text-indigo-300 text-xs font-bold tracking-wide uppercase mb-2">
                    NOTES
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 md:py-3 bg-black/30 border border-indigo-400/30 rounded-lg text-white text-sm placeholder-gray-400 focus:border-indigo-300/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 resize-none"
                    placeholder="Add any additional notes..."
                  />
                </div>
              </div>

              {/* Message Display */}
              {message && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl rounded-xl"></div>
                  <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-3 text-center">
                    <p className="text-white font-medium">{message}</p>
                  </div>
                </div>
              )}

              {/* Revolutionary Action Buttons */}
              <div className="flex items-center justify-end space-x-3 md:space-x-4 pt-4 md:pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="group relative inline-flex items-center px-4 md:px-6 py-2 md:py-3 border border-red-400/30 text-red-300 rounded-xl hover:text-white transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-600/0 rounded-xl transition-all duration-300 group-hover:from-red-500/10 group-hover:to-red-600/10 blur-xl"></div>
                  <XMarkIcon className="relative h-4 w-4 mr-2" />
                  <span className="relative font-bold tracking-wide text-sm">CANCEL</span>
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 text-green-200 rounded-xl hover:text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-emerald-500/0 rounded-xl transition-all duration-300 group-hover:from-green-500/10 group-hover:to-emerald-500/10 blur-xl"></div>
                  {isSubmitting ? (
                    <>
                      <div className="relative animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      <span className="relative font-bold tracking-wide text-sm">CREATING...</span>
                    </>
                  ) : (
                    <>
                      <PlusIcon className="relative h-4 w-4 mr-2" />
                      <span className="relative font-bold tracking-wide text-sm">CREATE SIGNUP</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function SignupsPageContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <DashboardLayout>
      {/* Revolutionary Backdrop */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-gray-950 to-slate-950"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950/50 to-slate-950"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      
      {/* Multi-Dimensional Background Architecture */}
      <div className="fixed inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_50%,transparent_75%)] bg-[length:60px_60px] animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(-45deg,transparent_25%,rgba(147,51,234,0.05)_50%,transparent_75%)] bg-[length:60px_60px] animate-pulse delay-1000"></div>
      </div>
      
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Dynamic Cursor Follower */}
      <div 
        className="fixed pointer-events-none z-50 w-6 h-6 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-sm transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${isVisible ? 1 : 0})`,
        }}
      />

      <div className={`relative space-y-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Revolutionary Hero Section */}
        <div className="relative">
          {/* Quantum Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl mb-8 shadow-2xl shadow-yellow-500/25 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
              <UserPlusIcon className="h-10 w-10 text-white relative z-10" />
            </div>
            
            <h1 className="text-7xl font-black mb-6 relative">
              <span className="bg-gradient-to-r from-white via-yellow-200 to-orange-300 bg-clip-text text-transparent">
                SIGNUPS
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                COMMAND
              </span>
            </h1>
            
            <div className="flex items-center justify-center space-x-4 text-gray-300">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-lg font-medium">Elite Customer Acquisition Center</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            <div className="mt-4 text-sm text-gray-400 font-mono">
              CONVERSION PROTOCOL: ACTIVE
            </div>
            
            {/* Revolutionary Add Signup Button */}
            <div className="mt-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl text-green-200 hover:text-white transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-emerald-500/0 rounded-2xl transition-all duration-300 group-hover:from-green-500/10 group-hover:to-emerald-500/10 blur-xl"></div>
                <PlusIcon className="relative h-6 w-6 mr-3" />
                <span className="relative font-bold tracking-wide">CREATE SIGNUP</span>
              </button>
            </div>
          </div>
        </div>

        {/* Revolutionary KPIs Grid */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 blur-3xl rounded-[2rem]"></div>
          <SignupKPICards />
        </div>

        {/* Revolutionary Filters Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-indigo-500/10 blur-3xl rounded-[2rem]"></div>
          <SignupFilters />
        </div>

        {/* Revolutionary Signups Table */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-rose-500/10 blur-3xl rounded-[2rem]"></div>
          <SignupTable />
        </div>

        {/* Revolutionary Pagination */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-cyan-500/10 blur-3xl rounded-[2rem]"></div>
          <SignupPagination />
        </div>

        {/* Mobile Add Button */}
        <div className="xl:hidden fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl text-green-200 hover:text-white transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-emerald-500/0 rounded-2xl transition-all duration-300 group-hover:from-green-500/10 group-hover:to-emerald-500/10 blur-xl"></div>
            <PlusIcon className="relative h-8 w-8 mx-auto" />
          </button>
        </div>
      </div>

      <AddSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </DashboardLayout>
  )
}

export default function SignupsPage() {
  return (
    <SignupProvider>
      <SignupsPageContent />
    </SignupProvider>
  )
}