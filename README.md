[![CodeGuide](/codeguide-backdrop.svg)](https://codeguide.dev)

# CodeGuide Starter Pro

A modern web application starter template built with Next.js 14, featuring Supabase native authentication, database integration, and payment processing capabilities.

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Authentication:** [Supabase Auth](https://supabase.com/auth)
- **Database:** [Supabase](https://supabase.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Payments:** [Stripe](https://stripe.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)

## Prerequisites

Before you begin, ensure you have the following:
- Node.js 18+ installed
- A [Supabase](https://supabase.com/) account for database and authentication
- A [Stripe](https://stripe.com/) account for payments (optional)
- Generated project documents from [CodeGuide](https://codeguide.dev/) for best development experience

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd codeguide-starter-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Variables Setup**
   - Copy the `.env.example` file to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Fill in the environment variables in `.env.local` (see Configuration section below)

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.**

## Configuration

### Supabase Setup
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Create a new project
3. Go to Project Settings > API
4. Copy the `Project URL` as `NEXT_PUBLIC_SUPABASE_URL`
5. Copy the `anon` public key as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Run the SQL migration from `supabase/migrations/20250125124435_init.sql` in your Supabase SQL editor

### Stripe Setup (Optional)
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your API keys from the Developers section
3. Add the required keys to your `.env.local` file

### OpenAI Setup (Optional)
1. Get your API key from [OpenAI](https://platform.openai.com/)
2. Add `OPENAI_API_KEY` to your `.env.local` file

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe (Optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# OpenAI (Optional)
OPENAI_API_KEY=your_openai_api_key
```

## Authentication

This starter uses **Supabase Auth** for user authentication, providing:

- **Email/Password Authentication**: Secure sign-up and sign-in flows
- **Email Verification**: Users must verify their email before accessing the app
- **Password Recovery**: Forgot password functionality with email reset links
- **Session Management**: Automatic session handling with JWT tokens
- **Row Level Security**: Database-level security policies
- **Social OAuth**: Easy integration with Google, GitHub, and other providers (configurable)

### Authentication Flow

1. **Sign Up**: Users create an account with email/password
2. **Email Verification**: Confirmation email sent to verify account
3. **Sign In**: Authenticated users can access protected routes
4. **Password Reset**: Users can reset forgotten passwords via email
5. **Session Persistence**: Sessions are maintained across browser refreshes
6. **Automatic Redirects**: Unauthenticated users are redirected to sign-in

### Protected Routes

The middleware automatically protects routes like `/dashboard` and redirects unauthenticated users to `/auth/signin`.

## Features

- 🔐 Supabase Native Authentication
- 📦 PostgreSQL Database with Row Level Security
- 💳 Stripe Payments Integration
- 🎨 Modern UI with Tailwind CSS
- 🚀 App Router Ready
- 🔄 Real-time Updates
- 📱 Responsive Design
- 🛡️ Type Safety with TypeScript
- 🎯 AI Integration Ready (OpenAI)

## Project Structure

```
codeguide-starter/
├── app/                # Next.js app router pages
│   ├── auth/          # Authentication pages (signin, signup, etc.)
│   ├── dashboard/     # Protected dashboard area
│   └── api/           # API routes
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   └── providers/     # Context providers
├── utils/             # Utility functions
│   ├── supabase/      # Supabase client and helpers
│   ├── stripe/        # Stripe configuration
│   └── ai/            # OpenAI integration
├── public/            # Static assets
├── documentation/     # Generated documentation from CodeGuide
├── supabase/          # Supabase configurations and migrations
└── types/             # TypeScript type definitions
```

## Database Schema

The starter includes a complete database schema with:

- **Users**: Managed by Supabase Auth
- **Customers**: Stripe customer integration
- **Products & Prices**: Subscription management
- **Subscriptions**: User subscription tracking

Run the migration file in your Supabase SQL editor to set up the schema.

## Documentation Setup

To implement the generated documentation from CodeGuide:

1. The `documentation` folder contains comprehensive project documentation:
   ```bash
   documentation/
   ├── project_requirements_document.md             
   ├── app_flow_document.md
   ├── frontend_guidelines_document.md
   ├── backend_structure_document.md
   ├── security_guideline_document.md
   ├── tech_stack_document.md
   └── unified_project_document.md
   ```

2. These files provide detailed guidance for:
   - Project requirements and scope
   - User flows and app navigation
   - Frontend architecture and guidelines
   - Backend structure and API design
   - Security best practices
   - Technology stack decisions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.