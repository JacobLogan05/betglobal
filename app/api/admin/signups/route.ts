import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { users, signups, commissions } from '@/lib/db/schema'
import { eq, desc, and, like, sql, count } from 'drizzle-orm'

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

    const { searchParams } = new URL(request.url)
    const repId = searchParams.get('repId')
    const platform = searchParams.get('platform')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = (page - 1) * limit

    // Build the query conditions
    let whereConditions = []
    
    if (repId) {
      whereConditions.push(eq(signups.userId, repId))
    }
    
    if (platform) {
      whereConditions.push(eq(signups.platform, platform as 'bovada' | 'chalkboard'))
    }
    
    if (status) {
      whereConditions.push(eq(signups.status, status as 'pending' | 'qualified' | 'rejected'))
    }
    
    if (search) {
      whereConditions.push(
        sql`(${signups.customerName} ILIKE ${`%${search}%`} OR ${signups.customerEmail} ILIKE ${`%${search}%`})`
      )
    }

    // Get signups with sales rep information
    const signupsQuery = db
      .select({
        id: signups.id,
        userId: signups.userId,
        platform: signups.platform,
        status: signups.status,
        signupDate: signups.signupDate,
        qualificationDate: signups.qualificationDate,
        customerEmail: signups.customerEmail,
        customerName: signups.customerName,
        depositAmount: signups.depositAmount,
        notes: signups.notes,
        createdAt: signups.createdAt,
        updatedAt: signups.updatedAt,
        repFirstName: users.firstName,
        repLastName: users.lastName,
        repEmail: users.email,
      })
      .from(signups)
      .leftJoin(users, eq(signups.userId, users.id))
      .orderBy(desc(signups.createdAt))
      .limit(limit)
      .offset(offset)

    // Apply where conditions if any
    if (whereConditions.length > 0) {
      signupsQuery.where(and(...whereConditions))
    }

    const signupsData = await signupsQuery

    // Get total count for pagination
    const totalCountResult = whereConditions.length > 0
      ? await db.select({ count: count() }).from(signups).where(and(...whereConditions))
      : await db.select({ count: count() }).from(signups)
    const totalCount = totalCountResult[0].count

    // Get KPI data
    const kpiData = await db
      .select({
        totalSignups: count(),
        qualifiedSignups: count(sql`CASE WHEN ${signups.status} = 'qualified' THEN 1 END`),
        pendingSignups: count(sql`CASE WHEN ${signups.status} = 'pending' THEN 1 END`),
        rejectedSignups: count(sql`CASE WHEN ${signups.status} = 'rejected' THEN 1 END`),
        bovadaSignups: count(sql`CASE WHEN ${signups.platform} = 'bovada' THEN 1 END`),
        chalkboardSignups: count(sql`CASE WHEN ${signups.platform} = 'chalkboard' THEN 1 END`),
        totalDeposits: sql<string>`COALESCE(SUM(CAST(${signups.depositAmount} AS DECIMAL)), 0)`,
      })
      .from(signups)

    // Transform the data
    const transformedSignups = signupsData.map(signup => ({
      id: signup.id,
      userId: signup.userId,
      platform: signup.platform,
      status: signup.status,
      signupDate: signup.signupDate,
      qualificationDate: signup.qualificationDate,
      customerEmail: signup.customerEmail,
      customerName: signup.customerName,
      depositAmount: signup.depositAmount,
      notes: signup.notes,
      createdAt: signup.createdAt,
      updatedAt: signup.updatedAt,
      repName: `${signup.repFirstName} ${signup.repLastName}`,
      repEmail: signup.repEmail,
    }))

    return NextResponse.json({
      signups: transformedSignups,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
      kpis: kpiData[0],
    })

  } catch (error) {
    console.error('Error fetching signups:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
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

    const { signupId, status, notes } = await request.json()

    if (!signupId || !status) {
      return NextResponse.json({ error: 'Signup ID and status are required' }, { status: 400 })
    }

    // Update the signup
    const updatedSignup = await db
      .update(signups)
      .set({
        status: status as 'pending' | 'qualified' | 'rejected',
        notes: notes || null,
        qualificationDate: status === 'qualified' ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(signups.id, signupId))
      .returning()

    if (updatedSignup.length === 0) {
      return NextResponse.json({ error: 'Signup not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      signup: updatedSignup[0],
      message: `Signup status updated to ${status}`,
    })

  } catch (error) {
    console.error('Error updating signup:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}