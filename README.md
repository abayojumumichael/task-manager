# Task Manager

A light-weight task management web application built with Next.js, Supabase, and React. Users can sign up, log in, create, view, and delete their personal tasks.

## Features
- User authentication (sign up, login, protected routes)
- Create, view, and delete tasks
- Responsive and modern UI (shadcn/ui, Tailwind CSS)
- Supabase as backend (database & auth)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm, yarn, or pnpm
- [Supabase](https://supabase.com/) project (get your project URL and anon key)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema
You need a `tasks` table and an `accounts` table in your Supabase project:

### `tasks` table
| Column      | Type    | Description         |
| ----------- | ------- | ------------------ |
| id          | uuid    | Primary key        |
| title       | text    | Task title         |
| description | text    | Task description   |
| user_id     | uuid    | Reference to user  |

### `accounts` table
| Column     | Type    | Description         |
| ---------- | ------- | ------------------ |
| id         | uuid    | Primary key        |
| user_uuid  | uuid    | Supabase user id   |
| ...        | ...     | (other user fields)|

## Project Structure
- `src/app/` - Next.js app directory
  - `dashboard/` - Dashboard page, task form, and actions
  - `login/` - Login and signup pages
  - `auth/` - Auth confirmation route
- `src/components/ui/` - Reusable UI components (Card, Button, Input, etc.)
- `src/utils/` - Supabase and auth helpers
- `src/lib/` - Utility functions

## Customization
- Update the UI as needed
- Extend task features (edit, due dates, etc.) in `src/app/dashboard/`

## License
MIT
