'use client';

import { useMemo } from 'react';
import { useExpenseContext } from '@/context/ExpenseContext';
import {
  Expense,
  ExpenseFilters,
  ExpenseSummary,
  CategoryTotal,
  MonthlyData,
} from '@/lib/types';
import {
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  parseISO,
  format,
} from 'date-fns';

export function useExpenses(filters?: ExpenseFilters) {
  const {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    isLoading,
  } = useExpenseContext();

  const filteredExpenses = useMemo(() => {
    if (!filters) return expenses;

    return expenses.filter((expense) => {
      if (
        filters.dateRange.startDate &&
        filters.dateRange.endDate
      ) {
        const expenseDate = parseISO(expense.date);
        const start = parseISO(filters.dateRange.startDate);
        const end = parseISO(filters.dateRange.endDate);

        if (!isWithinInterval(expenseDate, { start, end })) {
          return false;
        }
      }

      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(expense.category)
      ) {
        return false;
      }

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return expense.description
          .toLowerCase()
          .includes(query);
      }

      return true;
    });
  }, [expenses, filters]);

  const summary: ExpenseSummary = useMemo(() => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const monthlyExpenses = expenses.filter((expense) => {
      const expenseDate = parseISO(expense.date);
      return isWithinInterval(expenseDate, {
        start: monthStart,
        end: monthEnd,
      });
    });

    const totalSpending = filteredExpenses.reduce(
      (sum, e) => sum + e.amount,
      0
    );
    const monthlySpending = monthlyExpenses.reduce(
      (sum, e) => sum + e.amount,
      0
    );

    return {
      totalSpending,
      monthlySpending,
      expenseCount: filteredExpenses.length,
      averageExpense:
        filteredExpenses.length > 0
          ? totalSpending / filteredExpenses.length
          : 0,
    };
  }, [filteredExpenses, expenses]);

  const categoryTotals: CategoryTotal[] = useMemo(() => {
    const totals = filteredExpenses.reduce(
      (acc, expense) => {
        if (!acc[expense.category]) {
          acc[expense.category] = { total: 0, count: 0 };
        }
        acc[expense.category].total += expense.amount;
        acc[expense.category].count += 1;
        return acc;
      },
      {} as Record<string, { total: number; count: number }>
    );

    const totalAmount = Object.values(totals).reduce(
      (sum, { total }) => sum + total,
      0
    );

    return Object.entries(totals)
      .map(([category, { total, count }]) => ({
        category: category as Expense['category'],
        total,
        count,
        percentage:
          totalAmount > 0 ? (total / totalAmount) * 100 : 0,
      }))
      .sort((a, b) => b.total - a.total);
  }, [filteredExpenses]);

  const monthlyData: MonthlyData[] = useMemo(() => {
    const monthlyMap = expenses.reduce(
      (acc, expense) => {
        const month = format(parseISO(expense.date), 'yyyy-MM');
        if (!acc[month]) {
          acc[month] = { total: 0, count: 0 };
        }
        acc[month].total += expense.amount;
        acc[month].count += 1;
        return acc;
      },
      {} as Record<string, { total: number; count: number }>
    );

    return Object.entries(monthlyMap)
      .map(([month, { total, count }]) => ({
        month,
        total,
        count,
      }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6);
  }, [expenses]);

  return {
    expenses: filteredExpenses,
    allExpenses: expenses,
    summary,
    categoryTotals,
    monthlyData,
    addExpense,
    updateExpense,
    deleteExpense,
    isLoading,
  };
}
