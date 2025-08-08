# Bet Global Operating System (BGOS) - Requirements Document

## Project Overview
Comprehensive dashboard and operating system for Bet Global, a lead acquisition agency specializing in online casino signups through Bovada and Chalkboard platforms. The system centralizes team management, revenue reporting, performance analytics, commission/bonus logic, payout processing, and strategic decision making.

## Business Model

### Revenue Streams

#### Bovada Revenue Model
- **Qualification Criteria**: 
  1. User registers through tracked affiliate link
  2. Makes deposit of at least $20
  3. Places at least one bet or pick within platform
- **Payout Range**: $40-$80 per qualified signup
- **Variables**: Promotional agreements, volume tiers, specific affiliate deals

#### Chalkboard Revenue Model
- **Qualification Criteria**: 
  1. User accepts invite
  2. Successfully joins betting group
- **Payout**: Flat $20 per confirmed conversion
- **Characteristics**: Lower revenue per lead, higher volume of signups

### Sales Rep Commission Structure

#### Bovada Commissions
- **First Signup**: $80
- **Subsequent Signups**: $40 each

#### Chalkboard Commissions
- **All Signups**: Flat $40 each

#### Rep Hierarchy
- **Current State**: All reps receive same commission rate
- **No Tiered Structure**: No Junior/Senior/Team Lead differentiation

### Bonus System

#### Milestone-Based Bonuses (Bovada)
- **First Qualified Signup**: $80 bonus
- **Every 10 Qualified Signups**: $100 bonus
- **Every 100 Qualified Signups**: $1,000 bonus
- **Cumulative**: All bonuses stack and accumulate

#### Contest-Based Bonuses
- **Top Performer Contests**: Monthly or semester basis
- **High-Value Prizes**: 
  - Fully paid trip to Vail, Colorado (private jet + luxury accommodations)
  - Premium electronics (AirPods Max)
  - Luxury items (Rolex watch)
  - Direct cash incentives
- **Limited-Time Contests**: Example: "5 qualified signups in 24 hours = $50 bonus"
- **Payment**: All bonuses paid in addition to standard commissions

## Technical Requirements

### Database
- **Platform**: Neon.tech (PostgreSQL)

### Authentication
- **Provider**: Clerk

### Data Input
- **Method**: Manual input (maintain current process)

## User Roles & Permissions

### 1. Sales Reps
**Access Level**: Personal dashboard only
**Permissions**:
- View own performance metrics:
  - Total signups
  - Qualified leads
  - Conversion rate
  - Bonuses earned
  - Commission accrued
  - Payouts received
**Restrictions**:
- Cannot view other reps' data
- Cannot edit paid amounts
- Cannot modify bonus thresholds

### 2. Admins
**Access Level**: Full system access
**Permissions**:
- Manage rep profiles
- Assign/change commission tiers
- Input/edit payouts
- Assign bonuses
- View system-wide analytics
- Configure all system components
- Visibility over all data across every rep and platform

### 3. Finance Team Members
**Access Level**: Payout panel only
**Permissions**:
- Input "Paid" values
- Export data for payroll processing
- Add accounting notes
- Track outstanding balances
**Restrictions**:
- Cannot view/edit signup data
- Cannot view/edit performance data outside finance interface

### 4. Managers/Team Leads (Future Development)
**Access Level**: View-only for managed reps
**Permissions**:
- Track performance of assigned reps
- Leave comments
- Oversee rep engagement
**Restrictions**:
- Cannot edit payout fields
- Cannot assign bonuses

## Core System Features

### 1. Sales Rep Management
- Rep profiles (current and historical)
- Performance tracking
- Commission calculation engine
- Bonus calculation engine

### 2. Financial Management
- Automated commission calculations
- Milestone bonus tracking
- Contest bonus management
- P&L reporting (Bovada + Chalkboard)
- Payout processing system

### 3. Performance Analytics
- Individual rep dashboards
- System-wide analytics
- Leaderboards and rankings
- Conversion rate tracking
- Rep psychology/motivation features

### 4. Administrative Console
- User management
- System configuration
- Data input interfaces
- Reporting tools

### 5. Data Management
- Manual data entry interfaces
- Data validation
- Historical data tracking
- Export capabilities

## Database Schema Requirements

### Core Entities
1. **Users** (Reps, Admins, Finance, Managers)
2. **Signups** (Bovada, Chalkboard)
3. **Commissions** (Calculated earnings)
4. **Bonuses** (Milestone and contest bonuses)
5. **Payouts** (Payment tracking)
6. **Contests** (Contest management)

### Key Relationships
- Users → Signups (one-to-many)
- Signups → Commissions (one-to-one)
- Users → Bonuses (one-to-many)
- Users → Payouts (one-to-many)

## UI/UX Requirements

### Design Principles
- Modern, clean interface
- Role-based dashboards
- Intuitive navigation
- Mobile-responsive design
- Real-time data updates

### Key Interfaces
1. **Rep Dashboard**: Personal performance metrics
2. **Admin Console**: Full system management
3. **Finance Panel**: Payout processing
4. **Analytics Dashboard**: System-wide reporting
5. **Data Entry Forms**: Manual input interfaces

## Security Requirements
- Role-based access control
- Data isolation between reps
- Secure authentication via Clerk
- Audit trails for financial transactions
- Data validation and sanitization

## Performance Requirements
- Real-time dashboard updates
- Fast data entry processing
- Efficient reporting generation
- Scalable architecture for growth

## Integration Requirements
- Clerk authentication integration
- Neon.tech database connectivity
- Export capabilities for payroll systems
- Potential future API integrations

## Success Metrics
- Centralized team management
- Automated commission/bonus calculations
- Streamlined payout processing
- Enhanced rep motivation through gamification
- Improved strategic decision making through analytics

## Development Phases
1. **Phase 1**: Core authentication, user management, basic dashboards
2. **Phase 2**: Commission/bonus calculation engines, data entry
3. **Phase 3**: Advanced analytics, reporting, contest management
4. **Phase 4**: Mobile optimization, advanced features, manager roles

---

*This document serves as the comprehensive blueprint for the Bet Global Operating System development project.*