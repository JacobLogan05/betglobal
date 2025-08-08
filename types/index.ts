// User types
export type UserRole = 'sales_rep' | 'admin' | 'finance' | 'manager';

export interface User {
  id: string;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  hireDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Platform and signup types
export type Platform = 'bovada' | 'chalkboard';
export type SignupStatus = 'pending' | 'qualified' | 'rejected';

export interface Signup {
  id: string;
  userId: string;
  platform: Platform;
  status: SignupStatus;
  signupDate: Date;
  qualificationDate: Date | null;
  customerEmail: string | null;
  customerName: string | null;
  depositAmount: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Commission types
export interface Commission {
  id: string;
  signupId: string;
  userId: string;
  platform: Platform;
  amount: string;
  isFirstSignup: boolean;
  createdAt: Date;
}

// Bonus types
export type BonusType = 'milestone' | 'contest' | 'first_signup';

export interface Bonus {
  id: string;
  userId: string;
  type: BonusType;
  amount: string;
  description: string;
  milestone: number | null;
  contestId: string | null;
  createdAt: Date;
}

// Contest types
export interface Contest {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  prizeDescription: string;
  prizeValue: string | null;
  isActive: boolean;
  createdAt: Date;
}

// Payout types
export type PayoutStatus = 'pending' | 'paid' | 'processing';

export interface Payout {
  id: string;
  userId: string;
  commissionAmount: string;
  bonusAmount: string;
  totalAmount: string;
  status: PayoutStatus;
  payoutDate: Date | null;
  notes: string | null;
  processedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard analytics types
export interface RepPerformance {
  userId: string;
  user: User;
  totalSignups: number;
  qualifiedSignups: number;
  conversionRate: number;
  totalCommissions: string;
  totalBonuses: string;
  totalEarnings: string;
  pendingPayouts: string;
  bovadaSignups: number;
  chalkboardSignups: number;
}

export interface SystemAnalytics {
  totalReps: number;
  activeReps: number;
  totalSignups: number;
  qualifiedSignups: number;
  totalRevenue: string;
  totalCommissions: string;
  totalBonuses: string;
  pendingPayouts: string;
  bovadaStats: {
    signups: number;
    revenue: string;
  };
  chalkboardStats: {
    signups: number;
    revenue: string;
  };
}

// Form types for data entry
export interface SignupFormData {
  platform: Platform;
  customerEmail?: string;
  customerName?: string;
  depositAmount?: string;
  notes?: string;
}

export interface PayoutFormData {
  userId: string;
  commissionAmount: string;
  bonusAmount: string;
  notes?: string;
}

export interface ContestFormData {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  prizeDescription: string;
  prizeValue?: string;
}