'use client';

import { useState } from 'react';
import {
  Cloud,
  Mail,
  Zap,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Plus,
  Settings as SettingsIcon,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Expense } from '@/lib/types';
import { CLOUD_INTEGRATIONS, CloudIntegration } from '@/lib/exportTypes';

interface CloudIntegrationsProps {
  expenses: Expense[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Sheet: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h3v3H7V7zm0 5h3v3H7v-3zm5-5h5v3h-5V7zm0 5h5v3h-5v-3z" />
    </svg>
  ),
  Cloud: <Cloud size={32} />,
  Box: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 4H3v16h18V4zM9 18H5v-4h4v4zm0-6H5V8h4v4zm10 6h-8v-4h8v4zm0-6h-8V8h8v4z" />
    </svg>
  ),
  Mail: <Mail size={32} />,
  Zap: <Zap size={32} />,
};

export default function CloudIntegrations({
  expenses,
}: CloudIntegrationsProps) {
  const [integrations, setIntegrations] =
    useState<CloudIntegration[]>(CLOUD_INTEGRATIONS);
  const [selectedIntegration, setSelectedIntegration] =
    useState<CloudIntegration | null>(null);

  const handleConnect = (integration: CloudIntegration) => {
    // Simulate OAuth flow
    alert(
      `Connecting to ${integration.name}...\n\nIn production, this would:\n1. Open OAuth consent window\n2. Request necessary permissions\n3. Store access tokens securely\n4. Enable automatic syncing\n\nDemo: Connection successful!`
    );

    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === integration.id
          ? {
              ...int,
              connected: true,
              status: 'active' as const,
              lastSync: new Date().toISOString(),
            }
          : int
      )
    );
  };

  const handleDisconnect = (integration: CloudIntegration) => {
    if (
      confirm(
        `Disconnect from ${integration.name}?\n\nScheduled exports will be paused.`
      )
    ) {
      setIntegrations((prev) =>
        prev.map((int) =>
          int.id === integration.id
            ? { ...int, connected: false, status: 'inactive' as const }
            : int
        )
      );
    }
  };

  const handleSync = (integration: CloudIntegration) => {
    alert(
      `Syncing ${expenses.length} expenses to ${integration.name}...\n\nThis would:\n- Upload new/modified expenses\n- Update existing records\n- Generate sync report\n\nDemo: Sync complete!`
    );

    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === integration.id
          ? { ...int, lastSync: new Date().toISOString() }
          : int
      )
    );
  };

  const getStatusColor = (status: CloudIntegration['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'syncing':
        return 'bg-blue-100 text-blue-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: CloudIntegration['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={16} />;
      case 'syncing':
        return <RefreshCw size={16} className="animate-spin" />;
      case 'error':
        return <AlertCircle size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Cloud Integrations
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Connect your favorite cloud services for automatic syncing and backup
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
          <div className="text-2xl font-bold text-green-700">
            {integrations.filter((i) => i.connected).length}
          </div>
          <div className="text-sm text-green-600">Connected</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
          <div className="text-2xl font-bold text-blue-700">
            {integrations.filter((i) => i.status === 'active').length}
          </div>
          <div className="text-sm text-blue-600">Active Syncs</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
          <div className="text-2xl font-bold text-purple-700">
            {integrations.length}
          </div>
          <div className="text-sm text-purple-600">Available</div>
        </div>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-gray-700">{ICON_MAP[integration.icon]}</div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {integration.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {integration.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div
                className={`flex items-center space-x-2 text-xs font-medium px-3 py-1.5 rounded-full ${getStatusColor(
                  integration.status
                )}`}
              >
                {getStatusIcon(integration.status)}
                <span className="capitalize">{integration.status}</span>
              </div>
              {integration.lastSync && (
                <span className="text-xs text-gray-500">
                  Last sync:{' '}
                  {new Date(integration.lastSync).toLocaleTimeString()}
                </span>
              )}
            </div>

            <div className="flex space-x-2">
              {!integration.connected ? (
                <Button
                  onClick={() => handleConnect(integration)}
                  variant="primary"
                  className="flex-1 flex items-center justify-center"
                >
                  <Plus size={16} className="mr-2" />
                  Connect
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => handleSync(integration)}
                    variant="primary"
                    className="flex-1 flex items-center justify-center"
                  >
                    <RefreshCw size={16} className="mr-2" />
                    Sync Now
                  </Button>
                  <Button
                    onClick={() => setSelectedIntegration(integration)}
                    variant="secondary"
                  >
                    <SettingsIcon size={16} />
                  </Button>
                  <Button
                    onClick={() => handleDisconnect(integration)}
                    variant="secondary"
                    className="text-red-600 hover:bg-red-50"
                  >
                    Disconnect
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Integration */}
      <button className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 hover:bg-blue-50 transition-all group">
        <div className="flex items-center justify-center space-x-3 text-gray-500 group-hover:text-blue-600">
          <Plus size={24} />
          <span className="font-medium">Add Custom Integration</span>
        </div>
        <p className="text-sm text-gray-400 mt-2">
          Connect via Webhook, API, or Zapier
        </p>
      </button>

      {/* Selected Integration Settings */}
      {selectedIntegration && (
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">
              {selectedIntegration.name} Settings
            </h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Auto-sync on expense creation
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Daily backup at 2:00 AM
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Send sync notification emails
                </span>
              </label>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Button
                onClick={() => setSelectedIntegration(null)}
                variant="secondary"
                className="w-full"
              >
                Close Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
