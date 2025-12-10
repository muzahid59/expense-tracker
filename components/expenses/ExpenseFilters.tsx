'use client';

import { ExpenseFilters as ExpenseFiltersType } from '@/lib/types';
import { EXPENSE_CATEGORIES } from '@/lib/constants';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { X, Search } from 'lucide-react';

interface ExpenseFiltersProps {
  filters: ExpenseFiltersType;
  onDateRangeChange: (
    startDate: string | null,
    endDate: string | null
  ) => void;
  onCategoriesChange: (
    categories: ExpenseFiltersType['categories']
  ) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

export default function ExpenseFilters({
  filters,
  onDateRangeChange,
  onCategoriesChange,
  onSearchChange,
  onClearFilters,
}: ExpenseFiltersProps) {
  const toggleCategory = (
    category: typeof EXPENSE_CATEGORIES[number]
  ) => {
    const newCategories = filters.categories.includes(
      category
    )
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onCategoriesChange(newCategories);
  };

  const hasActiveFilters =
    filters.dateRange.startDate ||
    filters.dateRange.endDate ||
    filters.categories.length > 0 ||
    filters.searchQuery;

  return (
    <Card className="mb-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Filters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            value={filters.dateRange.startDate || ''}
            onChange={(e) =>
              onDateRangeChange(
                e.target.value || null,
                filters.dateRange.endDate
              )
            }
          />

          <Input
            label="End Date"
            type="date"
            value={filters.dateRange.endDate || ''}
            onChange={(e) =>
              onDateRangeChange(
                filters.dateRange.startDate,
                e.target.value || null
              )
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categories
          </label>
          <div className="flex flex-wrap gap-2">
            {EXPENSE_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filters.categories.includes(category)
                    ? 'bg-primary-100 text-primary-700 border-2 border-primary-600'
                    : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <Input
            label="Search"
            type="text"
            placeholder="Search by description..."
            value={filters.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Search
            className="absolute right-3 top-9 text-gray-400"
            size={20}
          />
        </div>

        {hasActiveFilters && (
          <Button
            variant="secondary"
            onClick={onClearFilters}
            fullWidth
          >
            <div className="flex items-center justify-center gap-2">
              <X size={18} />
              Clear All Filters
            </div>
          </Button>
        )}
      </div>
    </Card>
  );
}
