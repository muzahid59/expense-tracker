// Export template types and configurations
export type ExportTemplate =
  | 'tax-report'
  | 'monthly-summary'
  | 'category-analysis'
  | 'expense-detail'
  | 'budget-review'
  | 'custom';

export type CloudProvider =
  | 'google-sheets'
  | 'google-drive'
  | 'dropbox'
  | 'onedrive'
  | 'email'
  | 'webhook';

export type ExportSchedule =
  | 'none'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'quarterly';

export interface ExportTemplateConfig {
  id: ExportTemplate;
  name: string;
  description: string;
  icon: string;
  format: 'csv' | 'pdf' | 'xlsx' | 'json';
  includeFields: string[];
  groupBy?: string;
  sortBy?: string;
}

export interface CloudIntegration {
  id: CloudProvider;
  name: string;
  description: string;
  icon: string;
  connected: boolean;
  lastSync?: string;
  status: 'active' | 'inactive' | 'error' | 'syncing';
}

export interface ExportJob {
  id: string;
  templateId: ExportTemplate;
  destination: CloudProvider | 'local';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  recordCount: number;
  fileSize?: string;
  downloadUrl?: string;
  shareUrl?: string;
  error?: string;
}

export interface ScheduledExport {
  id: string;
  templateId: ExportTemplate;
  destination: CloudProvider | 'local';
  frequency: ExportSchedule;
  nextRun: string;
  lastRun?: string;
  enabled: boolean;
  recipients?: string[];
}

export const EXPORT_TEMPLATES: ExportTemplateConfig[] = [
  {
    id: 'tax-report',
    name: 'Tax Report',
    description: 'IRS-ready expense report with categories and totals',
    icon: 'FileText',
    format: 'pdf',
    includeFields: ['date', 'category', 'description', 'amount', 'notes'],
    groupBy: 'category',
    sortBy: 'date',
  },
  {
    id: 'monthly-summary',
    name: 'Monthly Summary',
    description: 'Month-over-month spending trends and insights',
    icon: 'Calendar',
    format: 'pdf',
    includeFields: ['month', 'total', 'category', 'average'],
    groupBy: 'month',
  },
  {
    id: 'category-analysis',
    name: 'Category Analysis',
    description: 'Detailed breakdown by expense category',
    icon: 'PieChart',
    format: 'xlsx',
    includeFields: ['category', 'total', 'count', 'percentage'],
    groupBy: 'category',
  },
  {
    id: 'expense-detail',
    name: 'Detailed Export',
    description: 'Complete expense data with all fields',
    icon: 'List',
    format: 'csv',
    includeFields: ['date', 'category', 'description', 'amount', 'createdAt', 'updatedAt'],
    sortBy: 'date',
  },
  {
    id: 'budget-review',
    name: 'Budget Review',
    description: 'Compare actual spending vs budget targets',
    icon: 'TrendingUp',
    format: 'pdf',
    includeFields: ['category', 'actual', 'budget', 'variance'],
    groupBy: 'category',
  },
  {
    id: 'custom',
    name: 'Custom Export',
    description: 'Build your own export with custom fields',
    icon: 'Settings',
    format: 'json',
    includeFields: [],
  },
];

export const CLOUD_INTEGRATIONS: CloudIntegration[] = [
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    description: 'Export directly to Google Sheets for easy collaboration',
    icon: 'Sheet',
    connected: false,
    status: 'inactive',
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Automatically backup exports to Google Drive',
    icon: 'Cloud',
    connected: false,
    status: 'inactive',
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'Sync expense reports to your Dropbox account',
    icon: 'Box',
    connected: false,
    status: 'inactive',
  },
  {
    id: 'onedrive',
    name: 'OneDrive',
    description: 'Store exports in Microsoft OneDrive',
    icon: 'Cloud',
    connected: false,
    status: 'inactive',
  },
  {
    id: 'email',
    name: 'Email Delivery',
    description: 'Send reports directly to your inbox',
    icon: 'Mail',
    connected: true,
    status: 'active',
  },
  {
    id: 'webhook',
    name: 'Webhook',
    description: 'Send data to custom API endpoints',
    icon: 'Zap',
    connected: false,
    status: 'inactive',
  },
];
