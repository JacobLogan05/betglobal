import { auth, currentUser } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { users, signups, commissions } from '@/lib/db/schema'
import { eq, count, sum, and, desc } from 'drizzle-orm'
import DashboardLayout from '@/app/components/DashboardLayout'

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
      commissionsEarned: 1800,
      commissionsPaid: 1200,
      commissionsDue: 600,
      status: 'Active'
    },
    {
      id: 2,
      firstName: 'Mike',
      lastName: 'Chen',
      role: 'Sales Rep',
      totalSignups: 38,
      commissionsEarned: 1520,
      commissionsPaid: 1000,
      commissionsDue: 520,
      status: 'Active'
    },
    {
      id: 3,
      firstName: 'Emily',
      lastName: 'Rodriguez',
      role: 'Sales Rep',
      totalSignups: 52,
      commissionsEarned: 2080,
      commissionsPaid: 1500,
      commissionsDue: 580,
      status: 'Active'
    },
    {
      id: 4,
      firstName: 'David',
      lastName: 'Thompson',
      role: 'Junior Sales Rep',
      totalSignups: 29,
      commissionsEarned: 1160,
      commissionsPaid: 800,
      commissionsDue: 360,
      status: 'Active'
    },
    {
      id: 5,
      firstName: 'Jessica',
      lastName: 'Williams',
      role: 'Sales Rep',
      totalSignups: 41,
      commissionsEarned: 1640,
      commissionsPaid: 1100,
      commissionsDue: 540,
      status: 'Active'
    },
    {
      id: 6,
      firstName: 'Alex',
      lastName: 'Martinez',
      role: 'Sales Rep',
      totalSignups: 33,
      commissionsEarned: 1320,
      commissionsPaid: 900,
      commissionsDue: 420,
      status: 'Inactive'
    }
  ]

  // Mock weekly data for charts
  const weeklySignups = [12, 18, 15, 22, 28, 25, 31]
  const weeklyRevenue = [960, 1440, 1200, 1760, 2240, 2000, 2480]

  return (
    <DashboardLayout currentUser={currentUserData}>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="text-gray-400 mt-2">Welcome back, {currentUserData?.firstName}! Here's your system overview.</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Last updated</div>
            <div className="text-cyan-300 font-mono">{new Date().toLocaleString()}</div>
          </div>
        </div>

        {/* Main KPI Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {/* Total Signups */}
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-cyan-300/60 text-sm font-mono mb-2">TOTAL SIGNUPS</div>
              <div className="text-3xl font-bold text-cyan-300">{mockStats.totalSignups}</div>
              <div className="text-xs text-cyan-300/40 mt-1">All Platforms</div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-green-300/60 text-sm font-mono mb-2">TOTAL REVENUE</div>
              <div className="text-3xl font-bold text-green-300">${mockStats.totalRevenue.toLocaleString()}</div>
              <div className="text-xs text-green-300/40 mt-1">Gross Income</div>
            </div>
          </div>

          {/* Total Profit */}
          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-purple-300/60 text-sm font-mono mb-2">TOTAL PROFIT</div>
              <div className="text-3xl font-bold text-purple-300">${mockStats.totalProfit.toLocaleString()}</div>
              <div className="text-xs text-purple-300/40 mt-1">After Commissions</div>
            </div>
          </div>

          {/* Commissions Paid */}
          <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-yellow-300/60 text-sm font-mono mb-2">PAID OUT</div>
              <div className="text-3xl font-bold text-yellow-300">${mockStats.totalCommissionsPaid.toLocaleString()}</div>
              <div className="text-xs text-yellow-300/40 mt-1">Commissions</div>
            </div>
          </div>

          {/* Commissions Owed */}
          <div className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-red-300/60 text-sm font-mono mb-2">OWED</div>
              <div className="text-3xl font-bold text-red-300">${mockStats.commissionsOwed.toLocaleString()}</div>
              <div className="text-xs text-red-300/40 mt-1">Outstanding</div>
            </div>
          </div>

          {/* Active Reps */}
          <div className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 border border-indigo-500/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-indigo-300/60 text-sm font-mono mb-2">ACTIVE REPS</div>
              <div className="text-3xl font-bold text-indigo-300">{mockStats.activeReps}</div>
              <div className="text-xs text-indigo-300/40 mt-1">Sales Team</div>
            </div>
          </div>
        </div>

        {/* Platform Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bovada Stats */}
          <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-orange-300 mb-4 font-mono flex items-center">
              <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
              BOVADA PLATFORM
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-orange-300/60 text-sm">Signups</div>
                <div className="text-2xl font-bold text-orange-300">{mockStats.bovadaSignups}</div>
              </div>
              <div className="text-center">
                <div className="text-orange-300/60 text-sm">Revenue</div>
                <div className="text-2xl font-bold text-orange-300">${mockStats.bovadaRevenue.toLocaleString()}</div>
              </div>
              <div className="text-center">
                <div className="text-orange-300/60 text-sm">Commissions</div>
                <div className="text-2xl font-bold text-orange-300">${mockStats.bovadaCommissions.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Chalkboard Stats */}
          <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-500/30 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-blue-300 mb-4 font-mono flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
              CHALKBOARD PLATFORM
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-blue-300/60 text-sm">Signups</div>
                <div className="text-2xl font-bold text-blue-300">{mockStats.chalkboardSignups}</div>
              </div>
              <div className="text-center">
                <div className="text-blue-300/60 text-sm">Revenue</div>
                <div className="text-2xl font-bold text-blue-300">${mockStats.chalkboardRevenue.toLocaleString()}</div>
              </div>
              <div className="text-center">
                <div className="text-blue-300/60 text-sm">Commissions</div>
                <div className="text-2xl font-bold text-blue-300">${mockStats.chalkboardCommissions.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Representative Overview */}
        <div className="bg-gradient-to-br from-gray-900/40 to-black/40 border border-gray-500/20 rounded-lg backdrop-blur-sm">
          <div className="p-6 border-b border-gray-500/20">
            <h2 className="text-2xl font-bold text-white mb-2">Sales Representative Overview</h2>
            <p className="text-gray-400">Performance metrics for all active sales representatives</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-500/20">
                  <th className="text-left p-4 text-gray-300 font-mono text-sm">NAME</th>
                  <th className="text-left p-4 text-gray-300 font-mono text-sm">ROLE</th>
                  <th className="text-center p-4 text-gray-300 font-mono text-sm">SIGNUPS</th>
                  <th className="text-center p-4 text-gray-300 font-mono text-sm">EARNED</th>
                  <th className="text-center p-4 text-gray-300 font-mono text-sm">PAID</th>
                  <th className="text-center p-4 text-gray-300 font-mono text-sm">DUE</th>
                  <th className="text-center p-4 text-gray-300 font-mono text-sm">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {mockReps.map((rep) => (
                  <tr key={rep.id} className="border-b border-gray-500/10 hover:bg-gray-800/20 transition-colors">
                    <td className="p-4">
                      <div className="text-white font-medium">{rep.firstName} {rep.lastName}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-300">{rep.role}</div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="text-cyan-300 font-bold">{rep.totalSignups}</div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="text-green-300 font-bold">${rep.commissionsEarned.toLocaleString()}</div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="text-yellow-300 font-bold">${rep.commissionsPaid.toLocaleString()}</div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="text-red-300 font-bold">${rep.commissionsDue.toLocaleString()}</div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        rep.status === 'Active' 
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-300 border border-red-500/30'
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

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lead Acquisition Trends */}
          <div className="bg-gradient-to-br from-gray-900/40 to-black/40 border border-cyan-500/20 rounded-lg backdrop-blur-sm">
            <div className="p-6 border-b border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-300 mb-2">Lead Acquisition Trends</h3>
              <p className="text-cyan-300/60 text-sm">Weekly signup performance</p>
            </div>
            <div className="p-6">
              <div className="h-64 flex items-end justify-between space-x-2">
                {weeklySignups.map((signups, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-cyan-500 to-cyan-300 rounded-t-sm transition-all duration-500 hover:from-cyan-400 hover:to-cyan-200"
                      style={{ height: `${(signups / Math.max(...weeklySignups)) * 200}px` }}
                    ></div>
                    <div className="text-xs text-cyan-300/60 mt-2 font-mono">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </div>
                    <div className="text-xs text-cyan-300 font-bold">{signups}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Performance */}
          <div className="bg-gradient-to-br from-gray-900/40 to-black/40 border border-green-500/20 rounded-lg backdrop-blur-sm">
            <div className="p-6 border-b border-green-500/20">
              <h3 className="text-xl font-bold text-green-300 mb-2">Revenue Performance</h3>
              <p className="text-green-300/60 text-sm">Weekly revenue generation</p>
            </div>
            <div className="p-6">
              <div className="h-64 flex items-end justify-between space-x-2">
                {weeklyRevenue.map((revenue, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t-sm transition-all duration-500 hover:from-green-400 hover:to-green-200"
                      style={{ height: `${(revenue / Math.max(...weeklyRevenue)) * 200}px` }}
                    ></div>
                    <div className="text-xs text-green-300/60 mt-2 font-mono">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </div>
                    <div className="text-xs text-green-300 font-bold">${revenue}</div>
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