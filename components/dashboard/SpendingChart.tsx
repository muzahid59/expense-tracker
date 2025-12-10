'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MonthlyData } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import Card from '@/components/ui/Card';

interface SpendingChartProps {
  data: MonthlyData[];
}

export default function SpendingChart({
  data,
}: SpendingChartProps) {
  const chartData = data.map((item) => ({
    month: format(parseISO(`${item.month}-01`), 'MMM yy'),
    total: item.total,
  }));

  if (data.length === 0) {
    return (
      <Card>
        <h2 className="text-xl font-semibold mb-4">
          Monthly Spending
        </h2>
        <div className="h-[300px] flex items-center justify-center text-gray-500">
          No data available
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">
        Monthly Spending
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Bar dataKey="total" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
