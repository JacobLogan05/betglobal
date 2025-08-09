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

    const { 
      email, 
      firstName, 
      lastName, 
      phone, 
      role = 'sales_rep',
      totalSignups = 0,
      bovadaSignups = 0,
      chalkboardSignups = 0,
      commissionsEarned = 0,
      commissionsPaid = 0,
      commissionsDue = 0,
      status = 'Active',
      notes,
      joinDate,
      lastActivity
    } = await request.json()

    if (!email || !firstName || !lastName) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)
    
    if (existingUser.length > 0) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 })
    }

    // Create new sales rep (without Clerk ID since they haven't signed up yet)
    const newRep = await db.insert(users).values({
      clerkId: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Temporary ID
      email,
      firstName,
      lastName,
      phone,
      role: role as 'sales_rep' | 'admin' | 'finance' | 'manager',
      totalSignups,
      bovadaSignups,
      chalkboardSignups,
      commissionsEarned: commissionsEarned.toString(),
      commissionsPaid: commissionsPaid.toString(),
      commissionsDue: commissionsDue.toString(),
      status,
      notes,
      hireDate: joinDate ? new Date(joinDate) : new Date(),
      lastActivity: lastActivity ? new Date(lastActivity) : new Date(),
      isActive: true
    }).returning()

    return NextResponse.json({ 
      success: true, 
      rep: newRep[0],
      message: 'Sales rep created successfully. They can now sign up using this email address.'
    })

  } catch (error) {
    console.error('Error creating rep:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}