'use client';

import { useRouter } from 'next/navigation';
import { useExpenseContext } from '@/context/ExpenseContext';
import Container from '@/components/layout/Container';
import ExpenseForm from '@/components/expenses/ExpenseForm';
import { ExpenseFormData } from '@/lib/types';

export default function AddExpensePage() {
  const router = useRouter();
  const { addExpense } = useExpenseContext();

  const handleSubmit = (data: ExpenseFormData) => {
    addExpense(data);
    router.push('/expenses');
  };

  return (
    <Container>
      <div className="py-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Add New Expense
        </h1>
        <ExpenseForm onSubmit={handleSubmit} />
      </div>
    </Container>
  );
}
