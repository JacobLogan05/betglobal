import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET - Fetch single sales rep
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const rep = await db.select().from(users).where(eq(users.id, params.id)).limit(1);
    
    if (rep.length === 0) {
      return NextResponse.json({ error: 'Sales rep not found' }, { status: 404 });
    }

    // Transform database record to match frontend interface
    const transformedRep = {
      id: rep[0].id,
      firstName: rep[0].firstName,
      lastName: rep[0].lastName,
      email: rep[0].email,
      phone: rep[0].phone || '',
      role: rep[0].role,
      totalSignups: rep[0].totalSignups,
      bovadaSignups: rep[0].bovadaSignups,
      chalkboardSignups: rep[0].chalkboardSignups,
      commissionsEarned: parseFloat(rep[0].commissionsEarned),
      commissionsPaid: parseFloat(rep[0].commissionsPaid),
      commissionsDue: parseFloat(rep[0].commissionsDue),
      status: rep[0].status,
      joinDate: rep[0].hireDate?.toISOString().split('T')[0] || '',
      lastActivity: rep[0].lastActivity?.toISOString().split('T')[0] || '',
      notes: rep[0].notes || ''
    };

    return NextResponse.json(transformedRep);
  } catch (error) {
    console.error('Error fetching sales rep:', error);
    return NextResponse.json({ error: 'Failed to fetch sales rep' }, { status: 500 });
  }
}

// PUT - Update sales rep
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const updatedRep = await db.update(users)
      .set({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        role: body.role,
        totalSignups: body.totalSignups,
        bovadaSignups: body.bovadaSignups,
        chalkboardSignups: body.chalkboardSignups,
        commissionsEarned: body.commissionsEarned?.toString(),
        commissionsPaid: body.commissionsPaid?.toString(),
        commissionsDue: body.commissionsDue?.toString(),
        status: body.status,
        notes: body.notes,
        lastActivity: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(users.id, params.id))
      .returning();

    if (updatedRep.length === 0) {
      return NextResponse.json({ error: 'Sales rep not found' }, { status: 404 });
    }

    return NextResponse.json(updatedRep[0]);
  } catch (error) {
    console.error('Error updating sales rep:', error);
    return NextResponse.json({ error: 'Failed to update sales rep' }, { status: 500 });
  }
}

// DELETE - Delete sales rep
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedRep = await db.delete(users)
      .where(eq(users.id, params.id))
      .returning();

    if (deletedRep.length === 0) {
      return NextResponse.json({ error: 'Sales rep not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Sales rep deleted successfully' });
  } catch (error) {
    console.error('Error deleting sales rep:', error);
    return NextResponse.json({ error: 'Failed to delete sales rep' }, { status: 500 });
  }
}