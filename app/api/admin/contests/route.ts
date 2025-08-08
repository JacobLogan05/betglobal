import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { users, contests } from '@/lib/db/schema'
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

    // Fetch all contests
    const allContests = await db
      .select()
      .from(contests)
      .orderBy(desc(contests.createdAt))

    return NextResponse.json({ contests: allContests })

  } catch (error) {
    console.error('Error fetching contests:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}