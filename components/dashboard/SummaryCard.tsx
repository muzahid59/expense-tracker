import Card from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import {
  DollarSign,
  Calendar,
  List,
  TrendingUp,
} from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: number;
  icon: 'dollar' | 'calendar' | 'list' | 'chart';
  trend?: number | null;
  isCount?: boolean;
}

const iconMap = {
  dollar: DollarSign,
  calendar: Calendar,
  list: List,
  chart: TrendingUp,
};

export default function SummaryCard({
  title,
  value,
  icon,
  trend,
  isCount = false,
}: SummaryCardProps) {
  const Icon = iconMap[icon];

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {isCount ? value : formatCurrency(value)}
          </p>
        </div>
        <div className="p-3 bg-primary-100 rounded-lg">
          <Icon className="text-primary-600" size={24} />
        </div>
      </div>
    </Card>
  );
}
