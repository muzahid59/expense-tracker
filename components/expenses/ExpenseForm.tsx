'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  expenseSchema,
  ExpenseSchemaType,
} from '@/lib/validation';
import { EXPENSE_CATEGORIES } from '@/lib/constants';
import { ExpenseFormData } from '@/lib/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => void;
  defaultValues?: Partial<ExpenseFormData>;
  submitLabel?: string;
  onCancel?: () => void;
}

export default function ExpenseForm({
  onSubmit,
  defaultValues,
  submitLabel = 'Add Expense',
  onCancel,
}: ExpenseFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ExpenseSchemaType>({
    resolver: zodResolver(expenseSchema),
    defaultValues: defaultValues || {
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      category: 'Other',
      description: '',
    },
  });

  const onSubmitForm = async (data: ExpenseSchemaType) => {
    onSubmit(data);
    if (!defaultValues) {
      reset();
    }
  };

  return (
    <Card>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="space-y-6"
      >
        <Input
          label="Date"
          type="date"
          {...register('date')}
          error={errors.date?.message}
        />

        <Input
          label="Amount ($)"
          type="number"
          step="0.01"
          placeholder="0.00"
          {...register('amount', { valueAsNumber: true })}
          error={errors.amount?.message}
        />

        <Select
          label="Category"
          {...register('category')}
          error={errors.category?.message}
        >
          {EXPENSE_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register('description')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows={3}
            placeholder="Enter expense description..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            fullWidth
          >
            {isSubmitting ? 'Submitting...' : submitLabel}
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              fullWidth
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
