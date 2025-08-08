import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { users, contests } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
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

    const { contestId, isActive } = await request.json()

    if (!contestId || typeof isActive !== 'boolean') {
      return NextResponse.json({ error: 'Contest ID and status are required' }, { status: 400 })
    }

    // Update contest status
    const updatedContest = await db
      .update(contests)
      .set({ isActive })
      .where(eq(contests.id, contestId))
      .returning()

    if (updatedContest.length === 0) {
      return NextResponse.json({ error: 'Contest not found' }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true, 
      contest: updatedContest[0],
      message: `Contest ${isActive ? 'activated' : 'deactivated'} successfully!`
    })

  } catch (error) {
    console.error('Error toggling contest status:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}