# PlayingKeys

A piano learning platform built with React Native Expo, NestJS, and PostgreSQL.

## Overview

PlayingKeys is a mobile-first application for learning piano, featuring:
- Interactive piano keyboard with accurate sound
- Structured lessons based on "The Music Tree - Time to Begin" curriculum
- Progress tracking for students
- Teacher dashboard for managing students and assignments
- Admin dashboard for platform management

## Tech Stack

### Mobile (Primary)
- React Native + Expo (Expo Go for dev, EAS for production)
- TypeScript strict
- Expo Router for file-based routing
- NativeWind for styling
- TanStack Query for remote data
- Lucide icons
- expo-av for piano sound

### Web (Admin Dashboard & Showcase)
- Next.js
- TypeScript strict
- Tailwind
- Lucide icons
- TanStack Query

### Backend
- NestJS
- PostgreSQL (plyngpDB)
- Prisma ORM
- Zod validation

### Development Tools
- Biome JS for linting/formatting
- Unit and integration testing
- BMAD for planning
- CodeGraph for code intelligence
- Caveman for compressed communication
- Ponytail for engineering posture

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL running locally
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Set up database
cp apps/api/.env.example apps/api/.env
# Edit .env with your PostgreSQL credentials

# Run migrations
cd apps/api
npx prisma migrate dev

# Seed database
npx prisma db seed

# Start development
npm run dev:mobile  # Expo Go
npm run dev:web     # Next.js dashboard
npm run dev:api     # NestJS API
```

### Environment Variables

```env
# apps/api/.env
DATABASE_URL="postgresql://postgres:987c8a7c0@localhost:5432/plyngpDB"
JWT_SECRET="your-secret-key"
NODE_ENV="development"
```

## Project Structure

```
playingkeys/
├── apps/
│   ├── mobile/          # React Native Expo app
│   ├── web/             # Next.js admin dashboard
│   └── api/             # NestJS backend
├── packages/
│   ├── domain/          # Shared business logic
│   ├── contracts/       # API contracts, types
│   └── database/        # Prisma schema, migrations
├── docs/                # Documentation
├── _bmad-output/        # BMAD artifacts
├── .codegraph/          # CodeGraph index
└── .agents/             # Agent skills
```

## Development

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Testing
npm run test

# Build
npm run build
```

## Curriculum

Based on "The Music Tree - Time to Begin" by Frances Clark, Louise Goss, and Sam Holland.

### Units
1. **Unit 1**: Higher/Lower, Quarter/Half notes
2. **Unit 2**: Piano (p), Forte (f), Repeated notes
3. **Unit 3**: Slurs, Octave signs
4. **Unit 4**: 2nds (intervals), White keys
5. **Unit 5**: 3rds (intervals)
6. **Unit 6**: Time signatures
7. **Unit 7**: 4ths (intervals)
8. **Unit 8**: Whole notes, 5ths (intervals)
9. **Unit 9**: F Clef/Bass Staff, G Clef/Treble Staff, Grand Staff

## License

Private - All rights reserved.