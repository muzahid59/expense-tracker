'use client';

import { useState } from 'react';
import {
  Clock,
  Plus,
  Trash2,
  Play,
  Pause,
  Calendar,
  Mail,
  Cloud,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { ScheduledExport, ExportSchedule } from '@/lib/exportTypes';

export default function ScheduleExports() {
  const [schedules, setSchedules] = useState<ScheduledExport[]>([
    {
      id: '1',
      templateId: 'monthly-summary',
      destination: 'email',
      frequency: 'monthly',
      nextRun: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      lastRun: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      enabled: true,
      recipients: ['user@example.com'],
    },
  ]);

  const [showNewSchedule, setShowNewSchedule] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    template: 'tax-report',
    destination: 'email',
    frequency: 'monthly' as ExportSchedule,
    recipients: '',
  });

  const handleToggleSchedule = (id: string) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === id
          ? { ...schedule, enabled: !schedule.enabled }
          : schedule
      )
    );
  };

  const handleDeleteSchedule = (id: string) => {
    if (confirm('Delete this scheduled export?')) {
      setSchedules((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleCreateSchedule = () => {
    const schedule: ScheduledExport = {
      id: Date.now().toString(),
      templateId: newSchedule.template as any,
      destination: newSchedule.destination as any,
      frequency: newSchedule.frequency,
      nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      enabled: true,
      recipients: newSchedule.recipients
        ? newSchedule.recipients.split(',').map((e) => e.trim())
        : undefined,
    };

    setSchedules((prev) => [...prev, schedule]);
    setShowNewSchedule(false);
    setNewSchedule({
      template: 'tax-report',
      destination: 'email',
      frequency: 'monthly',
      recipients: '',
    });
  };

  const getFrequencyColor = (frequency: ExportSchedule) => {
    switch (frequency) {
      case 'daily':
        return 'bg-purple-100 text-purple-700';
      case 'weekly':
        return 'bg-blue-100 text-blue-700';
      case 'monthly':
        return 'bg-green-100 text-green-700';
      case 'quarterly':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getDestinationIcon = (destination: string) => {
    switch (destination) {
      case 'email':
        return <Mail size={16} />;
      case 'google-drive':
      case 'google-sheets':
      case 'dropbox':
      case 'onedrive':
        return <Cloud size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const formatNextRun = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.ceil(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Scheduled Exports
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Automate your exports with recurring schedules
          </p>
        </div>
        <Button
          onClick={() => setShowNewSchedule(true)}
          variant="primary"
          className="flex items-center"
        >
          <Plus size={18} className="mr-2" />
          New Schedule
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
          <div className="text-2xl font-bold text-green-700">
            {schedules.filter((s) => s.enabled).length}
          </div>
          <div className="text-sm text-green-600">Active Schedules</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
          <div className="text-2xl font-bold text-blue-700">
            {schedules.length}
          </div>
          <div className="text-sm text-blue-600">Total Schedules</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
          <div className="text-2xl font-bold text-purple-700">
            {
              schedules.filter(
                (s) =>
                  s.enabled &&
                  new Date(s.nextRun) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
              ).length
            }
          </div>
          <div className="text-sm text-purple-600">Due This Week</div>
        </div>
      </div>

      {/* New Schedule Form */}
      {showNewSchedule && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4">
            Create New Schedule
          </h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template
              </label>
              <Select
                value={newSchedule.template}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, template: e.target.value })
                }
              >
                <option value="tax-report">Tax Report</option>
                <option value="monthly-summary">Monthly Summary</option>
                <option value="category-analysis">Category Analysis</option>
                <option value="expense-detail">Expense Detail</option>
                <option value="budget-review">Budget Review</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frequency
              </label>
              <Select
                value={newSchedule.frequency}
                onChange={(e) =>
                  setNewSchedule({
                    ...newSchedule,
                    frequency: e.target.value as ExportSchedule,
                  })
                }
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <Select
                value={newSchedule.destination}
                onChange={(e) =>
                  setNewSchedule({
                    ...newSchedule,
                    destination: e.target.value,
                  })
                }
              >
                <option value="email">Email</option>
                <option value="google-drive">Google Drive</option>
                <option value="google-sheets">Google Sheets</option>
                <option value="dropbox">Dropbox</option>
                <option value="onedrive">OneDrive</option>
              </Select>
            </div>
            {newSchedule.destination === 'email' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipients (comma-separated)
                </label>
                <Input
                  value={newSchedule.recipients}
                  onChange={(e) =>
                    setNewSchedule({
                      ...newSchedule,
                      recipients: e.target.value,
                    })
                  }
                  placeholder="email@example.com, another@example.com"
                />
              </div>
            )}
          </div>
          <div className="flex space-x-3">
            <Button onClick={handleCreateSchedule} variant="primary">
              Create Schedule
            </Button>
            <Button
              onClick={() => setShowNewSchedule(false)}
              variant="secondary"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Schedule List */}
      <div className="space-y-3">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className={`border-2 rounded-xl p-5 transition-all ${
              schedule.enabled
                ? 'border-green-200 bg-green-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <Calendar className="text-gray-600" size={20} />
                  <h4 className="font-semibold text-gray-900">
                    {schedule.templateId
                      .split('-')
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(' ')}
                  </h4>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${getFrequencyColor(
                      schedule.frequency
                    )}`}
                  >
                    {schedule.frequency}
                  </span>
                  {schedule.enabled ? (
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-100 text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                      Paused
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-2">
                    {getDestinationIcon(schedule.destination)}
                    <span>
                      {schedule.destination
                        .split('-')
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' ')}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Next run:</span>{' '}
                    <span className="text-blue-600">
                      {formatNextRun(schedule.nextRun)}
                    </span>
                  </div>
                  {schedule.lastRun && (
                    <div>
                      <span className="font-medium">Last run:</span>{' '}
                      {new Date(schedule.lastRun).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {schedule.recipients && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Recipients:</span>{' '}
                    {schedule.recipients.join(', ')}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleToggleSchedule(schedule.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    schedule.enabled
                      ? 'hover:bg-orange-100 text-orange-600'
                      : 'hover:bg-green-100 text-green-600'
                  }`}
                  title={schedule.enabled ? 'Pause' : 'Resume'}
                >
                  {schedule.enabled ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button
                  onClick={() => handleDeleteSchedule(schedule.id)}
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

      {schedules.length === 0 && !showNewSchedule && (
        <div className="text-center py-12">
          <Clock size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-2">No scheduled exports yet</p>
          <p className="text-sm text-gray-400 mb-4">
            Create your first automated export schedule
          </p>
          <Button
            onClick={() => setShowNewSchedule(true)}
            variant="primary"
            className="flex items-center mx-auto"
          >
            <Plus size={18} className="mr-2" />
            Create Schedule
          </Button>
        </div>
      )}

      {/* Pro Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
        <h5 className="font-medium text-purple-900 mb-2">Automation Tips</h5>
        <ul className="text-sm text-purple-700 space-y-1 list-disc list-inside">
          <li>Monthly summaries are great for regular financial reviews</li>
          <li>Tax reports can be scheduled quarterly to stay organized</li>
          <li>Email delivery ensures you never miss an important report</li>
          <li>Cloud sync keeps your data backed up automatically</li>
        </ul>
      </div>
    </div>
  );
}
