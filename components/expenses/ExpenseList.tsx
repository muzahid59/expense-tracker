'use client';

import { Expense, ExpenseFormData } from '@/lib/types';
import ExpenseItem from './ExpenseItem';
import EmptyState from '@/components/common/EmptyState';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (id: string, data: ExpenseFormData) => void;
  onDelete: (id: string) => void;
}

export default function ExpenseList({
  expenses,
  onEdit,
  onDelete,
}: ExpenseListProps) {
  const sortedExpenses = [...expenses].sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (expenses.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3">
      {sortedExpenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
