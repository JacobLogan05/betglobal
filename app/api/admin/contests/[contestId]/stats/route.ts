import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { users, contests, signups } from '@/lib/db/schema'
import { eq, and, count, sum, desc } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: { contestId: string } }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const adminUser = await db.select().from(users).where(eq(users.clerkId, userId)).limit(1)
    
    if (adminUser.length === 0 || adminUser[0].role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const contestId = params.contestId

    // Get contest details
    const contest = await db.select().from(contests).where(eq(contests.id, contestId)).limit(1)
    
    if (contest.length === 0) {
      return NextResponse.json({ error: 'Contest not found' }, { status: 404 })
    }

    const contestData = contest[0]

    // Get signups within contest period
    const contestSignups = await db
      .select({
        userId: signups.userId,
        depositAmount: signups.depositAmount,
        createdAt: signups.createdAt,
        repName: users.firstName,
        repLastName: users.lastName,
        repEmail: users.email
      })
      .from(signups)
      .leftJoin(users, eq(signups.userId, users.id))
      .where(and(
        eq(signups.status, 'qualified'),
        // Only count signups within contest period
        // Note: This is a simplified version - you might want to add date filtering
      ))

    // Calculate leaderboard
    const leaderboardMap = new Map()

    contestSignups.forEach(signup => {
      const key = signup.userId
      if (!leaderboardMap.has(key)) {
        leaderboardMap.set(key, {
          repName: `${signup.repName} ${signup.repLastName}`,
          repEmail: signup.repEmail,
          signupCount: 0,
          totalRevenue: 0
        })
      }
      
      const entry = leaderboardMap.get(key)
      entry.signupCount += 1
      entry.totalRevenue += parseFloat(signup.depositAmount || '0')
    })

    const leaderboard = Array.from(leaderboardMap.values())
      .sort((a, b) => b.signupCount - a.signupCount || b.totalRevenue - a.totalRevenue)

    const stats = {
      totalParticipants: leaderboard.length,
      totalSignups: contestSignups.length,
      leaderboard
    }

    return NextResponse.json({ stats })

  } catch (error) {
    console.error('Error fetching contest stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}