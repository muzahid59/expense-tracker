# Expense Tracker - Application Lifecycle & Architecture

## Overview
This document explains how the expense tracking application works from startup to user interaction.

---

## 1. Application Startup (Server-Side)

### When you run `npm run dev`:

1. **Next.js Server Starts**
   - Next.js 16 initializes with Turbopack (fast bundler)
   - Server listens on http://localhost:3000
   - TypeScript compilation begins

2. **Configuration Loading**
   ```
   next.config.ts → Loads Next.js settings
   tailwind.config.ts → Loads Tailwind CSS configuration
   tsconfig.json → TypeScript compiler options
   postcss.config.js → CSS processing pipeline
   ```

3. **App Router Setup**
   - Next.js scans the `app/` directory
   - Discovers routes:
     - `/` → `app/page.tsx` (Dashboard)
     - `/expenses` → `app/expenses/page.tsx` (Expenses List)
     - `/add-expense` → `app/add-expense/page.tsx` (Add Form)

---

## 2. First Page Load (Client Request)

### User navigates to http://localhost:3000

**Step 1: Server-Side Rendering (SSR)**

```
1. Browser requests "/"
   ↓
2. Next.js receives request
   ↓
3. Loads app/layout.tsx (Root Layout)
   ↓
4. Loads app/page.tsx (Dashboard Page)
   ↓
5. Renders React components on server
   ↓
6. Generates HTML + CSS
   ↓
7. Sends HTML to browser
```

**Step 2: Hydration (Client-Side)**

```
1. Browser receives HTML (shows "Loading dashboard...")
   ↓
2. Downloads JavaScript bundles
   ↓
3. React "hydrates" the HTML (makes it interactive)
   ↓
4. Client-side components take over
   ↓
5. App is now fully interactive
```

---

## 3. Component Hierarchy & Data Flow

### Component Tree Structure:

```
app/layout.tsx (Root Layout)
├── ExpenseProvider (Context Provider - manages all expense data)
│   └── Wraps entire application
│
├── Header (Navigation bar)
│   └── Navigation (Dashboard, Expenses, Add Expense links)
│
└── app/page.tsx (Dashboard Page)
    ├── Container (Max-width wrapper)
    └── Dashboard Content
        ├── SummaryCard (x4) - Total, Monthly, Count, Average
        ├── SpendingChart - Bar chart (last 6 months)
        ├── CategoryChart - Pie chart (category breakdown)
        └── RecentExpenses - Latest 5 expenses
```

---

## 4. State Management & Data Flow

### Context Provider Pattern:

```javascript
// On App Mount:
1. ExpenseProvider initializes
   ↓
2. useState creates empty expenses array: []
   ↓
3. useEffect runs (loads data from localStorage)
   ↓
4. Sets isLoading to false
   ↓
5. All child components re-render with data
```

### Data Flow Diagram:

```
┌─────────────────────────────────────┐
│   ExpenseProvider (Context)         │
│   - expenses: Expense[]              │
│   - addExpense()                     │
│   - updateExpense()                  │
│   - deleteExpense()                  │
│   - isLoading: boolean               │
└─────────────────────────────────────┘
           ↓ provides data to
    ┌──────┴──────┐
    ↓             ↓
Dashboard      Expenses Page
    ↓             ↓
useExpenses   useExpenses + useFilters
    ↓             ↓
- summary     - filtered expenses
- charts      - export CSV
- recent      - edit/delete
```

---

## 5. User Interaction Lifecycle

### Example: Adding an Expense

**Step-by-Step Flow:**

```
1. User clicks "Add Expense" in navigation
   ↓
2. React Router navigates to /add-expense
   ↓
3. app/add-expense/page.tsx renders
   ↓
4. ExpenseForm component displays
   ↓
5. User fills form (date, amount, category, description)
   ↓
6. React Hook Form tracks input changes
   ↓
7. User clicks "Add Expense" button
   ↓
8. Form validates with Zod schema
   │
   ├─ If invalid: Show error messages
   │
   └─ If valid:
      ↓
      9. ExpenseForm calls onSubmit(data)
         ↓
      10. Page calls addExpense(data) from context
          ↓
      11. ExpenseProvider creates new expense:
          {
            id: crypto.randomUUID(),
            date: "2024-12-10",
            amount: 45.99,
            category: "Food",
            description: "Lunch at restaurant",
            createdAt: "2024-12-10T12:00:00.000Z",
            updatedAt: "2024-12-10T12:00:00.000Z"
          }
          ↓
      12. Saves to localStorage
          ↓
      13. Updates React state: setExpenses([...expenses, newExpense])
          ↓
      14. All components re-render with new data
          ↓
      15. Router navigates to /expenses
          ↓
      16. User sees their new expense in the list!
```

---

## 6. Data Persistence Layer

### localStorage Strategy:

