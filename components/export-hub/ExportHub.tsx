'use client';

import { useState } from 'react';
import { X, FileText, Cloud, History, Clock, Share2 } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import ExportTemplates from './ExportTemplates';
import CloudIntegrations from './CloudIntegrations';
import ExportHistory from './ExportHistory';
import ScheduleExports from './ScheduleExports';
import ShareExports from './ShareExports';
import { Expense } from '@/lib/types';

interface ExportHubProps {
  isOpen: boolean;
  onClose: () => void;
  expenses: Expense[];
}

type TabId = 'templates' | 'integrations' | 'history' | 'schedule' | 'share';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export default function ExportHub({
  isOpen,
  onClose,
  expenses,
}: ExportHubProps) {
  const [activeTab, setActiveTab] = useState<TabId>('templates');

  const tabs: Tab[] = [
    {
      id: 'templates',
      label: 'Templates',
      icon: <FileText size={18} />,
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: <Cloud size={18} />,
      badge: 2,
    },
    {
      id: 'history',
      label: 'History',
      icon: <History size={18} />,
    },
    {
      id: 'schedule',
      label: 'Schedule',
      icon: <Clock size={18} />,
      badge: 1,
    },
    {
      id: 'share',
      label: 'Share',
      icon: <Share2 size={18} />,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-6xl w-full">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Export Hub
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Export, sync, and share your expense data across platforms
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 mt-4 border-b border-gray-200 -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors relative ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 min-h-[500px] max-h-[70vh] overflow-y-auto">
            {activeTab === 'templates' && (
              <ExportTemplates expenses={expenses} />
            )}
            {activeTab === 'integrations' && (
              <CloudIntegrations expenses={expenses} />
            )}
            {activeTab === 'history' && <ExportHistory />}
            {activeTab === 'schedule' && <ScheduleExports />}
            {activeTab === 'share' && <ShareExports expenses={expenses} />}
          </div>
        </div>
      </div>
    </div>
  );
}
