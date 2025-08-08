# Bet Global Operating System (BGOS)

A comprehensive dashboard and operating system for Bet Global's lead acquisition operations, specializing in online casino signups through Bovada and Chalkboard platforms.

## 🚀 Features

- **Sales Rep Management**: Track current and historical sales representatives
- **Commission Calculation**: Automated commission calculations based on platform-specific rules
- **Bonus System**: Milestone-based and contest-based bonus tracking
- **Performance Analytics**: Individual and system-wide performance metrics
- **Payout Processing**: Streamlined payout management for finance team
- **Role-Based Access**: Different interfaces for Sales Reps, Admins, Finance, and Managers
- **Real-time Dashboard**: Live performance tracking and leaderboards

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **Database**: Neon.tech (PostgreSQL)
- **ORM**: Drizzle ORM
- **UI Components**: Radix UI primitives
- **Styling**: Tailwind CSS with custom design system

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Neon.tech database account
- Clerk account for authentication

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Bet Global OS"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
   - `CLERK_SECRET_KEY`: Your Clerk secret key
   - `DATABASE_URL`: Your Neon database connection string

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with Clerk provider
│   └── page.tsx           # Landing page
├── lib/
│   └── db/                # Database configuration
│       ├── index.ts       # Database connection
│       └── schema.ts      # Drizzle schema definitions
├── types/
│   └── index.ts           # TypeScript type definitions
├── drizzle.config.ts      # Drizzle configuration
├── middleware.ts          # Clerk authentication middleware
├── requirements.md        # Detailed project requirements
└── tailwind.config.ts     # Tailwind configuration
```

## 💼 Business Logic

### Commission Structure
- **Bovada**: $80 for first signup, $40 for subsequent signups
- **Chalkboard**: Flat $40 per signup

### Qualification Criteria
- **Bovada**: Register + $20 deposit + 1 bet/pick
- **Chalkboard**: Accept invite + join betting group

### Bonus System
- **First Signup Bonus**: $80 (Bovada only)
- **Milestone Bonuses**: $100 every 10 signups, $1,000 every 100 signups
- **Contest Bonuses**: Variable prizes for top performers

## 👥 User Roles

- **Sales Reps**: Personal dashboard, performance metrics, earnings tracking
- **Admins**: Full system access, user management, system configuration
- **Finance**: Payout processing, accounting notes, balance tracking
- **Managers**: View-only access to assigned reps (future feature)

## 🔐 Security

- Role-based access control via Clerk
- Data isolation between user roles
- Secure environment variable management
- Input validation and sanitization

## 📊 Database Schema

The application uses a PostgreSQL database with the following main entities:
- Users (sales reps, admins, finance, managers)
- Signups (Bovada and Chalkboard leads)
- Commissions (calculated earnings)
- Bonuses (milestone and contest bonuses)
- Payouts (payment tracking)
- Contests (contest management)

## 🚀 Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run db:generate`: Generate database migrations
- `npm run db:migrate`: Run database migrations
- `npm run db:studio`: Open Drizzle Studio

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Neon Database
DATABASE_URL=your_neon_database_url

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📈 Roadmap

### Phase 1 (Current)
- [x] Project foundation and setup
- [x] Database schema design
- [x] Authentication integration
- [ ] Basic dashboard layouts
- [ ] User management system

### Phase 2
- [ ] Commission calculation engine
- [ ] Bonus tracking system
- [ ] Data entry interfaces
- [ ] Performance analytics

### Phase 3
- [ ] Advanced reporting
- [ ] Contest management
- [ ] Mobile optimization
- [ ] Manager role implementation

## 🤝 Contributing

This is a private project for Bet Global. All development should follow the established patterns and maintain the security standards outlined in the requirements.

## 📄 License

Private - All rights reserved by Bet Global.