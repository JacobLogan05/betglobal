import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { users, signups, commissions, bonuses, payouts } from '@/lib/db/schema'
import { eq, desc, count, sum } from 'drizzle-orm'
import { UserButton } from '@clerk/nextjs'

export default async function Dashboard() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // Get or create user in database
  let user = await db.select().from(users).where(eq(users.clerkId, userId)).limit(1)
  
  if (user.length === 0) {
    // Create user if doesn't exist
    const clerkUser = await currentUser()
    if (clerkUser) {
      await db.insert(users).values({
        clerkId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        firstName: clerkUser.firstName || 'User',
        lastName: clerkUser.lastName || '',
        role: 'sales_rep'
      })
      user = await db.select().from(users).where(eq(users.clerkId, userId)).limit(1)
    }
  }

  const currentUserData = user[0]

  // Get dashboard stats
  const [signupStats, commissionStats, bonusStats, payoutStats] = await Promise.all([
    db.select({ count: count() }).from(signups).where(eq(signups.userId, currentUserData.id)),
    db.select({ total: sum(commissions.amount) }).from(commissions).where(eq(commissions.userId, currentUserData.id)),
    db.select({ total: sum(bonuses.amount) }).from(bonuses).where(eq(bonuses.userId, currentUserData.id)),
    db.select({ total: sum(payouts.totalAmount) }).from(payouts).where(eq(payouts.userId, currentUserData.id))
  ])

  // Get recent signups
  const recentSignups = await db
    .select()
    .from(signups)
    .where(eq(signups.userId, currentUserData.id))
    .orderBy(desc(signups.createdAt))
    .limit(5)

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>

      {/* Header */}
      <div className="relative z-10 border-b border-cyan-500/20 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              BET GLOBAL OS
            </h1>
            <div className="text-cyan-300/60 text-xs font-mono">
              [ NEURAL DASHBOARD ACTIVE ]
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-cyan-300">
                {currentUserData.firstName} {currentUserData.lastName}
              </div>
              <div className="text-xs text-purple-300/60 font-mono uppercase">
                {currentUserData.role}
              </div>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-300/60 text-sm font-mono">TOTAL SIGNUPS</p>
                <p className="text-3xl font-bold text-cyan-300">{signupStats[0]?.count || 0}</p>
              </div>
              <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                <span className="text-cyan-400 text-xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300/60 text-sm font-mono">COMMISSIONS</p>
                <p className="text-3xl font-bold text-purple-300">${commissionStats[0]?.total || '0.00'}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <span className="text-purple-400 text-xl">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-900/20 to-red-900/20 border border-pink-500/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-300/60 text-sm font-mono">BONUSES</p>
                <p className="text-3xl font-bold text-pink-300">${bonusStats[0]?.total || '0.00'}</p>
              </div>
              <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center">
                <span className="text-pink-400 text-xl">🎁</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300/60 text-sm font-mono">PAYOUTS</p>
                <p className="text-3xl font-bold text-green-300">${payoutStats[0]?.total || '0.00'}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="text-green-400 text-xl">💳</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gradient-to-br from-gray-900/40 to-black/40 border border-cyan-500/20 rounded-lg backdrop-blur-sm">
          <div className="p-6 border-b border-cyan-500/20">
            <h2 className="text-xl font-bold text-cyan-300 mb-2">Recent Signups</h2>
            <p className="text-cyan-300/60 text-sm font-mono">[ LATEST NEURAL CONNECTIONS ]</p>
          </div>
          <div className="p-6">
            {recentSignups.length > 0 ? (
              <div className="space-y-4">
                {recentSignups.map((signup) => (
                  <div key={signup.id} className="flex items-center justify-between p-4 bg-cyan-900/10 border border-cyan-500/20 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{signup.customerName || 'Anonymous User'}</p>
                      <p className="text-cyan-300/60 text-sm font-mono">{signup.platform.toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-cyan-300">{new Date(signup.signupDate).toLocaleDateString()}</p>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-mono ${
                        signup.status === 'qualified' ? 'bg-green-500/20 text-green-300' :
                        signup.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {signup.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-cyan-300/40 text-6xl mb-4">🔌</div>
                <p className="text-cyan-300/60 font-mono">[ NO NEURAL CONNECTIONS DETECTED ]</p>
                <p className="text-cyan-300/40 text-sm mt-2">Start adding signups to see activity here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}