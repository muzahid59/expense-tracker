'use client';

import { useExpenses } from '@/hooks/useExpenses';
import Container from '@/components/layout/Container';
import SummaryCard from '@/components/dashboard/SummaryCard';
import SpendingChart from '@/components/dashboard/SpendingChart';
import CategoryChart from '@/components/dashboard/CategoryChart';
import RecentExpenses from '@/components/dashboard/RecentExpenses';
import EmptyState from '@/components/common/EmptyState';

export default function DashboardPage() {
  const {
    summary,
    categoryTotals,
    monthlyData,
    allExpenses,
    isLoading,
  } = useExpenses();

  if (isLoading) {
    return (
      <Container>
        <div className="py-8">
          <div className="text-center text-gray-500">
            Loading dashboard...
          </div>
        </div>
      </Container>
    );
  }

  if (allExpenses.length === 0) {
    return (
      <Container>
        <div className="py-8">
          <EmptyState
            title="Welcome to Expense Tracker!"
            message="Start managing your finances by adding your first expense. Track your spending, view analytics, and stay on top of your budget."
          />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SummaryCard
            title="Total Spending"
            value={summary.totalSpending}
            icon="dollar"
            trend={null}
          />
          <SummaryCard
            title="Monthly Spending"
            value={summary.monthlySpending}
            icon="calendar"
            trend={null}
          />
          <SummaryCard
            title="Total Expenses"
            value={summary.expenseCount}
            icon="list"
            trend={null}
            isCount
          />
          <SummaryCard
            title="Average Expense"
            value={summary.averageExpense}
            icon="chart"
            trend={null}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SpendingChart data={monthlyData} />
          <CategoryChart data={categoryTotals} />
        </div>

        <RecentExpenses expenses={allExpenses} />
      </div>
    </Container>
  );
}
