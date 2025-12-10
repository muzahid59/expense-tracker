'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { CategoryTotal } from '@/lib/types';
import { CATEGORY_COLORS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import Card from '@/components/ui/Card';

interface CategoryChartProps {
  data: CategoryTotal[];
}

export default function CategoryChart({
  data,
}: CategoryChartProps) {
  const chartData = data.map((item) => ({
    name: item.category,
    value: item.total,
    percentage: item.percentage,
  }));

  if (data.length === 0) {
    return (
      <Card>
        <h2 className="text-xl font-semibold mb-4">
          Spending by Category
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
        Spending by Category
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) =>
                  `${name} ${percentage.toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={CATEGORY_COLORS[entry.name]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) =>
                  formatCurrency(value)
                }
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          {data.map((item) => (
            <div
              key={item.category}
              className="flex items-center gap-2"
            >
              <div
                className="w-4 h-4 rounded"
                style={{
                  backgroundColor: CATEGORY_COLORS[item.category],
                }}
              />
              <span className="text-sm text-gray-700">
                {item.category}:{' '}
                <span className="font-medium">
                  {formatCurrency(item.total)}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
