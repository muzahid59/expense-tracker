'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Expense, ExpenseFormData } from '@/lib/types';
import { storage } from '@/lib/storage';

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (data: ExpenseFormData) => void;
  updateExpense: (id: string, data: ExpenseFormData) => void;
  deleteExpense: (id: string) => void;
  isLoading: boolean;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(
  undefined
);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedExpenses = storage.getExpenses();
    setExpenses(loadedExpenses);
    setIsLoading(false);
  }, []);

  const addExpense = (data: ExpenseFormData) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    storage.addExpense(newExpense);
    setExpenses((prev) => [...prev, newExpense]);
  };

  const updateExpense = (id: string, data: ExpenseFormData) => {
    const expense = expenses.find((e) => e.id === id);
    if (!expense) return;

    const updatedExpense: Expense = {
      ...expense,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    storage.updateExpense(id, updatedExpense);
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? updatedExpense : e))
    );
  };

  const deleteExpense = (id: string) => {
    storage.deleteExpense(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
        isLoading,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenseContext() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error(
      'useExpenseContext must be used within ExpenseProvider'
    );
  }
  return context;
}
