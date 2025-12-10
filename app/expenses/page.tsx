'use client';

import { useExpenses } from '@/hooks/useExpenses';
import { useFilters } from '@/hooks/useFilters';
import Container from '@/components/layout/Container';
import ExpenseList from '@/components/expenses/ExpenseList';
import ExpenseFilters from '@/components/expenses/ExpenseFilters';
import Button from '@/components/ui/Button';
import { exportToCSV } from '@/lib/exports';
import { Download } from 'lucide-react';

export default function ExpensesPage() {
  const {
    filters,
    setDateRange,
    setCategories,
    setSearchQuery,
    clearFilters,
  } = useFilters();

  const {
    expenses,
    allExpenses,
    updateExpense,
    deleteExpense,
    isLoading,
  } = useExpenses(filters);

  const handleExport = () => {
    exportToCSV(
      expenses,
      `expenses-${new Date().toISOString().split('T')[0]}.csv`
    );
  };

  if (isLoading) {
    return (
      <Container>
        <div className="py-8">
          <div className="text-center text-gray-500">
            Loading expenses...
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Expenses
            </h1>
            <p className="text-gray-500 mt-1">
              Showing {expenses.length} of {allExpenses.length}{' '}
              expenses
            </p>
          </div>
          {expenses.length > 0 && (
            <Button
              onClick={handleExport}
              variant="secondary"
            >
              <div className="flex items-center gap-2">
                <Download size={18} />
                Export CSV
              </div>
            </Button>
          )}
        </div>

        <ExpenseFilters
          filters={filters}
          onDateRangeChange={setDateRange}
          onCategoriesChange={setCategories}
          onSearchChange={setSearchQuery}
          onClearFilters={clearFilters}
        />

        <ExpenseList
          expenses={expenses}
          onEdit={updateExpense}
          onDelete={deleteExpense}
        />
      </div>
    </Container>
  );
}
