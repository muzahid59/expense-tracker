import Link from 'next/link';
import { Expense } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CATEGORY_ICONS } from '@/lib/constants';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

interface RecentExpensesProps {
  expenses: Expense[];
}

export default function RecentExpenses({
  expenses,
}: RecentExpensesProps) {
  const recentExpenses = [...expenses]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 5);

  if (expenses.length === 0) {
    return (
      <Card>
        <h2 className="text-xl font-semibold mb-4">
          Recent Expenses
        </h2>
        <div className="text-center py-8 text-gray-500">
          No expenses yet. Start tracking your spending!
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          Recent Expenses
        </h2>
        <Link href="/expenses">
          <Button variant="secondary">
            <div className="flex items-center gap-1">
              View All
              <ArrowRight size={16} />
            </div>
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {recentExpenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {CATEGORY_ICONS[expense.category]}
              </span>
              <div>
                <p className="font-medium text-gray-900">
                  {expense.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge category={expense.category}>
                    {expense.category}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {formatDate(expense.date)}
                  </span>
                </div>
              </div>
            </div>
            <span className="font-semibold text-gray-900">
              {formatCurrency(expense.amount)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