```javascript
// Storage Key
STORAGE_KEY = 'expense-tracker-data'

// Write Operation (Add/Update/Delete)
1. User action triggers state change
   ↓
2. React state updates
   ↓
3. Context calls storage.setExpenses(expenses)
   ↓
4. JSON.stringify(expenses) converts to string
   ↓
5. localStorage.setItem('expense-tracker-data', jsonString)
   ↓
6. Data persists in browser

// Read Operation (On App Load)
1. useEffect runs on mount
   ↓
2. Calls storage.getExpenses()
   ↓
3. localStorage.getItem('expense-tracker-data')
   ↓
4. JSON.parse(jsonString) converts to array
   ↓
5. setExpenses(loadedExpenses)
   ↓
6. App displays saved data
```

**Data Structure in localStorage:**

```json
{
  "expense-tracker-data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "date": "2024-12-10",
      "amount": 45.99,
      "category": "Food",
      "description": "Lunch",
      "createdAt": "2024-12-10T12:00:00.000Z",
      "updatedAt": "2024-12-10T12:00:00.000Z"
    }
  ]
}
```

---

## 7. Filtering & Calculations Lifecycle

### How Dashboard Calculates Summary:

```javascript
// useExpenses hook runs on every render
1. Get expenses from context
   ↓
2. useMemo runs calculations (only when expenses change)
   │
   ├─ Total Spending: expenses.reduce((sum, e) => sum + e.amount, 0)
   │
   ├─ Monthly Spending:
   │   Filter by current month → sum amounts
   │
   ├─ Expense Count: expenses.length
   │
   ├─ Average: totalSpending / expenseCount
   │
   ├─ Category Totals:
   │   Group by category → sum each → calculate percentages
   │
   └─ Monthly Data:
       Group by month → sum each → sort → take last 6
       ↓
3. Returns calculated data
   ↓
4. Components render with calculations
```

### Filtering on Expenses Page:

```javascript
// User applies filters
1. User selects date range (Jan 1 - Jan 31)
   ↓
2. useFilters updates state
   ↓
3. useExpenses receives filters parameter
   ↓
4. useMemo filters expenses:
   - Check if date is within range
   - Check if category matches
   - Check if description contains search query
   ↓
5. Returns filtered array
   ↓
6. ExpenseList renders only filtered expenses
```

---

## 8. Chart Rendering Lifecycle

### Recharts Integration:

```
1. useExpenses returns monthlyData / categoryTotals
   ↓
2. SpendingChart / CategoryChart receives data as props
   ↓
3. Component transforms data for Recharts:
   - Format dates (parseISO → format)
   - Map to chart-friendly structure
   ↓
4. Recharts components render:
   - ResponsiveContainer (handles sizing)
   - BarChart / PieChart (creates SVG)
   - Bars / Pie cells (visual elements)
   - Tooltip (hover effects)
   ↓
5. Browser displays interactive charts
```

---

## 9. Routing & Navigation Lifecycle

### Client-Side Navigation (Next.js App Router):

```
1. User clicks navigation link
   ↓
2. Next.js Link component intercepts click
   ↓
3. Prevents full page reload (SPA behavior)
   ↓
4. Updates URL in address bar
   ↓
5. Next.js renders new route component
   ↓
6. React transitions to new page
   ↓
7. Smooth navigation (no flicker)
```

**Route Mapping:**
```
URL                → File                       → Component
/                  → app/page.tsx              → DashboardPage
/expenses          → app/expenses/page.tsx     → ExpensesPage
/add-expense       → app/add-expense/page.tsx  → AddExpensePage
```

---

## 10. Edit/Delete Lifecycle

### Edit Expense Flow:

```
1. User clicks edit icon on expense
   ↓
2. ExpenseItem sets isEditModalOpen = true
   ↓
3. Modal component renders
   ↓
4. ExpenseForm renders with defaultValues (pre-filled)
   ↓
5. User modifies fields
   ↓
6. User clicks "Save Changes"
   ↓
7. Form validates
   ↓
8. Calls updateExpense(id, newData)
   ↓
9. Context finds expense by ID
   ↓
10. Updates expense in array
    ↓
11. Saves to localStorage
    ↓
12. Updates React state
    ↓
13. Modal closes
    ↓
14. List re-renders with updated expense
```

### Delete Expense Flow:

```
1. User clicks delete icon
   ↓
2. Delete confirmation modal opens
   ↓
3. Shows expense details for confirmation
   ↓
4. User clicks "Delete"
   ↓
5. Calls deleteExpense(id)
   ↓
6. Context filters out expense by ID
   ↓
7. Updates localStorage
   ↓
8. Updates React state
   ↓
9. Modal closes
   ↓
10. Expense disappears from list
```

---

## 11. CSV Export Lifecycle

