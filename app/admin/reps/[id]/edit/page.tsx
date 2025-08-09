'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import DashboardLayout from '../../../../components/DashboardLayout'
import { 
  UserIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  CalendarIcon,
  ArrowLeftIcon,
  CheckIcon,
  XMarkIcon,
  SparklesIcon,
  BoltIcon,
  FireIcon,
  StarIcon,
  RocketLaunchIcon,
  TrophyIcon,
  LightBulbIcon,
  BeakerIcon,
  CogIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function EditSalesRepPage() {
  const params = useParams()
  const router = useRouter()
  const repId = params.id as string
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

  // Mock sales rep data - in a real app, this would come from a database
  const mockSalesReps = [
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@betglobal.com',
      phone: '+1 (555) 123-4567',
      role: 'Senior Sales Rep',
      status: 'Active' as const,
      joinDate: '2024-01-15',
      notes: 'Top performer this quarter',
      department: 'Sales',
      manager: 'John Smith',
      territory: 'North America',
      monthlyTarget: 50
    },
    {
      id: '2',
      firstName: 'Mike',
      lastName: 'Chen',
      email: 'mike.chen@betglobal.com',
      phone: '+1 (555) 234-5678',
      role: 'Sales Rep',
      status: 'Active' as const,
      joinDate: '2024-02-01',
      notes: 'Consistent performance',
      department: 'Sales',
      manager: 'John Smith',
      territory: 'West Coast',
      monthlyTarget: 40
    }
  ]

  const salesRep = mockSalesReps.find(rep => rep.id === repId)

  const [formData, setFormData] = useState({
    firstName: salesRep?.firstName || '',
    lastName: salesRep?.lastName || '',
    email: salesRep?.email || '',
    phone: salesRep?.phone || '',
    role: salesRep?.role || '',
    status: salesRep?.status || 'Active',
    department: salesRep?.department || '',
    manager: salesRep?.manager || '',
    territory: salesRep?.territory || '',
    monthlyTarget: salesRep?.monthlyTarget || 0,
    notes: salesRep?.notes || ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!salesRep) {
    return (
      <DashboardLayout>
        {/* Revolutionary Backdrop */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-gray-950 to-slate-950"></div>
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950/50 to-slate-950"></div>
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        
        <div className="relative flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-red-600/20 blur-3xl rounded-full"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-3xl flex items-center justify-center shadow-2xl mx-auto">
                <XMarkIcon className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-white via-red-100 to-red-200 bg-clip-text text-transparent mb-4">
              AGENT NOT FOUND
            </h1>
            <p className="text-gray-400 mb-8 text-lg">The elite agent you're trying to edit doesn't exist in our quantum database.</p>
            <Link 
              href="/admin/reps"
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-2xl text-blue-200 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 rounded-2xl transition-all duration-300 group-hover:from-blue-500/10 group-hover:to-purple-500/10 blur-xl"></div>
              <ArrowLeftIcon className="relative h-5 w-5 mr-3" />
              <span className="relative font-bold tracking-wide">RETURN TO AGENTS</span>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'monthlyTarget' ? parseInt(value) || 0 : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // In a real app, you would make an API call here
    console.log('Updated sales rep data:', formData)
    
    setIsSubmitting(false)
    router.push(`/admin/reps/${repId}`)
  }

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
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
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
        <div className="relative overflow-hidden">
          <div className="relative bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.04] backdrop-blur-2xl border border-white/20 rounded-[2rem] p-12 shadow-[0_32px_64px_rgba(0,0,0,0.4)] hover:shadow-[0_48px_96px_rgba(0,0,0,0.5)] transition-all duration-700 group">
            {/* Quantum Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-yellow-500/5 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <Link 
                  href={`/admin/reps/${repId}`}
                  className="group/back relative p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-purple-500/0 rounded-2xl transition-all duration-300 group-hover/back:from-blue-400/10 group-hover/back:to-purple-500/10 blur-xl"></div>
                  <ArrowLeftIcon className="relative h-6 w-6 text-blue-300 group-hover/back:text-blue-200 transition-colors duration-300" />
                </Link>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-3xl blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-orange-400 via-yellow-500 to-amber-400 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    <PencilSquareIcon className="h-10 w-10 text-white animate-pulse" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h1 className="text-5xl font-black bg-gradient-to-r from-white via-orange-100 via-yellow-100 to-amber-100 bg-clip-text text-transparent tracking-tight leading-tight">
                    EDIT ELITE AGENT
                  </h1>
                  <div className="flex items-center space-x-4">
                    <div className="h-px w-12 bg-gradient-to-r from-orange-400 to-yellow-400"></div>
                    <p className="text-xl text-gray-300 font-light tracking-wide">
                      Modify agent <span className="text-white font-semibold bg-gradient-to-r from-orange-200 to-yellow-200 bg-clip-text text-transparent">{salesRep.firstName} {salesRep.lastName}</span> configuration
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-ping opacity-20"></div>
                </div>
                <span className="text-sm text-gray-300 font-semibold tracking-wide">
                  EDIT MODE ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Revolutionary Edit Form */}
        <div className="relative">
          {/* Multi-layered glow system */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-yellow-500/5 to-amber-500/10 blur-3xl rounded-[2rem]"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-2xl border border-white/20 rounded-[2rem] shadow-[0_32px_64px_rgba(0,0,0,0.4)]"></div>
          
          <div className="relative p-12">
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Personal Information Section */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 blur-2xl rounded-2xl"></div>
                <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 blur-xl rounded-2xl"></div>
                      <div className="relative w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
                        <UserIcon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                      PERSONAL INFORMATION
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative">
                        <label className="block text-blue-300 text-sm font-bold tracking-wide uppercase mb-3">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-black/30 border border-blue-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300/60 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative">
                        <label className="block text-blue-300 text-sm font-bold tracking-wide uppercase mb-3">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-black/30 border border-blue-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300/60 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-purple-600/5 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative">
                        <label className="block text-purple-300 text-sm font-bold tracking-wide uppercase mb-3">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-black/30 border border-purple-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300/60 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-600/5 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative">
                        <label className="block text-emerald-300 text-sm font-bold tracking-wide uppercase mb-3">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-black/30 border border-emerald-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-300/60 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Work Information Section */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-2xl rounded-2xl"></div>
                <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-500/20 blur-xl rounded-2xl"></div>
                      <div className="relative w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                        <CogIcon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-black bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent">
                      WORK INFORMATION
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-600/5 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative">
                        <label className="block text-orange-300 text-sm font-bold tracking-wide uppercase mb-3">Role</label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-black/30 border border-orange-400/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-300/60 transition-all duration-300"
                          required
                        >
                          <option value="">Select Role</option>
                          <option value="Junior Sales Rep">Junior Sales Rep</option>
                          <option value="Sales Rep">Sales Rep</option>
                          <option value="Senior Sales Rep">Senior Sales Rep</option>
                          <option value="Sales Manager">Sales Manager</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-600/5 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative">
                        <label className="block text-green-300 text-sm font-bold tracking-wide uppercase mb-3">Status</label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-black/30 border border-green-400/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-300/60 transition-all duration-300"
                          required
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="On Leave">On Leave</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-cyan-600/5 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative">
                        <label className="block text-cyan-300 text-sm font-bold tracking-wide uppercase mb-3">Department</label>
                        <input
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-black/30 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-300/60 transition-all duration-300"
                        />
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-indigo-600/5 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative">
                        <label className="block text-indigo-300 text-sm font-bold tracking-wide uppercase mb-3">Manager</label>
                        <input
                          type="text"
                          name="manager"
                          value={formData.manager}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-black/30 border border-indigo-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-300/60 transition-all duration-300"
                        />
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-teal-600/5 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative">
                        <label className="block text-teal-300 text-sm font-bold tracking-wide uppercase mb-3">Territory</label>
                        <input
                          type="text"
                          name="territory"
                          value={formData.territory}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-black/30 border border-teal-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-300/60 transition-all duration-300"
                        />
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-yellow-600/5 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative">
                        <label className="block text-yellow-300 text-sm font-bold tracking-wide uppercase mb-3">Monthly Target</label>
                        <input
                          type="number"
                          name="monthlyTarget"
                          value={formData.monthlyTarget}
                          onChange={handleInputChange}
                          min="0"
                          className="w-full px-4 py-4 bg-black/30 border border-yellow-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-300/60 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 blur-2xl rounded-2xl"></div>
                <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 blur-xl rounded-2xl"></div>
                      <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-2xl">
                        <LightBulbIcon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-black bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent">
                      AGENT NOTES
                    </h3>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={4}
                      className="relative w-full px-4 py-4 bg-black/30 border border-emerald-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-300/60 transition-all duration-300 resize-none"
                      placeholder="Add any additional notes about this elite agent..."
                    />
                  </div>
                </div>
              </div>

              {/* Revolutionary Action Buttons */}
              <div className="flex items-center justify-end space-x-6 pt-8 border-t border-white/10">
                <Link
                  href={`/admin/reps/${repId}`}
                  className="group relative inline-flex items-center px-8 py-4 border border-red-400/30 text-red-300 rounded-2xl hover:text-white transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-600/0 rounded-2xl transition-all duration-300 group-hover:from-red-500/10 group-hover:to-red-600/10 blur-xl"></div>
                  <XMarkIcon className="relative h-5 w-5 mr-3" />
                  <span className="relative font-bold tracking-wide">CANCEL</span>
                </Link>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 text-green-200 rounded-2xl hover:text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-emerald-500/0 rounded-2xl transition-all duration-300 group-hover:from-green-500/10 group-hover:to-emerald-500/10 blur-xl"></div>
                  {isSubmitting ? (
                    <>
                      <div className="relative animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      <span className="relative font-bold tracking-wide">SAVING...</span>
                    </>
                  ) : (
                    <>
                      <CheckIcon className="relative h-5 w-5 mr-3" />
                      <span className="relative font-bold tracking-wide">SAVE CHANGES</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}