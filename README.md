# KinGuardian - Elder Safety & Care Application

> A safety and care app for elders living alone: elders can trigger SOS alerts and log basic health info; family and caregivers get a live dashboard with risk level, adherence, and emergencies.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up the database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Seed the database with demo data:**
   ```bash
   npm run dev  # Start the server first
   curl http://localhost:3000/api/seed
   ```

4. **Access the application:**
   
   Navigate to: **http://localhost:3000**

### Demo Credentials

```
Elder:     elder@example.com / password
Family:    family@example.com / password
Caregiver: caregiver@example.com / password
Doctor:    doctor@example.com / password
```

## 📋 Features

### ✅ Implemented

- **Role-Based Authentication** - Four user roles: Elder, Family, Caregiver, Doctor
- **Elder Dashboard**
  - Large SOS emergency button
  - Today's medication tracking with "Take" action
  - Health event logging (Falls, Blood Pressure, Glucose, Notes)
- **Family Dashboard**
  - Card-based view of all linked elders
  - Risk level indicators (Low/Medium/High)
  - Open SOS alerts with animated badges
  - Recent fall and hospitalization flags
- **Caregiver & Doctor Dashboards**
  - View assigned elders
  - Basic elder information display
- **Database Schema**
  - Complete Prisma schema with all required models
  - SQLite database for easy setup

### 🚧 Not Yet Implemented

The following features from the original spec are planned but not yet implemented:

1. **Automated Risk Calculation** - Risk levels are currently static
2. **Daily Summary Automation** - Aggregation triggers not implemented
3. **SOS Acknowledgment/Resolution UI** - Family members can't yet acknowledge/resolve SOS events
4. **Push Notifications** - No notification system
5. **Hospitalization Management** - No UI for adding hospitalizations
6. **Detailed Elder Views** - "View Details" buttons are placeholders
7. **Password Hashing** - Passwords stored in plain text (demo only!)

## 🏗️ Architecture

### Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS v4
- **Backend:** Next.js API Routes, Server Actions
- **Database:** SQLite with Prisma ORM 5.19.0
- **Styling:** Tailwind CSS with PostCSS

### Database Models

- `User` - Authentication and role management
- `ElderProfile` - Elder information and risk assessment
- `MedicationSchedule` - Medication schedules
- `MedicationIntake` - Medication adherence tracking
- `HealthLog` - Health events (falls, BP, glucose, notes)
- `DailySummary` - Aggregated daily health metrics
- `Hospitalization` - Hospital admission records
- `SosEvent` - Emergency alerts

### Project Structure

```
app/
├── actions/          # Server actions
│   ├── auth.ts      # Login/logout
│   ├── sos.ts       # SOS triggers
│   ├── meds.ts      # Medication logging
│   └── logs.ts      # Health logging
├── api/
│   └── seed/        # Database seeding
├── components/      # Reusable UI components
│   ├── SOSButton.tsx
│   ├── MedicationList.tsx
│   └── HealthLogger.tsx
├── elder/           # Elder dashboard
├── family/          # Family dashboard
├── caregiver/       # Caregiver dashboard
├── doctor/          # Doctor dashboard
└── login/           # Login page

prisma/
└── schema.prisma    # Database schema
```

## 🎯 User Flows

### Elder Flow

1. Login as elder
2. View dashboard with:
   - SOS button for emergencies
   - Today's medications
   - Health logging form
3. Click SOS to trigger emergency alert
4. Mark medications as taken
5. Log health events (falls, BP, glucose, notes)

### Family Flow

1. Login as family member
2. View cards for all linked elders
3. See risk levels and health indicators
4. View open SOS alerts
5. Click "View Details" for more information (placeholder)

### Caregiver Flow

1. Login as caregiver
2. View assigned elders
3. Access "Manage Care" for each elder (placeholder)

### Doctor Flow

1. Login as doctor
2. View assigned patients
3. Access "View Medical History" (placeholder)

## 🔧 Technical Decisions

### Why SQLite?

Docker was not available on the development system, so SQLite was chosen for simplicity and ease of setup. This required:
- Converting PostgreSQL enums to String fields
- Storing arrays as JSON strings
- Using `JSON.parse()` when reading array data

### Why Tailwind CSS v4?

Tailwind v4 provides:
- Better performance with PostCSS-only approach
- No need for `tailwind.config.js`
- Modern utility-first CSS framework

Configuration:
- Uses `@tailwindcss/postcss` plugin
- Directives added to `src/styles/globals.scss`

### Why Prisma 5.19.0?

Downgraded from Prisma 7.0.1 for better stability and compatibility with the Next.js setup.

## 📝 API Routes

### Seed Database

```bash
GET /api/seed
```

Creates demo users and sample data.

## 🔐 Security Considerations

> [!WARNING]
> This is a demo application. The following security measures should be implemented before production use:

- Hash passwords with bcrypt or similar
- Implement proper session management
- Add CSRF protection
- Validate and sanitize all user inputs
- Implement rate limiting
- Add HTTPS in production
- Secure cookie settings

## 🚀 Next Steps

To complete the implementation:

1. **Implement Risk Calculation**
   - Create background job to calculate risk levels
   - Update `ElderProfile` risk fields based on recent events

2. **Add SOS Management**
   - Create SOS detail page
   - Add acknowledge/resolve actions for family/caregivers

3. **Implement Daily Summary Automation**
   - Add Prisma middleware or scheduled jobs
   - Update summaries when health logs or medication intakes are created

4. **Add Hospitalization Management**
   - Create forms for caregivers/doctors to log hospitalizations

5. **Improve Security**
   - Hash passwords with bcrypt
   - Add proper session management with NextAuth.js
   - Implement CSRF protection

6. **Add Notifications**
   - Integrate push notifications for SOS events
   - Email alerts for family members

7. **Enhance UI**
   - Add detailed elder view pages
   - Implement charts for health trends
   - Add medication schedule management

## 📄 License

MIT

## 🤝 Contributing

This is a hackathon/demo project. Feel free to fork and extend!

## 📞 Support

For questions or issues, please open an issue in the repository.

---

**Built with ❤️ for elder care and safety**
