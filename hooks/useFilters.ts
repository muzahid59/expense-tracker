'use client';

import { useState, useCallback } from 'react';
import { ExpenseFilters, ExpenseCategory } from '@/lib/types';

export function useFilters() {
  const [filters, setFilters] = useState<ExpenseFilters>({
    dateRange: { startDate: null, endDate: null },
    categories: [],
    searchQuery: '',
  });

  const setDateRange = useCallback(
    (startDate: string | null, endDate: string | null) => {
      setFilters((prev) => ({
        ...prev,
        dateRange: { startDate, endDate },
      }));
    },
    []
  );

  const setCategories = useCallback(
    (categories: ExpenseCategory[]) => {
      setFilters((prev) => ({
        ...prev,
        categories,
      }));
    },
    []
  );

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      dateRange: { startDate: null, endDate: null },
      categories: [],
      searchQuery: '',
    });
  }, []);

  return {
    filters,
    setDateRange,
    setCategories,
    setSearchQuery,
    clearFilters,
  };
}
