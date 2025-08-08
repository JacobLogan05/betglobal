import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { users, signups, commissions } from '@/lib/db/schema'
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

    const { repId, platform, customerName, customerEmail, depositAmount, notes } = await request.json()

    if (!repId || !platform) {
      return NextResponse.json({ error: 'Rep and platform are required' }, { status: 400 })
    }

    // Verify the rep exists
    const rep = await db.select().from(users).where(eq(users.id, repId)).limit(1)
    
    if (rep.length === 0) {
      return NextResponse.json({ error: 'Sales rep not found' }, { status: 404 })
    }

    // Create the signup
    const newSignup = await db.insert(signups).values({
      userId: repId,
      platform: platform as 'bovada' | 'chalkboard',
      status: 'qualified', // All admin-entered signups are qualified
      customerName: customerName || null,
      customerEmail: customerEmail || null,
      depositAmount: depositAmount ? depositAmount.toString() : null,
      notes: notes || null,
      qualificationDate: new Date()
    }).returning()

    // Calculate commission based on platform and if it's first signup
    let commissionAmount = 0
    let isFirstSignup = false

    if (platform === 'bovada') {
      // Check if this is the rep's first Bovada signup
      const bovadaSignupCount = await db
        .select({ count: count() })
        .from(signups)
        .where(and(
          eq(signups.userId, repId),
          eq(signups.platform, 'bovada'),
          eq(signups.status, 'qualified')
        ))

      isFirstSignup = bovadaSignupCount[0].count === 1 // This is their first (just added)
      commissionAmount = isFirstSignup ? 80 : 40
    } else if (platform === 'chalkboard') {
      commissionAmount = 30
    }

    // Create the commission record
    await db.insert(commissions).values({
      signupId: newSignup[0].id,
      userId: repId,
      platform: platform as 'bovada' | 'chalkboard',
      amount: commissionAmount.toString(),
      isFirstSignup
    })

    return NextResponse.json({ 
      success: true, 
      signup: newSignup[0],
      commission: commissionAmount,
      isFirstSignup,
      message: `Signup added successfully! Commission: $${commissionAmount}${isFirstSignup ? ' (First Bovada signup bonus!)' : ''}`
    })

  } catch (error) {
    console.error('Error adding signup:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}