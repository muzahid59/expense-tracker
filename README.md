# Expense Tracker

A modern, professional expense tracking application built with Next.js 14, TypeScript, and Tailwind CSS. Track your expenses, visualize spending patterns, and manage your budget effectively.

## Features

- **Add & Manage Expenses**: Create, edit, and delete expenses with full validation
- **Smart Filtering**: Filter expenses by date range, category, and search by description
- **Analytics Dashboard**: Visual insights with charts and summary cards
- **CSV Export**: Export your expenses to CSV format
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Local Storage**: Data persists in your browser (no backend required)
- **Modern UI**: Clean, professional interface with smooth animations

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

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd expense-tracker
   ```

2. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and visit:
   ```
   http://localhost:3000
   ```

## Usage Guide

### Dashboard

The dashboard provides an overview of your finances:

- **Summary Cards**: View total spending, monthly spending, expense count, and average expense
- **Monthly Spending Chart**: Bar chart showing spending trends over the last 6 months
- **Category Chart**: Pie chart breaking down expenses by category
- **Recent Expenses**: Quick view of your latest 5 expenses

### Adding an Expense

1. Click on "Add Expense" in the navigation
2. Fill in the form:
   - **Date**: Select the expense date
   - **Amount**: Enter the amount (e.g., 45.99)
   - **Category**: Choose from Food, Transportation, Entertainment, Shopping, Bills, or Other
   - **Description**: Add a brief description
3. Click "Add Expense" to save

### Managing Expenses

1. Navigate to the "Expenses" page
2. **Edit**: Click the edit icon on any expense to modify it
3. **Delete**: Click the delete icon and confirm to remove an expense
4. **Filter**: Use the filter panel to narrow down expenses:
   - Set start and end dates
   - Select one or multiple categories
   - Search by description
5. **Export**: Click "Export CSV" to download your expenses

### Categories

Available expense categories:
- 🍔 **Food**: Groceries, restaurants, delivery
- 🚗 **Transportation**: Gas, public transit, rideshares
- 🎬 **Entertainment**: Movies, games, subscriptions
- 🛍️ **Shopping**: Clothing, electronics, general purchases
- 📄 **Bills**: Utilities, rent, insurance
- 📌 **Other**: Miscellaneous expenses

## Project Structure

```
expense-tracker/
├── app/                      # Next.js 14 App Router pages
│   ├── layout.tsx           # Root layout with provider
│   ├── page.tsx             # Dashboard page
│   ├── expenses/            # Expenses list page
│   └── add-expense/         # Add expense page
├── components/
│   ├── layout/              # Layout components (Header, Nav, Container)
│   ├── dashboard/           # Dashboard components (Charts, Cards)
│   ├── expenses/            # Expense management components
│   ├── ui/                  # Reusable UI components
│   └── common/              # Common components (EmptyState)
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   ├── constants.ts        # App constants
│   ├── storage.ts          # localStorage utilities
│   ├── validation.ts       # Zod schemas
│   ├── utils.ts            # Helper functions
│   └── exports.ts          # CSV export logic
├── hooks/
│   ├── useExpenses.ts      # Expense data hook
│   └── useFilters.ts       # Filter state hook
└── context/
    └── ExpenseContext.tsx  # Global state provider
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

## Features in Detail

### Form Validation

All expense forms include real-time validation:
- Date is required
- Amount must be between $0.01 and $999,999.99
- Category must be selected
- Description is required (max 200 characters)

### Data Persistence

Expenses are stored in browser localStorage:
- Data persists across page refreshes
- No backend or database required
- Each expense has a unique UUID
- Timestamps track creation and updates

### Responsive Design

The application adapts to all screen sizes:
- **Mobile** (< 768px): Single column, stacked layout
- **Tablet** (768px - 1023px): Two-column grids
- **Desktop** (1024px+): Multi-column layouts with sidebar charts

### Charts & Analytics

- **Monthly Spending**: Bar chart showing trends over 6 months
- **Category Breakdown**: Pie chart with percentages
- **Summary Cards**: Key metrics at a glance
- **Recent Expenses**: Quick access to latest transactions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Data Privacy

All your data is stored locally in your browser. No data is sent to any external servers. You can clear your data at any time by clearing your browser's localStorage.

## Future Enhancements

Potential features for future versions:
- User authentication and cloud sync
- Budget setting and alerts
- Recurring expenses
- Multiple currencies
- Receipt image uploads
- Advanced filtering and reporting
- Dark mode
- PDF export

## Troubleshooting

### Application won't start
- Ensure all dependencies are installed: `npm install`
- Check that Node.js version is 18 or higher: `node --version`
- Delete `node_modules` and `.next` folders, then reinstall

### Data not persisting
- Check if localStorage is enabled in your browser
- Ensure you're not in private/incognito mode
- Check browser console for errors

### Charts not displaying
- Ensure JavaScript is enabled
- Check browser console for errors
- Try refreshing the page

## License

ISC

## Support

For issues or questions, please check the documentation or create an issue in the project repository.

---

Built with Next.js 14, TypeScript, and Tailwind CSS
