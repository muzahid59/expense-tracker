import { Expense } from './types';
import { STORAGE_KEY } from './constants';

export const storage = {
  getExpenses: (): Expense[] => {
    if (typeof window === 'undefined') return [];

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  setExpenses: (expenses: Expense[]): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  addExpense: (expense: Expense): void => {
    const expenses = storage.getExpenses();
    expenses.push(expense);
    storage.setExpenses(expenses);
  },

  updateExpense: (id: string, updatedExpense: Expense): void => {
    const expenses = storage.getExpenses();
    const index = expenses.findIndex((e) => e.id === id);

    if (index !== -1) {
      expenses[index] = updatedExpense;
      storage.setExpenses(expenses);
    }
  },

  deleteExpense: (id: string): void => {
    const expenses = storage.getExpenses();
    const filtered = expenses.filter((e) => e.id !== id);
    storage.setExpenses(filtered);
  },

  clearAll: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
