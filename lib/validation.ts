import { z } from 'zod';
import { EXPENSE_CATEGORIES } from './constants';

export const expenseSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  amount: z
    .number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    })
    .positive('Amount must be positive')
    .min(0.01, 'Amount must be at least $0.01')
    .max(999999.99, 'Amount is too large'),
  category: z.enum(EXPENSE_CATEGORIES as [string, ...string[]], {
    errorMap: () => ({ message: 'Please select a valid category' }),
  }),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(200, 'Description must be less than 200 characters')
    .trim(),
});

export type ExpenseSchemaType = z.infer<typeof expenseSchema>;
