import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET - Fetch all sales reps
export async function GET() {
  try {
    console.log('Fetching sales reps from database...');
    const salesReps = await db.select().from(users);
    console.log('Raw database results:', salesReps);
    
    // Transform database records to match frontend interface
    const transformedReps = salesReps.map(rep => ({
      id: rep.id,
      firstName: rep.firstName,
      lastName: rep.lastName,
      email: rep.email,
      phone: rep.phone || '',
      role: rep.role,
      totalSignups: rep.totalSignups,
      bovadaSignups: rep.bovadaSignups,
      chalkboardSignups: rep.chalkboardSignups,
      commissionsEarned: parseFloat(rep.commissionsEarned),
      commissionsPaid: parseFloat(rep.commissionsPaid),
      commissionsDue: parseFloat(rep.commissionsDue),
      status: rep.status,
      joinDate: rep.hireDate?.toISOString().split('T')[0] || '',
      lastActivity: rep.lastActivity?.toISOString().split('T')[0] || '',
      notes: rep.notes || ''
    }));

    console.log('Transformed results:', transformedReps);
    return NextResponse.json(transformedReps);
  } catch (error) {
    console.error('Error fetching sales reps:', error);
    return NextResponse.json({ error: 'Failed to fetch sales reps' }, { status: 500 });
  }
}

// POST - Create new sales rep
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Creating new sales rep with data:', body);
    
    // Map frontend role values to database enum values
    const roleMapping: { [key: string]: 'sales_rep' | 'admin' | 'finance' | 'manager' } = {
      'Sales Rep': 'sales_rep',
      'Junior Sales Rep': 'sales_rep',
      'Senior Sales Rep': 'sales_rep',
      'Admin': 'admin',
      'Finance': 'finance',
      'Manager': 'manager'
    };
    
    const dbRole = roleMapping[body.role] || 'sales_rep';
    
    const newRep = await db.insert(users).values({
      clerkId: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Temporary ID
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      role: dbRole,
      totalSignups: body.totalSignups || 0,
      bovadaSignups: body.bovadaSignups || 0,
      chalkboardSignups: body.chalkboardSignups || 0,
      commissionsEarned: body.commissionsEarned?.toString() || '0',
      commissionsPaid: body.commissionsPaid?.toString() || '0',
      commissionsDue: body.commissionsDue?.toString() || '0',
      status: body.status || 'Active',
      notes: body.notes,
      hireDate: body.joinDate ? new Date(body.joinDate) : new Date(),
      lastActivity: body.lastActivity ? new Date(body.lastActivity) : new Date(),
    }).returning();

    console.log('Created new sales rep:', newRep[0]);
    return NextResponse.json(newRep[0]);
  } catch (error) {
    console.error('Error creating sales rep:', error);
    return NextResponse.json({ error: 'Failed to create sales rep' }, { status: 500 });
  }
}