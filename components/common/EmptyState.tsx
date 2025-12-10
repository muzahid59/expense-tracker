import { FileX } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({
  title = 'No expenses found',
  message = "You haven't added any expenses yet. Start tracking your spending by adding your first expense.",
  actionLabel = 'Add Expense',
  actionHref = '/add-expense',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <FileX className="text-gray-300" size={64} />
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-500 text-center max-w-md">
        {message}
      </p>
      {actionHref && (
        <Link href={actionHref} className="mt-6">
          <Button>{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}
