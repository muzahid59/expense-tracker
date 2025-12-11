'use client';

import { useState } from 'react';
import {
  FileText,
  Calendar,
  PieChart,
  List,
  TrendingUp,
  Settings,
  Download,
  Sparkles,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Expense } from '@/lib/types';
import { EXPORT_TEMPLATES, ExportTemplateConfig } from '@/lib/exportTypes';

interface ExportTemplatesProps {
  expenses: Expense[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  FileText: <FileText size={32} />,
  Calendar: <Calendar size={32} />,
  PieChart: <PieChart size={32} />,
  List: <List size={32} />,
  TrendingUp: <TrendingUp size={32} />,
  Settings: <Settings size={32} />,
};

export default function ExportTemplates({ expenses }: ExportTemplatesProps) {
  const [selectedTemplate, setSelectedTemplate] =
    useState<ExportTemplateConfig | null>(null);

  const handleExportWithTemplate = (template: ExportTemplateConfig) => {
    // Simulate export process
    const fileName = `${template.id}-${Date.now()}.${template.format}`;
    alert(
      `Exporting ${expenses.length} expenses using "${template.name}" template\nFormat: ${template.format.toUpperCase()}\nFile: ${fileName}\n\nThis is a demo - in production, this would generate the actual file.`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Export Templates
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Pre-configured export formats for common use cases
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm bg-purple-50 text-purple-700 px-3 py-2 rounded-lg">
          <Sparkles size={16} />
          <span className="font-medium">AI-Enhanced</span>
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {EXPORT_TEMPLATES.map((template) => (
          <div
            key={template.id}
            className={`border-2 rounded-xl p-5 transition-all cursor-pointer hover:shadow-lg ${
              selectedTemplate?.id === template.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedTemplate(template)}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`p-3 rounded-lg ${
                  selectedTemplate?.id === template.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {ICON_MAP[template.icon]}
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  template.format === 'pdf'
                    ? 'bg-red-100 text-red-700'
                    : template.format === 'xlsx'
                    ? 'bg-green-100 text-green-700'
                    : template.format === 'csv'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {template.format.toUpperCase()}
              </span>
            </div>

            <h4 className="font-semibold text-gray-900 mb-2">
              {template.name}
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              {template.description}
            </p>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{template.includeFields.length} fields</span>
              {template.groupBy && (
                <span className="bg-gray-100 px-2 py-1 rounded">
                  Grouped by {template.groupBy}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Template Actions */}
      {selectedTemplate && (
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Ready to export: {selectedTemplate.name}
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  This will export {expenses.length} expenses in{' '}
                  {selectedTemplate.format.toUpperCase()} format
                  {selectedTemplate.groupBy &&
                    ` grouped by ${selectedTemplate.groupBy}`}
                  .
                </p>

                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => handleExportWithTemplate(selectedTemplate)}
                    variant="primary"
                    className="flex items-center"
                  >
                    <Download size={18} className="mr-2" />
                    Download Now
                  </Button>
                  <Button
                    onClick={() =>
                      alert(
                        'Email delivery feature coming soon!\n\nYou would be able to send this report to any email address.'
                      )
                    }
                    variant="secondary"
                  >
                    Email This Report
                  </Button>
                  <Button
                    onClick={() =>
                      alert(
                        'Schedule feature coming soon!\n\nYou would be able to schedule this report to run automatically.'
                      )
                    }
                    variant="secondary"
                  >
                    Schedule Export
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Sparkles className="text-blue-600 mt-0.5" size={20} />
          <div>
            <h5 className="font-medium text-blue-900 mb-1">Pro Tip</h5>
            <p className="text-sm text-blue-700">
              Tax Report template is optimized for IRS submissions. Monthly
              Summary includes trend analysis and spending insights powered by
              AI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
