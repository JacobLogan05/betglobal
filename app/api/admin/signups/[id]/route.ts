import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { users, signups, commissions } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
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

    // Get signup with sales rep information
    const signupData = await db
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
      .where(eq(signups.id, params.id))
      .limit(1)

    if (signupData.length === 0) {
      return NextResponse.json({ error: 'Signup not found' }, { status: 404 })
    }

    const signup = signupData[0]

    // Get commission information for this signup
    const commissionData = await db
      .select()
      .from(commissions)
      .where(eq(commissions.signupId, params.id))
      .limit(1)

    const transformedSignup = {
      ...signup,
      repName: `${signup.repFirstName} ${signup.repLastName}`,
      commission: commissionData.length > 0 ? commissionData[0] : null,
    }

    return NextResponse.json({ signup: transformedSignup })

  } catch (error) {
    console.error('Error fetching signup:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
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

    const { 
      status, 
      customerName, 
      customerEmail, 
      depositAmount, 
      notes 
    } = await request.json()

    // Update the signup
    const updatedSignup = await db
      .update(signups)
      .set({
        status: status || undefined,
        customerName: customerName !== undefined ? customerName : undefined,
        customerEmail: customerEmail !== undefined ? customerEmail : undefined,
        depositAmount: depositAmount !== undefined ? depositAmount?.toString() : undefined,
        notes: notes !== undefined ? notes : undefined,
        qualificationDate: status === 'qualified' ? new Date() : undefined,
        updatedAt: new Date(),
      })
      .where(eq(signups.id, params.id))
      .returning()

    if (updatedSignup.length === 0) {
      return NextResponse.json({ error: 'Signup not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      signup: updatedSignup[0],
      message: 'Signup updated successfully',
    })

  } catch (error) {
    console.error('Error updating signup:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
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

    // First, delete any associated commissions
    await db.delete(commissions).where(eq(commissions.signupId, params.id))

    // Then delete the signup
    const deletedSignup = await db
      .delete(signups)
      .where(eq(signups.id, params.id))
      .returning()

    if (deletedSignup.length === 0) {
      return NextResponse.json({ error: 'Signup not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Signup deleted successfully',
    })

  } catch (error) {
    console.error('Error deleting signup:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}