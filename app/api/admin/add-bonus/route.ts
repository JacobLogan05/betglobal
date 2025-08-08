import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { users, bonuses, signups } from '@/lib/db/schema'
import { eq, and, count } from 'drizzle-orm'

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

    const { repId, type, amount, description, milestone } = await request.json()

    if (!repId || !type || !amount || !description) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Verify the rep exists
    const rep = await db.select().from(users).where(eq(users.id, repId)).limit(1)
    
    if (rep.length === 0) {
      return NextResponse.json({ error: 'Sales rep not found' }, { status: 404 })
    }

    // For milestone bonuses, verify the rep has reached the milestone
    if (type === 'milestone' && milestone) {
      const repSignupCount = await db
        .select({ count: count() })
        .from(signups)
        .where(and(
          eq(signups.userId, repId),
          eq(signups.status, 'qualified')
        ))

      if (repSignupCount[0].count < milestone) {
        return NextResponse.json({ 
          error: `Rep has only ${repSignupCount[0].count} signups, but milestone requires ${milestone}` 
        }, { status: 400 })
      }

      // Check if this milestone bonus has already been awarded
      const existingMilestoneBonus = await db
        .select()
        .from(bonuses)
        .where(and(
          eq(bonuses.userId, repId),
          eq(bonuses.type, 'milestone'),
          eq(bonuses.milestone, milestone)
        ))
        .limit(1)

      if (existingMilestoneBonus.length > 0) {
        return NextResponse.json({ 
          error: `Milestone bonus for ${milestone} signups has already been awarded to this rep` 
        }, { status: 400 })
      }
    }

    // Create the bonus record
    const newBonus = await db.insert(bonuses).values({
      userId: repId,
      type: type as 'milestone' | 'contest' | 'first_signup',
      amount: amount.toString(),
      description,
      milestone: milestone || null
    }).returning()

    return NextResponse.json({ 
      success: true, 
      bonus: newBonus[0],
      message: `${type} bonus of $${amount} awarded successfully!`
    })

  } catch (error) {
    console.error('Error adding bonus:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}