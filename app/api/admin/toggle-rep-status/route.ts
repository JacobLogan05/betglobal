import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
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

    const { repId, isActive } = await request.json()

    if (!repId || typeof isActive !== 'boolean') {
      return NextResponse.json({ error: 'Rep ID and status are required' }, { status: 400 })
    }

    // Update rep status
    const updatedRep = await db
      .update(users)
      .set({ 
        isActive,
        updatedAt: new Date()
      })
      .where(eq(users.id, repId))
      .returning()

    if (updatedRep.length === 0) {
      return NextResponse.json({ error: 'Sales rep not found' }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true, 
      rep: updatedRep[0],
      message: `Rep ${isActive ? 'activated' : 'deactivated'} successfully`
    })

  } catch (error) {
    console.error('Error toggling rep status:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}