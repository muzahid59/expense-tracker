import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ExpenseCategory } from '@/lib/types';
import { CATEGORY_COLORS } from '@/lib/constants';

interface BadgeProps {
  children: ReactNode;
  category?: ExpenseCategory;
  className?: string;
}

export default function Badge({
  children,
  category,
  className,
}: BadgeProps) {
  const bgColor = category
    ? CATEGORY_COLORS[category]
    : undefined;

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        !category && 'bg-gray-100 text-gray-800',
        className
      )}
      style={
        bgColor
          ? {
              backgroundColor: bgColor + '20',
              color: bgColor,
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}
