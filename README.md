# Expense Tracker

A modern expense tracking application built with Next.js 14, TypeScript, and Tailwind CSS. Track your expenses, visualize spending patterns, and manage your budget effectively.

## Live Demo

🚀 **[View Live App](https://expense-tracker-six-tawny.vercel.app/)**

## Features

- **Add & Manage Expenses**: Create, edit, and delete expenses with validation
- **Smart Filtering**: Filter by date range, category, and search by description
- **Analytics Dashboard**: Visual insights with charts and summary cards
- **CSV Export**: Export your expenses to CSV format
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Local Storage**: Data persists in your browser (no backend required)

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Export**: PapaParse (CSV)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository and navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Available Scripts

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Project Structure

```
expense-tracker/
├── app/                      # Next.js 14 App Router pages
├── components/               # React components
│   ├── layout/              # Layout components
│   ├── dashboard/           # Dashboard components
│   ├── expenses/            # Expense management
│   └── ui/                  # Reusable UI components
├── lib/                     # Utilities and helpers
├── hooks/                   # Custom React hooks
└── context/                 # Global state management
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- User authentication and cloud sync
- Budget setting and alerts
- Recurring expenses
- Multiple currencies
- Dark mode
- PDF export

---

Built with Next.js 14, TypeScript, and Tailwind CSS
