'use client';

import { useState } from 'react';
import {
  Download,
  Share2,
  Trash2,
  FileText,
  Calendar,
  PieChart,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { ExportJob } from '@/lib/exportTypes';
import { format } from 'date-fns';

export default function ExportHistory() {
  // Mock export history data
  const [exportJobs] = useState<ExportJob[]>([
    {
      id: '1',
      templateId: 'tax-report',
      destination: 'google-drive',
      status: 'completed',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5000).toISOString(),
      recordCount: 147,
      fileSize: '2.3 MB',
      downloadUrl: '#',
      shareUrl: '#',
    },
    {
      id: '2',
      templateId: 'monthly-summary',
      destination: 'email',
      status: 'completed',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000 + 3000).toISOString(),
      recordCount: 89,
      fileSize: '1.8 MB',
    },
    {
      id: '3',
      templateId: 'category-analysis',
      destination: 'dropbox',
      status: 'completed',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 4000).toISOString(),
      recordCount: 203,
      fileSize: '3.1 MB',
      downloadUrl: '#',
    },
    {
      id: '4',
      templateId: 'expense-detail',
      destination: 'local',
      status: 'failed',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      recordCount: 0,
      error: 'Network connection lost during export',
    },
    {
      id: '5',
      templateId: 'budget-review',
      destination: 'google-sheets',
      status: 'processing',
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      recordCount: 156,
    },
  ]);

  const getStatusIcon = (status: ExportJob['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'failed':
        return <XCircle className="text-red-500" size={20} />;
      case 'processing':
        return <Clock className="text-blue-500 animate-pulse" size={20} />;
      default:
        return <Clock className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status: ExportJob['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTemplateIcon = (templateId: string) => {
    switch (templateId) {
      case 'tax-report':
        return <FileText size={16} />;
      case 'monthly-summary':
        return <Calendar size={16} />;
      case 'category-analysis':
        return <PieChart size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const getTemplateName = (templateId: string) => {
    const names: Record<string, string> = {
      'tax-report': 'Tax Report',
      'monthly-summary': 'Monthly Summary',
      'category-analysis': 'Category Analysis',
      'expense-detail': 'Expense Detail',
      'budget-review': 'Budget Review',
    };
    return names[templateId] || templateId;
  };

  const getDestinationName = (destination: string) => {
    const names: Record<string, string> = {
      'google-drive': 'Google Drive',
      'google-sheets': 'Google Sheets',
      dropbox: 'Dropbox',
      onedrive: 'OneDrive',
      email: 'Email',
      local: 'Local Download',
    };
    return names[destination] || destination;
  };

  const handleDownload = (job: ExportJob) => {
    alert(`Downloading export from ${format(new Date(job.createdAt), 'PPp')}`);
  };

  const handleShare = (job: ExportJob) => {
    alert(
      `Sharing export:\n\nShareable link: https://expense-tracker.app/share/${job.id}\n\nThis link would expire in 7 days.`
    );
  };

  const handleDelete = (job: ExportJob) => {
    if (confirm('Delete this export from history?')) {
      alert('Export deleted (demo)');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Export History
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            View and manage your previous exports
          </p>
        </div>
        <Button variant="secondary">Clear History</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-900">
            {exportJobs.length}
          </div>
          <div className="text-sm text-gray-500">Total Exports</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-700">
            {exportJobs.filter((j) => j.status === 'completed').length}
          </div>
          <div className="text-sm text-green-600">Completed</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-700">
            {exportJobs.filter((j) => j.status === 'processing').length}
          </div>
          <div className="text-sm text-blue-600">In Progress</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-700">
            {exportJobs.filter((j) => j.status === 'failed').length}
          </div>
          <div className="text-sm text-red-600">Failed</div>
        </div>
      </div>

      {/* Export List */}
      <div className="space-y-3">
        {exportJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="mt-1">{getStatusIcon(job.status)}</div>

                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center space-x-2 text-gray-700">
                      {getTemplateIcon(job.templateId)}
                      <h4 className="font-semibold">
                        {getTemplateName(job.templateId)}
                      </h4>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Destination:</span>{' '}
                      {getDestinationName(job.destination)}
                    </div>
                    <div>
                      <span className="font-medium">Records:</span>{' '}
                      {job.recordCount}
                    </div>
                    {job.fileSize && (
                      <div>
                        <span className="font-medium">Size:</span>{' '}
                        {job.fileSize}
                      </div>
                    )}
                    <div>
                      <span className="font-medium">Created:</span>{' '}
                      {format(new Date(job.createdAt), 'MMM dd, HH:mm')}
                    </div>
                  </div>

                  {job.error && (
                    <div className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                      Error: {job.error}
                    </div>
                  )}

                  {job.completedAt && (
                    <div className="mt-2 text-xs text-gray-500">
                      Completed in{' '}
                      {Math.round(
                        (new Date(job.completedAt).getTime() -
                          new Date(job.createdAt).getTime()) /
                          1000
                      )}
                      s
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                {job.status === 'completed' && (
                  <>
                    {job.downloadUrl && (
                      <button
                        onClick={() => handleDownload(job)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download size={18} className="text-gray-600" />
                      </button>
                    )}
                    {job.shareUrl && (
                      <button
                        onClick={() => handleShare(job)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Share"
                      >
                        <Share2 size={18} className="text-gray-600" />
                      </button>
                    )}
                    {job.destination !== 'local' && (
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Open in destination"
                      >
                        <ExternalLink size={18} className="text-gray-600" />
                      </button>
                    )}
                  </>
                )}
                <button
                  onClick={() => handleDelete(job)}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} className="text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {exportJobs.length === 0 && (
        <div className="text-center py-12">
          <Clock size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No export history yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Your exports will appear here
          </p>
        </div>
      )}
    </div>
  );
}
