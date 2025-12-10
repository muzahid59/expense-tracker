export type ExpenseCategory =
  | 'Food'
  | 'Transportation'
  | 'Entertainment'
  | 'Shopping'
  | 'Bills'
  | 'Other';

export interface Expense {
  id: string;
  date: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseFormData {
  date: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
}

export interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

export interface ExpenseFilters {
  dateRange: DateRange;
  categories: ExpenseCategory[];
  searchQuery: string;
}

export interface ExpenseSummary {
  totalSpending: number;
  monthlySpending: number;
  expenseCount: number;
  averageExpense: number;
}

export interface CategoryTotal {
  category: ExpenseCategory;
  total: number;
  count: number;
  percentage: number;
}

export interface MonthlyData {
  month: string;
  total: number;
  count: number;
}
