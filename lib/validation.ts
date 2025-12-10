import { z } from 'zod';

export const expenseSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  amount: z
    .number({ message: 'Amount must be a number' })
    .positive('Amount must be positive')
    .min(0.01, 'Amount must be at least $0.01')
    .max(999999.99, 'Amount is too large'),
  category: z.enum(['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Other']),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(200, 'Description must be less than 200 characters')
    .trim(),
});

export type ExpenseSchemaType = z.infer<typeof expenseSchema>;
