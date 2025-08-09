'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import { CurrencyDollarIcon, BanknotesIcon, ClockIcon, CheckCircleIcon, PlusIcon, SparklesIcon, BoltIcon, FireIcon } from '@heroicons/react/24/outline'

export default function CommissionsPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showPayoutModal, setShowPayoutModal] = useState(false)
  const [payoutData, setPayoutData] = useState({
    repName: '',
    platform: '',
    payoutDate: '',
    amount: '',
    status: 'Pending'
  })

  // Track mouse position for dynamic cursor effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Mock data for commissions
  const mockCommissions = [
    {
      id: 1,
      repName: 'Sarah Johnson',
      customerName: 'John Smith',
      platform: 'Bovada',
      signupDate: '2024-01-15',
      commissionAmount: 125,
      status: 'Paid',
      paymentDate: '2024-01-20'
    },
    {
      id: 2,
      repName: 'Mike Chen',
      customerName: 'Emily Davis',
      platform: 'Chalkboard',
      signupDate: '2024-01-14',
      commissionAmount: 50,
      status: 'Pending',
      paymentDate: null
    },
    {
      id: 3,
      repName: 'Sarah Johnson',
      customerName: 'Robert Wilson',
      platform: 'Bovada',
      signupDate: '2024-01-13',
      commissionAmount: 250,
      status: 'Paid',
      paymentDate: '2024-01-18'
    }
  ]

  // Mock payout transactions
  const [payoutTransactions, setPayoutTransactions] = useState([
    {
      id: 1,
      repName: 'Sarah Johnson',
      platform: 'Solana',
      payoutDate: '2024-01-20',
      amount: 375,
      status: 'Completed'
    },
    {
      id: 2,
      repName: 'Mike Chen',
      platform: 'Bitcoin',
      payoutDate: '2024-01-18',
      amount: 150,
      status: 'Processing'
    }
  ])

  const totalCommissions = mockCommissions.reduce((sum, c) => sum + c.commissionAmount, 0)
  const paidCommissions = mockCommissions.filter(c => c.status === 'Paid').reduce((sum, c) => sum + c.commissionAmount, 0)
  const pendingCommissions = mockCommissions.filter(c => c.status === 'Pending').reduce((sum, c) => sum + c.commissionAmount, 0)
  const totalTransactions = payoutTransactions.length

  const handleAddPayout = () => {
    if (payoutData.repName && payoutData.platform && payoutData.payoutDate && payoutData.amount) {
      const newPayout = {
        id: payoutTransactions.length + 1,
        ...payoutData,
        amount: parseFloat(payoutData.amount)
      }
      setPayoutTransactions([...payoutTransactions, newPayout])
      setPayoutData({ repName: '', platform: '', payoutDate: '', amount: '', status: 'Pending' })
      setShowPayoutModal(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen relative overflow-hidden">
        {/* Revolutionary Backdrop */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950"></div>
        
        {/* Multi-Dimensional Background Architecture */}
        <div className="fixed inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(119,255,198,0.2),transparent_50%)]"></div>
        </div>

        {/* Animated Background Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Dynamic Cursor Follower */}
        <div 
          className="fixed w-96 h-96 pointer-events-none z-0 transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        ></div>

        <div className="relative z-10 space-y-16 p-8">
          {/* Revolutionary Hero Section */}
          <div className="relative">
            {/* Quantum Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl mb-8 shadow-2xl shadow-yellow-500/25 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
                <CurrencyDollarIcon className="h-10 w-10 text-white relative z-10" />
              </div>
              
              <h1 className="text-7xl font-black mb-6 relative">
                <span className="bg-gradient-to-r from-white via-yellow-200 to-orange-300 bg-clip-text text-transparent">
                  COMMISSIONS
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  COMMAND
                </span>
              </h1>
              
              <div className="flex items-center justify-center space-x-4 text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-lg font-medium">Elite Financial Operations Center</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              
              <div className="mt-4 text-sm text-gray-400 font-mono">
                SYSTEM OPERATIONAL
              </div>
            </div>

            {/* Revolutionary Add Payout Button */}
            <div className="flex justify-center mb-12">
              <button
                onClick={() => setShowPayoutModal(true)}
                className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <PlusIcon className="h-6 w-6" />
                  <span>CREATE PAYOUT INVOICE</span>
                  <SparklesIcon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </button>
            </div>
          </div>

          {/* Revolutionary KPIs Grid - Quantum Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Total Commissions - Golden Quantum */}
            <div className="group relative">
              {/* Multi-layered Glow System */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-8 border border-yellow-500/20 group-hover:border-yellow-400/40 transition-all duration-500 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <CurrencyDollarIcon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-br from-yellow-400/20 to-red-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Commissions</p>
                  <p className="text-5xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    ${totalCommissions.toLocaleString()}
                  </p>
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <FireIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Revenue Generated</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Paid Commissions - Emerald Sophistication */}
            <div className="group relative">
              {/* Multi-layered Glow System */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-8 border border-emerald-500/20 group-hover:border-emerald-400/40 transition-all duration-500 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <CheckCircleIcon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Paid Commissions</p>
                  <p className="text-5xl font-black bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 bg-clip-text text-transparent">
                    ${paidCommissions.toLocaleString()}
                  </p>
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <SparklesIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Successfully Processed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pending Commissions - Crimson Alert */}
            <div className="group relative">
              {/* Multi-layered Glow System */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-400 via-pink-500 to-rose-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-400 via-pink-500 to-rose-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-8 border border-red-500/20 group-hover:border-red-400/40 transition-all duration-500 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-400 via-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <ClockIcon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-br from-red-400/20 to-rose-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Pending Commissions</p>
                  <p className="text-5xl font-black bg-gradient-to-r from-red-400 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                    ${pendingCommissions.toLocaleString()}
                  </p>
                  <div className="flex items-center space-x-2 text-red-400">
                    <BoltIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Awaiting Processing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Transactions - Sapphire Excellence */}
            <div className="group relative">
              {/* Multi-layered Glow System */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-cyan-500 to-indigo-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-cyan-500 to-indigo-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-8 border border-blue-500/20 group-hover:border-blue-400/40 transition-all duration-500 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 via-cyan-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <BanknotesIcon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Transactions</p>
                  <p className="text-5xl font-black bg-gradient-to-r from-blue-400 via-cyan-500 to-indigo-500 bg-clip-text text-transparent">
                    {totalTransactions}
                  </p>
                  <div className="flex items-center space-x-2 text-blue-400">
                    <SparklesIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Payout Events</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Revolutionary Payout Modal */}
          {showPayoutModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Revolutionary Backdrop */}
              <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setShowPayoutModal(false)}></div>
              
              {/* Modal Content */}
              <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-8 border border-yellow-500/20 shadow-2xl max-w-2xl w-full mx-4">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-xl opacity-25"></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                      Create Payout Invoice
                    </h2>
                    <button
                      onClick={() => setShowPayoutModal(false)}
                      className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 rounded-xl flex items-center justify-center text-red-400 hover:text-red-300 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Sales Rep Name</label>
                      <input
                        type="text"
                        value={payoutData.repName}
                        onChange={(e) => setPayoutData({...payoutData, repName: e.target.value})}
                        className="w-full bg-slate-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-yellow-500/50 focus:outline-none transition-colors"
                        placeholder="Enter sales rep name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Payment Platform</label>
                      <select
                        value={payoutData.platform}
                        onChange={(e) => setPayoutData({...payoutData, platform: e.target.value})}
                        className="w-full bg-slate-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-yellow-500/50 focus:outline-none transition-colors"
                      >
                        <option value="">Select platform</option>
                        <option value="Solana">Solana</option>
                        <option value="Bitcoin">Bitcoin</option>
                        <option value="Ethereum">Ethereum</option>
                        <option value="XRP">XRP</option>
                        <option value="Zelle">Zelle</option>
                        <option value="Venmo">Venmo</option>
                        <option value="CashApp">CashApp</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Payout Date</label>
                      <input
                        type="date"
                        value={payoutData.payoutDate}
                        onChange={(e) => setPayoutData({...payoutData, payoutDate: e.target.value})}
                        className="w-full bg-slate-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-yellow-500/50 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Amount Paid</label>
                      <input
                        type="number"
                        value={payoutData.amount}
                        onChange={(e) => setPayoutData({...payoutData, amount: e.target.value})}
                        className="w-full bg-slate-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-yellow-500/50 focus:outline-none transition-colors"
                        placeholder="0.00"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-300 text-sm font-medium mb-2">Payout Status</label>
                      <select
                        value={payoutData.status}
                        onChange={(e) => setPayoutData({...payoutData, status: e.target.value})}
                        className="w-full bg-slate-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-yellow-500/50 focus:outline-none transition-colors"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 mt-8">
                    <button
                      onClick={() => setShowPayoutModal(false)}
                      className="px-6 py-3 bg-gray-600/50 hover:bg-gray-600/70 text-white rounded-xl font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddPayout}
                      className="px-6 py-3 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-400 hover:via-orange-400 hover:to-red-400 text-white rounded-xl font-medium transition-all duration-300 shadow-lg"
                    >
                      Create Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Revolutionary Commission Transactions Section */}
          <div className="space-y-8">
            {/* Payout Transactions Table */}
            <div className="group relative">
              {/* Multi-layered Glow System */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
              
              {/* Main Container */}
              <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl border border-purple-500/20 shadow-2xl overflow-hidden">
                <div className="px-8 py-6 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                      <BanknotesIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                        Payout Transactions
                      </h2>
                      <p className="text-gray-400 mt-1">Track all commission payouts and their status</p>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-purple-900/10">
                      <tr>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Sales Rep</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Platform</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Payout Date</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Amount</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-500/10">
                      {payoutTransactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-purple-900/10 transition-colors group/row">
                          <td className="px-8 py-4 text-white font-medium">{transaction.repName}</td>
                          <td className="px-8 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              transaction.platform === 'Solana' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                              transaction.platform === 'Bitcoin' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                              transaction.platform === 'Ethereum' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                              'bg-green-500/20 text-green-300 border border-green-500/30'
                            }`}>
                              {transaction.platform}
                            </span>
                          </td>
                          <td className="px-8 py-4 text-gray-300">{transaction.payoutDate}</td>
                          <td className="px-8 py-4 text-white font-bold">${transaction.amount.toLocaleString()}</td>
                          <td className="px-8 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              transaction.status === 'Completed'
                                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                : transaction.status === 'Processing'
                                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                                : 'bg-red-500/20 text-red-300 border border-red-500/30'
                            }`}>
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Original Commissions Table */}
            <div className="group relative">
              {/* Multi-layered Glow System */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
              
              {/* Main Container */}
              <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl border border-blue-500/20 shadow-2xl overflow-hidden">
                <div className="px-8 py-6 border-b border-blue-500/20 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl">
                      <CurrencyDollarIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                        Commission Transactions
                      </h2>
                      <p className="text-gray-400 mt-1">Recent commission earnings and pending amounts</p>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-900/10">
                      <tr>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Sales Rep</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Customer</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Platform</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Signup Date</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Commission</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Payment Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-500/10">
                      {mockCommissions.map((commission) => (
                        <tr key={commission.id} className="hover:bg-blue-900/10 transition-colors group/row">
                          <td className="px-8 py-4 text-white font-medium">{commission.repName}</td>
                          <td className="px-8 py-4 text-gray-300">{commission.customerName}</td>
                          <td className="px-8 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              commission.platform === 'Bovada' 
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            }`}>
                              {commission.platform}
                            </span>
                          </td>
                          <td className="px-8 py-4 text-gray-300">{commission.signupDate}</td>
                          <td className="px-8 py-4 text-white font-bold">${commission.commissionAmount}</td>
                          <td className="px-8 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              commission.status === 'Paid'
                                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                            }`}>
                              {commission.status}
                            </span>
                          </td>
                          <td className="px-8 py-4 text-gray-300">
                            {commission.paymentDate || 'Pending'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}