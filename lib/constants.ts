import { ExpenseCategory } from './types';

export const EXPENSE_CATEGORIES: readonly ExpenseCategory[] = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
] as const;

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  Food: '#10b981',
  Transportation: '#3b82f6',
  Entertainment: '#f59e0b',
  Shopping: '#ec4899',
  Bills: '#ef4444',
  Other: '#6b7280',
};

export const CATEGORY_ICONS: Record<ExpenseCategory, string> = {
  Food: '🍔',
  Transportation: '🚗',
  Entertainment: '🎬',
  Shopping: '🛍️',
  Bills: '📄',
  Other: '📌',
};

export const STORAGE_KEY = 'expense-tracker-data';

export const CURRENCY_SYMBOL = '$';

export const DATE_FORMAT = 'MMM dd, yyyy';
export const MONTH_FORMAT = 'MMMM yyyy';
