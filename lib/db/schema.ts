import { pgTable, text, integer, decimal, timestamp, boolean, uuid, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['sales_rep', 'admin', 'finance', 'manager']);
export const platformEnum = pgEnum('platform', ['bovada', 'chalkboard']);
export const signupStatusEnum = pgEnum('signup_status', ['pending', 'qualified', 'rejected']);
export const bonusTypeEnum = pgEnum('bonus_type', ['milestone', 'contest', 'first_signup']);
export const payoutStatusEnum = pgEnum('payout_status', ['pending', 'paid', 'processing']);

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: text('clerk_id').unique().notNull(),
  email: text('email').unique().notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  role: userRoleEnum('role').notNull().default('sales_rep'),
  isActive: boolean('is_active').notNull().default(true),
  hireDate: timestamp('hire_date').defaultNow(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Signups table
export const signups = pgTable('signups', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  platform: platformEnum('platform').notNull(),
  status: signupStatusEnum('status').notNull().default('pending'),
  signupDate: timestamp('signup_date').defaultNow().notNull(),
  qualificationDate: timestamp('qualification_date'),
  customerEmail: text('customer_email'),
  customerName: text('customer_name'),
  depositAmount: decimal('deposit_amount', { precision: 10, scale: 2 }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Commissions table
export const commissions = pgTable('commissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  signupId: uuid('signup_id').references(() => signups.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  platform: platformEnum('platform').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  isFirstSignup: boolean('is_first_signup').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Bonuses table
export const bonuses = pgTable('bonuses', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  type: bonusTypeEnum('type').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  description: text('description').notNull(),
  milestone: integer('milestone'), // For milestone bonuses (10, 100, etc.)
  contestId: uuid('contest_id'), // For contest bonuses
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Contests table
export const contests = pgTable('contests', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  prizeDescription: text('prize_description').notNull(),
  prizeValue: decimal('prize_value', { precision: 10, scale: 2 }),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Payouts table
export const payouts = pgTable('payouts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  commissionAmount: decimal('commission_amount', { precision: 10, scale: 2 }).notNull().default('0'),
  bonusAmount: decimal('bonus_amount', { precision: 10, scale: 2 }).notNull().default('0'),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  status: payoutStatusEnum('status').notNull().default('pending'),
  payoutDate: timestamp('payout_date'),
  notes: text('notes'),
  processedBy: uuid('processed_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  signups: many(signups),
  commissions: many(commissions),
  bonuses: many(bonuses),
  payouts: many(payouts),
}));

export const signupsRelations = relations(signups, ({ one, many }) => ({
  user: one(users, {
    fields: [signups.userId],
    references: [users.id],
  }),
  commissions: many(commissions),
}));

export const commissionsRelations = relations(commissions, ({ one }) => ({
  signup: one(signups, {
    fields: [commissions.signupId],
    references: [signups.id],
  }),
  user: one(users, {
    fields: [commissions.userId],
    references: [users.id],
  }),
}));

export const bonusesRelations = relations(bonuses, ({ one }) => ({
  user: one(users, {
    fields: [bonuses.userId],
    references: [users.id],
  }),
}));

export const payoutsRelations = relations(payouts, ({ one }) => ({
  user: one(users, {
    fields: [payouts.userId],
    references: [users.id],
  }),
  processedByUser: one(users, {
    fields: [payouts.processedBy],
    references: [users.id],
  }),
}));