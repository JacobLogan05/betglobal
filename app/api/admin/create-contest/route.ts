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

    const { name, description, startDate, endDate, prizeDescription, prizeValue } = await request.json()

    if (!name || !description || !startDate || !endDate || !prizeDescription || !prizeValue) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Validate dates
    const start = new Date(startDate)
    const end = new Date(endDate)
    const now = new Date()

    if (start >= end) {
      return NextResponse.json({ error: 'End date must be after start date' }, { status: 400 })
    }

    if (end <= now) {
      return NextResponse.json({ error: 'End date must be in the future' }, { status: 400 })
    }

    // Create the contest
    const newContest = await db.insert(contests).values({
      name,
      description,
      startDate: start,
      endDate: end,
      prizeDescription,
      prizeValue: prizeValue.toString(),
      isActive: true
    }).returning()

    return NextResponse.json({ 
      success: true, 
      contest: newContest[0],
      message: 'Contest created successfully!'
    })

  } catch (error) {
    console.error('Error creating contest:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}