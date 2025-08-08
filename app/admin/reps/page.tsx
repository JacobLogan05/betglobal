import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import DashboardLayout from '@/app/components/DashboardLayout'
import SalesRepKPIs from '@/app/components/SalesRepKPIs'
import HallOfFame from '@/app/components/HallOfFame'
import SalesRepList from '@/app/components/SalesRepList'
import AddSalesRepForm from '@/app/components/AddSalesRepForm'
import { 
  TrophyIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  SparklesIcon,
  BoltIcon,
  StarIcon,
  FireIcon
} from '@heroicons/react/24/outline'

export default async function SalesRepsPage() {
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
    }
  } catch (error) {
    console.log('Database connection issue, using default user data:', error)
  }

  // Mock sales rep data with string IDs for SalesRepList
  const mockSalesReps = [
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
      status: 'Active' as const,
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
      status: 'Active' as const,
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
      status: 'Active' as const,
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
      status: 'Active' as const,
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
      status: 'Active' as const,
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
      status: 'Inactive' as const,
      joinDate: '2023-11-15',
      lastActivity: '2024-03-01',
      notes: 'On temporary leave'
    }
  ]

  // Calculate KPIs
  const totalReps = mockSalesReps.length
  const activeReps = mockSalesReps.filter(rep => rep.status === 'Active').length
  const totalSignups = mockSalesReps.reduce((sum, rep) => sum + rep.totalSignups, 0)
  const totalCommissionsEarned = mockSalesReps.reduce((sum, rep) => sum + rep.commissionsEarned, 0)
  const totalCommissionsPaid = mockSalesReps.reduce((sum, rep) => sum + rep.commissionsPaid, 0)
  const totalCommissionsDue = mockSalesReps.reduce((sum, rep) => sum + rep.commissionsDue, 0)

  // Top performer for Hall of Fame (convert to number ID for HallOfFame component)
  const topPerformer = mockSalesReps.reduce((top, rep) => 
    rep.totalSignups > top.totalSignups ? rep : top
  )
  
  const hallOfFameRepFormatted = {
    ...topPerformer,
    id: parseInt(topPerformer.id) // Convert string ID to number for HallOfFame
  }

  return (
    <DashboardLayout currentUser={currentUserData}>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <UserGroupIcon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-100 to-blue-200 bg-clip-text text-transparent tracking-tight">
                      Elite Sales Force
                    </h1>
                    <p className="text-xl text-gray-400 mt-2 font-light">
                      Manage your <span className="text-white font-medium">world-class</span> sales representatives
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-sm text-gray-300 font-medium">{activeReps} Active Representatives</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-gray-300 font-medium">{totalSignups} Total Signups</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <TrophyIcon className="h-16 w-16 text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                  <UserGroupIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-blue-400 text-sm font-medium">Team</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">{totalReps}</div>
                <div className="text-sm text-gray-400 font-medium">Total Representatives</div>
                <div className="text-xs text-blue-400">{activeReps} currently active</div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
                  <ChartBarIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-green-400 text-sm font-medium">+18.5%</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">{totalSignups.toLocaleString()}</div>
                <div className="text-sm text-gray-400 font-medium">Total Signups</div>
                <div className="text-xs text-green-400">Collective performance</div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
                  <SparklesIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-purple-400 text-sm font-medium">Earned</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">${totalCommissionsEarned.toLocaleString()}</div>
                <div className="text-sm text-gray-400 font-medium">Total Commissions</div>
                <div className="text-xs text-purple-400">Team earnings</div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-xl flex items-center justify-center shadow-lg">
                  <BoltIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-orange-400 text-sm font-medium">Pending</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">${totalCommissionsDue.toLocaleString()}</div>
                <div className="text-sm text-gray-400 font-medium">Outstanding</div>
                <div className="text-xs text-orange-400">Awaiting payment</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hall of Fame Section */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
          <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
                  <TrophyIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Hall of Fame</h2>
                  <p className="text-gray-400 text-lg">Celebrating our top performer</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">This Month's Champion</div>
                <div className="text-2xl font-bold text-yellow-400">{topPerformer.totalSignups} Signups</div>
              </div>
            </div>
            <HallOfFame rep={hallOfFameRepFormatted} />
          </div>
        </div>

        {/* Add New Representative */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
          <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-xl">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center shadow-lg">
                <SparklesIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Recruit New Talent</h2>
                <p className="text-gray-400 text-lg">Expand your elite sales force</p>
              </div>
            </div>
            <AddSalesRepForm />
          </div>
        </div>

        {/* Sales Representatives List */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
          <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl overflow-hidden">
            <div className="p-10 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-xl flex items-center justify-center shadow-lg">
                    <FireIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Sales Force Directory</h2>
                    <p className="text-gray-400 text-lg">Complete team overview and management</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Active Members</div>
                  <div className="text-3xl font-bold text-white">{activeReps}/{totalReps}</div>
                </div>
              </div>
            </div>
            <div className="p-10">
              <SalesRepList salesReps={mockSalesReps} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}