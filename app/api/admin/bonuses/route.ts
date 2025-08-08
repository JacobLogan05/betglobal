import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { users, bonuses } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

export async function GET(request: NextRequest) {
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

    // Fetch recent bonuses with user information
    const recentBonuses = await db
      .select({
        id: bonuses.id,
        type: bonuses.type,
        amount: bonuses.amount,
        description: bonuses.description,
        milestone: bonuses.milestone,
        createdAt: bonuses.createdAt,
        repName: users.firstName,
        repLastName: users.lastName,
        repEmail: users.email
      })
      .from(bonuses)
      .leftJoin(users, eq(bonuses.userId, users.id))
      .orderBy(desc(bonuses.createdAt))
      .limit(10)

    return NextResponse.json({ bonuses: recentBonuses })

  } catch (error) {
    console.error('Error fetching bonuses:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}