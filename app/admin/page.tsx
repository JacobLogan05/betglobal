import { auth, currentUser } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { users, signups, commissions } from '@/lib/db/schema'
import { eq, count, sum, and, desc } from 'drizzle-orm'
import DashboardLayout from '@/app/components/DashboardLayout'
import { 
  ArrowTrendingUpIcon, 
  CurrencyDollarIcon, 
  UsersIcon, 
  ChartBarIcon,
  SparklesIcon,
  BoltIcon,
  FireIcon,
  StarIcon
} from '@heroicons/react/24/outline'

export default async function AdminDashboard() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // Simple user check without complex database operations
  let currentUserData: any = { firstName: 'Admin', lastName: 'User', role: 'admin' }
  
  try {
    const user = await db.select().from(users).where(eq(users.clerkId, userId)).limit(1)
    if (user.length > 0) {
      currentUserData = user[0]
    } else {
      // Try to create user but don't fail if it doesn't work
      try {
        const clerkUser = await currentUser()
        if (clerkUser) {
          await db.insert(users).values({
            clerkId: userId,
            email: clerkUser.emailAddresses[0]?.emailAddress || '',
            firstName: clerkUser.firstName || 'Admin',
            lastName: clerkUser.lastName || 'User',
            role: 'admin'
          })
          const newUser = await db.select().from(users).where(eq(users.clerkId, userId)).limit(1)
          if (newUser.length > 0) currentUserData = newUser[0]
        }
      } catch (createError) {
        console.log('User creation failed, using defaults:', createError)
      }
    }
  } catch (error) {
    console.log('Database connection issue, using default user data:', error)
  }

  // Mock data for dashboard display
  const mockStats = {
    totalSignups: 247,
    totalRevenue: 18540,
    totalProfit: 12360,
    totalCommissionsPaid: 4180,
    commissionsOwed: 2000,
    activeReps: 8,
    bovadaSignups: 156,
    bovadaRevenue: 12480,
    bovadaCommissions: 2640,
    chalkboardSignups: 91,
    chalkboardRevenue: 6060,
    chalkboardCommissions: 1540
  }

  // Mock sales rep data
  const mockReps = [
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: 'Senior Sales Rep',
      totalSignups: 45,
      bovadaSignups: 28,
      chalkboardSignups: 17,
      commissionsEarned: 1800,
      commissionsPaid: 1200,
      commissionsDue: 600,
      status: 'Active',
      notes: 'Top performer this quarter'
    },
    {
      id: 2,
      firstName: 'Mike',
      lastName: 'Chen',
      role: 'Sales Rep',
      totalSignups: 38,
      bovadaSignups: 23,
      chalkboardSignups: 15,
      commissionsEarned: 1520,
      commissionsPaid: 1000,
      commissionsDue: 520,
      status: 'Active',
      notes: 'Consistent performance'
    },
    {
      id: 3,
      firstName: 'Emily',
      lastName: 'Rodriguez',
      role: 'Sales Rep',
      totalSignups: 52,
      bovadaSignups: 31,
      chalkboardSignups: 21,
      commissionsEarned: 2080,
      commissionsPaid: 1500,
      commissionsDue: 580,
      status: 'Active',
      notes: 'Excellent closer'
    },
    {
      id: 4,
      firstName: 'David',
      lastName: 'Thompson',
      role: 'Junior Sales Rep',
      totalSignups: 29,
      bovadaSignups: 18,
      chalkboardSignups: 11,
      commissionsEarned: 1160,
      commissionsPaid: 800,
      commissionsDue: 360,
      status: 'Active',
      notes: 'Improving steadily'
    },
    {
      id: 5,
      firstName: 'Jessica',
      lastName: 'Williams',
      role: 'Sales Rep',
      totalSignups: 41,
      bovadaSignups: 25,
      chalkboardSignups: 16,
      commissionsEarned: 1640,
      commissionsPaid: 1100,
      commissionsDue: 540,
      status: 'Active',
      notes: 'Strong relationship builder'
    },
    {
      id: 6,
      firstName: 'Alex',
      lastName: 'Martinez',
      role: 'Sales Rep',
      totalSignups: 33,
      bovadaSignups: 21,
      chalkboardSignups: 12,
      commissionsEarned: 1320,
      commissionsPaid: 900,
      commissionsDue: 420,
      status: 'Inactive',
      notes: 'On temporary leave'
    }
  ]

  // Mock weekly data for charts
  const weeklySignups = [12, 18, 15, 22, 28, 25, 31]
  const weeklyRevenue = [960, 1440, 1200, 1760, 2240, 2000, 2480]

  return (
    <DashboardLayout currentUser={currentUserData}>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <SparklesIcon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent tracking-tight">
                      Command Center
                    </h1>
                    <p className="text-xl text-gray-400 mt-2 font-light">
                      Welcome back, <span className="text-white font-medium">{currentUserData?.firstName}</span>. Your empire awaits.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-sm text-gray-300 font-medium">All Systems Operational</span>
                  </div>
                  <div className="text-sm text-gray-400 font-mono">
                    {new Date().toLocaleString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <BoltIcon className="h-16 w-16 text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                  <ArrowTrendingUpIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-blue-400 text-sm font-medium">+12.5%</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">{mockStats.totalSignups.toLocaleString()}</div>
                <div className="text-sm text-gray-400 font-medium">Total Signups</div>
                <div className="text-xs text-blue-400">All platforms combined</div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
                  <CurrencyDollarIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-green-400 text-sm font-medium">+8.3%</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">${mockStats.totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-gray-400 font-medium">Total Revenue</div>
                <div className="text-xs text-green-400">Gross income generated</div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
                  <StarIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-purple-400 text-sm font-medium">+15.7%</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">${mockStats.totalProfit.toLocaleString()}</div>
                <div className="text-sm text-gray-400 font-medium">Net Profit</div>
                <div className="text-xs text-purple-400">After all commissions</div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-xl flex items-center justify-center shadow-lg">
                  <UsersIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-orange-400 text-sm font-medium">Active</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">{mockStats.activeReps}</div>
                <div className="text-sm text-gray-400 font-medium">Sales Team</div>
                <div className="text-xs text-orange-400">Representatives online</div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-xl flex items-center justify-center shadow-lg">
                    <FireIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Bovada Platform</h3>
                    <p className="text-gray-400">Primary revenue driver</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-orange-400 text-sm font-medium">+18.2%</div>
                  <div className="text-xs text-gray-500">vs last month</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white/[0.03] rounded-2xl border border-white/5">
                  <div className="text-3xl font-bold text-orange-400 mb-2">{mockStats.bovadaSignups}</div>
                  <div className="text-sm text-gray-400">Signups</div>
                </div>
                <div className="text-center p-6 bg-white/[0.03] rounded-2xl border border-white/5">
                  <div className="text-3xl font-bold text-orange-400 mb-2">${mockStats.bovadaRevenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Revenue</div>
                </div>
                <div className="text-center p-6 bg-white/[0.03] rounded-2xl border border-white/5">
                  <div className="text-3xl font-bold text-orange-400 mb-2">${mockStats.bovadaCommissions.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Commissions</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center shadow-lg">
                    <ChartBarIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Chalkboard Platform</h3>
                    <p className="text-gray-400">Growing market segment</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-blue-400 text-sm font-medium">+24.7%</div>
                  <div className="text-xs text-gray-500">vs last month</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white/[0.03] rounded-2xl border border-white/5">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{mockStats.chalkboardSignups}</div>
                  <div className="text-sm text-gray-400">Signups</div>
                </div>
                <div className="text-center p-6 bg-white/[0.03] rounded-2xl border border-white/5">
                  <div className="text-3xl font-bold text-blue-400 mb-2">${mockStats.chalkboardRevenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Revenue</div>
                </div>
                <div className="text-center p-6 bg-white/[0.03] rounded-2xl border border-white/5">
                  <div className="text-3xl font-bold text-blue-400 mb-2">${mockStats.chalkboardCommissions.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Commissions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Team Overview */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
          <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl overflow-hidden">
            <div className="p-10 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Elite Sales Force</h2>
                  <p className="text-gray-400 text-lg">Performance metrics for your top performers</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Team Size</div>
                  <div className="text-3xl font-bold text-white">{mockReps.length}</div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left p-6 text-gray-300 font-semibold text-sm tracking-wider">REPRESENTATIVE</th>
                    <th className="text-left p-6 text-gray-300 font-semibold text-sm tracking-wider">ROLE</th>
                    <th className="text-center p-6 text-gray-300 font-semibold text-sm tracking-wider">SIGNUPS</th>
                    <th className="text-center p-6 text-gray-300 font-semibold text-sm tracking-wider">EARNED</th>
                    <th className="text-center p-6 text-gray-300 font-semibold text-sm tracking-wider">PAID</th>
                    <th className="text-center p-6 text-gray-300 font-semibold text-sm tracking-wider">DUE</th>
                    <th className="text-center p-6 text-gray-300 font-semibold text-sm tracking-wider">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {mockReps.map((rep, index) => (
                    <tr key={rep.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all duration-300 group/row">
                      <td className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {rep.firstName[0]}{rep.lastName[0]}
                          </div>
                          <div className="text-white font-semibold text-lg group-hover/row:text-blue-300 transition-colors">
                            {rep.firstName} {rep.lastName}
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="text-gray-300 font-medium">{rep.role}</div>
                      </td>
                      <td className="p-6 text-center">
                        <div className="text-2xl font-bold text-cyan-400">{rep.totalSignups}</div>
                      </td>
                      <td className="p-6 text-center">
                        <div className="text-2xl font-bold text-green-400">${rep.commissionsEarned.toLocaleString()}</div>
                      </td>
                      <td className="p-6 text-center">
                        <div className="text-2xl font-bold text-blue-400">${rep.commissionsPaid.toLocaleString()}</div>
                      </td>
                      <td className="p-6 text-center">
                        <div className="text-2xl font-bold text-yellow-400">${rep.commissionsDue.toLocaleString()}</div>
                      </td>
                      <td className="p-6 text-center">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold border ${
                          rep.status === 'Active' 
                            ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                            : 'bg-red-500/20 text-red-300 border-red-500/30'
                        }`}>
                          {rep.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Performance Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Weekly Acquisition</h3>
                  <p className="text-gray-400">Signup performance trends</p>
                </div>
                <div className="text-cyan-400 text-sm font-medium">+23.4% this week</div>
              </div>
              <div className="h-64 flex items-end justify-between space-x-3">
                {weeklySignups.map((signups, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center group/bar">
                    <div 
                      className="w-full bg-gradient-to-t from-cyan-500 to-cyan-300 rounded-t-lg transition-all duration-700 hover:from-cyan-400 hover:to-cyan-200 group-hover/bar:shadow-lg group-hover/bar:shadow-cyan-500/50"
                      style={{ height: `${(signups / Math.max(...weeklySignups)) * 200}px` }}
                    ></div>
                    <div className="text-xs text-gray-400 mt-3 font-medium">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </div>
                    <div className="text-sm text-cyan-300 font-bold">{signups}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Revenue Flow</h3>
                  <p className="text-gray-400">Weekly income generation</p>
                </div>
                <div className="text-green-400 text-sm font-medium">+31.2% this week</div>
              </div>
              <div className="h-64 flex items-end justify-between space-x-3">
                {weeklyRevenue.map((revenue, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center group/bar">
                    <div 
                      className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t-lg transition-all duration-700 hover:from-green-400 hover:to-green-200 group-hover/bar:shadow-lg group-hover/bar:shadow-green-500/50"
                      style={{ height: `${(revenue / Math.max(...weeklyRevenue)) * 200}px` }}
                    ></div>
                    <div className="text-xs text-gray-400 mt-3 font-medium">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </div>
                    <div className="text-sm text-green-300 font-bold">${revenue}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}