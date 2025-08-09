import { db, users } from '@/lib/db';

const initialSalesReps = [
  {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@betglobal.com',
    phone: '+1 (555) 123-4567',
    role: 'sales_rep' as const,
    totalSignups: 45,
    bovadaSignups: 28,
    chalkboardSignups: 17,
    commissionsEarned: '1800',
    commissionsPaid: '1200',
    commissionsDue: '600',
    status: 'Active',
    notes: 'Top performer this quarter',
    hireDate: new Date('2024-01-15'),
    lastActivity: new Date('2024-03-15'),
  },
  {
    firstName: 'Mike',
    lastName: 'Chen',
    email: 'mike.chen@betglobal.com',
    phone: '+1 (555) 234-5678',
    role: 'sales_rep' as const,
    totalSignups: 38,
    bovadaSignups: 23,
    chalkboardSignups: 15,
    commissionsEarned: '1520',
    commissionsPaid: '1000',
    commissionsDue: '520',
    status: 'Active',
    notes: 'Consistent performance',
    hireDate: new Date('2024-02-01'),
    lastActivity: new Date('2024-03-14'),
  },
  {
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@betglobal.com',
    phone: '+1 (555) 345-6789',
    role: 'sales_rep' as const,
    totalSignups: 52,
    bovadaSignups: 31,
    chalkboardSignups: 21,
    commissionsEarned: '2080',
    commissionsPaid: '1500',
    commissionsDue: '580',
    status: 'Active',
    notes: 'Excellent closer',
    hireDate: new Date('2023-12-10'),
    lastActivity: new Date('2024-03-15'),
  },
  {
    firstName: 'David',
    lastName: 'Thompson',
    email: 'david.thompson@betglobal.com',
    phone: '+1 (555) 456-7890',
    role: 'sales_rep' as const,
    totalSignups: 29,
    bovadaSignups: 18,
    chalkboardSignups: 11,
    commissionsEarned: '1160',
    commissionsPaid: '800',
    commissionsDue: '360',
    status: 'Active',
    notes: 'Improving steadily',
    hireDate: new Date('2024-02-20'),
    lastActivity: new Date('2024-03-13'),
  },
  {
    firstName: 'Jessica',
    lastName: 'Williams',
    email: 'jessica.williams@betglobal.com',
    phone: '+1 (555) 567-8901',
    role: 'sales_rep' as const,
    totalSignups: 41,
    bovadaSignups: 25,
    chalkboardSignups: 16,
    commissionsEarned: '1640',
    commissionsPaid: '1100',
    commissionsDue: '540',
    status: 'Active',
    notes: 'Strong relationship builder',
    hireDate: new Date('2024-01-08'),
    lastActivity: new Date('2024-03-15'),
  },
  {
    firstName: 'Alex',
    lastName: 'Martinez',
    email: 'alex.martinez@betglobal.com',
    phone: '+1 (555) 678-9012',
    role: 'sales_rep' as const,
    totalSignups: 33,
    bovadaSignups: 21,
    chalkboardSignups: 12,
    commissionsEarned: '1320',
    commissionsPaid: '900',
    commissionsDue: '420',
    status: 'Inactive',
    notes: 'On temporary leave',
    hireDate: new Date('2023-11-15'),
    lastActivity: new Date('2024-03-01'),
  }
];

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    
    // Clear existing data
    await db.delete(users);
    console.log('Cleared existing sales reps');
    
    // Insert initial data
    const insertedReps = await db.insert(users).values(initialSalesReps).returning();
    console.log(`Inserted ${insertedReps.length} sales reps`);
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase();