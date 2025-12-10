import { Expense } from './types';
import { formatDate } from './utils';
import Papa from 'papaparse';

export function exportToCSV(
  expenses: Expense[],
  filename: string = 'expenses.csv'
) {
  const csvData = expenses.map((expense) => ({
    Date: formatDate(expense.date),
    Amount: expense.amount.toFixed(2),
    Category: expense.category,
    Description: expense.description,
  }));

  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