```
1. User clicks "Export CSV" button
   ↓
2. Calls exportToCSV(expenses)
   ↓
3. Maps expenses to simple objects:
   { Date: "Dec 10, 2024", Amount: "45.99", Category: "Food", Description: "Lunch" }
   ↓
4. PapaParse converts to CSV string:
   "Date,Amount,Category,Description\nDec 10, 2024,45.99,Food,Lunch"
   ↓
5. Creates Blob from CSV string
   ↓
6. Creates download link (URL.createObjectURL)
   ↓
7. Programmatically clicks link
   ↓
8. Browser downloads expenses.csv
   ↓
9. Cleans up (removes link, revokes URL)
```

---

## 12. Form Validation Lifecycle

### React Hook Form + Zod Integration:

```
1. ExpenseForm initializes with useForm
   ↓
2. Zod schema defines rules:
   - date: required
   - amount: number, min 0.01, max 999999.99
   - category: one of 6 categories
   - description: string, min 1, max 200 chars
   ↓
3. User types in field
   ↓
4. React Hook Form tracks value
   ↓
5. On blur or submit, validates against schema
   ↓
6. If invalid:
   - errors object updates
   - Error message displays under field
   ↓
7. If valid:
   - Clears error
   - Allows submission
   ↓
8. Submit button disabled if errors exist
```

---

## 13. Performance Optimizations

### React Optimization Strategies Used:

**1. useMemo for Expensive Calculations**
```javascript
// Only recalculates when expenses change
const summary = useMemo(() => {
  // Heavy calculations
}, [expenses]);
```

**2. useCallback for Stable Functions**
```javascript
// Prevents unnecessary re-renders
const setDateRange = useCallback((start, end) => {
  // Update filters
}, []);
```

**3. Context Provider Scope**
```javascript
// Only re-renders components that use the data
<ExpenseProvider>
  {children}
</ExpenseProvider>
```

**4. Lazy Loading (Next.js)**
```javascript
// Code splitting - only loads what's needed
// Each route loads its own JavaScript bundle
```

---

## 14. Error Handling Flow

### Form Validation Errors:
```
Invalid input → Zod validates → Returns error → Display under field
```

### localStorage Errors:
```
Quota exceeded → Catch in try/catch → Log error → Continue gracefully
```

### Network Errors:
```
N/A - This app is fully client-side (no API calls)
```

---

## 15. Complete User Journey Example

**Scenario: New user tracks first expense**

```
1. User opens http://localhost:3000
   ↓
2. Next.js server renders HTML
   ↓
3. Browser displays "Loading dashboard..."
   ↓
4. JavaScript loads, React hydrates
   ↓
5. ExpenseProvider loads (no data in localStorage)
   ↓
6. Dashboard shows EmptyState:
   "Welcome to Expense Tracker! Start managing your finances..."
   ↓
7. User clicks "Add Expense" button
   ↓
8. Navigates to /add-expense
   ↓
9. Form displays with today's date pre-filled
   ↓
10. User enters:
    - Amount: 12.50
    - Category: Food
    - Description: Coffee
    ↓
11. Clicks "Add Expense"
    ↓
12. Form validates (all fields valid ✓)
    ↓
13. Creates expense with UUID
    ↓
14. Saves to localStorage
    ↓
15. Updates React state
    ↓
16. Navigates to /expenses
    ↓
17. Expense appears in list!
    ↓
18. User clicks "Dashboard"
    ↓
19. Sees:
    - Total Spending: $12.50
    - Monthly Spending: $12.50
    - Expense Count: 1
    - Bar chart with one bar
    - Pie chart with Food category (100%)
    - Recent expense showing coffee
    ↓
20. User refreshes page (F5)
    ↓
21. Data persists (loaded from localStorage)
    ↓
22. Everything still there! ✓
```

---

## 16. Key Architectural Decisions

### Why Context API?
- ✅ Simple state management for small/medium apps
- ✅ No external dependencies
- ✅ Built into React
- ✅ Perfect for sharing data across components

### Why localStorage?
- ✅ No backend needed
- ✅ Instant persistence
- ✅ Works offline
- ✅ Simple API
- ❌ Limited to ~5-10MB
- ❌ Not secure (client-side only)

### Why useMemo/useCallback?
- ✅ Prevents unnecessary recalculations
- ✅ Optimizes performance
- ✅ Reduces re-renders

### Why Next.js App Router?
- ✅ File-based routing
- ✅ Server-side rendering
- ✅ Automatic code splitting
- ✅ Fast development experience

---

## Summary

The expense tracker follows a modern React architecture with:

1. **Server-Side Rendering** (Next.js) for fast initial load
2. **Client-Side State** (Context API) for data management
3. **localStorage** for persistence
4. **React Hooks** for logic reuse
5. **TypeScript** for type safety
6. **Tailwind CSS** for styling

The lifecycle is a continuous loop:
```
Load → Display → User Action → Update State → Persist → Re-render → Repeat
```

Every interaction follows the React principle:
**Data flows down, events flow up**

---

*For more details, see the source code in the respective files.*
