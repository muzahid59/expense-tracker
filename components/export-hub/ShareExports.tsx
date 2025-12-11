'use client';

import { useState } from 'react';
import {
  Share2,
  Link2,
  QrCode,
  Copy,
  Mail,
  Twitter,
  Facebook,
  Linkedin,
  CheckCircle,
  Users,
  Lock,
  Globe,
  Eye,
  Download,
  Calendar,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Expense } from '@/lib/types';

interface ShareExportsProps {
  expenses: Expense[];
}

export default function ShareExports({ expenses }: ShareExportsProps) {
  const [shareLink, setShareLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [shareSettings, setShareSettings] = useState({
    template: 'monthly-summary',
    privacy: 'private',
    expiryDays: '7',
    password: '',
    allowDownload: true,
  });

  const handleGenerateLink = () => {
    const randomId = Math.random().toString(36).substring(2, 15);
    const link = `https://expense-tracker.app/share/${randomId}`;
    setShareLink(link);
  };

  const handleCopyLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const handleShareViaEmail = () => {
    const subject = encodeURIComponent('Expense Report - Shared with you');
    const body = encodeURIComponent(
      `I've shared an expense report with you.\n\nView it here: ${shareLink}\n\nThis link will expire in ${shareSettings.expiryDays} days.`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const handleShareViaSocial = (platform: string) => {
    const text = encodeURIComponent('Check out my expense report');
    const url = encodeURIComponent(shareLink);

    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'facebook':
        shareUrl = `https://facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const generateQRCode = () => {
    // This would normally use a QR code library
    // For demo purposes, we'll show a placeholder
    alert(
      `QR Code would be generated for:\n${shareLink}\n\nIn production, this would use a library like qrcode.react or react-qr-code`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Share & Collaborate
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Generate shareable links and QR codes for your expense data
        </p>
      </div>

      {/* Share Configuration */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Settings className="mr-2" size={20} />
          Share Settings
        </h4>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Template
            </label>
            <Select
              value={shareSettings.template}
              onChange={(e) =>
                setShareSettings({ ...shareSettings, template: e.target.value })
              }
            >
              <option value="monthly-summary">Monthly Summary</option>
              <option value="category-analysis">Category Analysis</option>
              <option value="tax-report">Tax Report</option>
              <option value="expense-detail">Expense Detail</option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Privacy Level
            </label>
            <Select
              value={shareSettings.privacy}
              onChange={(e) =>
                setShareSettings({ ...shareSettings, privacy: e.target.value })
              }
            >
              <option value="private">Private (Link only)</option>
              <option value="password">Password Protected</option>
              <option value="public">Public (Anyone can view)</option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link Expires In
            </label>
            <Select
              value={shareSettings.expiryDays}
              onChange={(e) =>
                setShareSettings({
                  ...shareSettings,
                  expiryDays: e.target.value,
                })
              }
            >
              <option value="1">1 Day</option>
              <option value="7">7 Days</option>
              <option value="30">30 Days</option>
              <option value="never">Never</option>
            </Select>
          </div>

          {shareSettings.privacy === 'password' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                value={shareSettings.password}
                onChange={(e) =>
                  setShareSettings({
                    ...shareSettings,
                    password: e.target.value,
                  })
                }
                placeholder="Enter password"
              />
            </div>
          )}

          <div className="col-span-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={shareSettings.allowDownload}
                onChange={(e) =>
                  setShareSettings({
                    ...shareSettings,
                    allowDownload: e.target.checked,
                  })
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Allow recipients to download the export
              </span>
            </label>
          </div>
        </div>

        <Button
          onClick={handleGenerateLink}
          variant="primary"
          className="w-full flex items-center justify-center"
        >
          <Share2 size={18} className="mr-2" />
          Generate Shareable Link
        </Button>
      </div>

      {/* Generated Link */}
      {shareLink && (
        <div className="bg-white border-2 border-green-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle size={20} />
            <h4 className="font-semibold">Link Generated Successfully!</h4>
          </div>

          {/* Link Display */}
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 font-mono">
              {shareLink}
            </div>
            <Button
              onClick={handleCopyLink}
              variant={linkCopied ? 'primary' : 'secondary'}
              className="flex items-center"
            >
              {linkCopied ? (
                <>
                  <CheckCircle size={16} className="mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} className="mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>

          {/* Share Options */}
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-3">
              Share via:
            </h5>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={handleShareViaEmail}
                variant="secondary"
                className="flex items-center"
              >
                <Mail size={16} className="mr-2" />
                Email
              </Button>
              <Button
                onClick={() => handleShareViaSocial('twitter')}
                variant="secondary"
                className="flex items-center"
              >
                <Twitter size={16} className="mr-2" />
                Twitter
              </Button>
              <Button
                onClick={() => handleShareViaSocial('facebook')}
                variant="secondary"
                className="flex items-center"
              >
                <Facebook size={16} className="mr-2" />
                Facebook
              </Button>
              <Button
                onClick={() => handleShareViaSocial('linkedin')}
                variant="secondary"
                className="flex items-center"
              >
                <Linkedin size={16} className="mr-2" />
                LinkedIn
              </Button>
              <Button
                onClick={generateQRCode}
                variant="secondary"
                className="flex items-center"
              >
                <QrCode size={16} className="mr-2" />
                QR Code
              </Button>
            </div>
          </div>

          {/* Link Stats */}
          <div className="grid grid-cols-4 gap-3 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="flex items-center justify-center text-blue-600 mb-1">
                <Eye size={20} />
              </div>
              <div className="text-lg font-bold text-gray-900">0</div>
              <div className="text-xs text-gray-500">Views</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-green-600 mb-1">
                <Download size={20} />
              </div>
              <div className="text-lg font-bold text-gray-900">0</div>
              <div className="text-xs text-gray-500">Downloads</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-purple-600 mb-1">
                {shareSettings.privacy === 'public' ? (
                  <Globe size={20} />
                ) : (
                  <Lock size={20} />
                )}
              </div>
              <div className="text-xs font-medium text-gray-900 capitalize">
                {shareSettings.privacy}
              </div>
              <div className="text-xs text-gray-500">Privacy</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-orange-600 mb-1">
                <Calendar size={20} />
              </div>
              <div className="text-xs font-medium text-gray-900">
                {shareSettings.expiryDays === 'never'
                  ? 'Never'
                  : `${shareSettings.expiryDays}d`}
              </div>
              <div className="text-xs text-gray-500">Expires</div>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-300 rounded-lg p-6 text-center">
            <div className="w-48 h-48 mx-auto bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <QrCode size={64} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  QR Code Preview
                  <br />
                  <span className="text-xs">(Click QR Code button to generate)</span>
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Scan this code with any smartphone to access the shared report
            </p>
          </div>
        </div>
      )}

      {/* Team Sharing */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <Users size={24} className="text-indigo-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-2">
              Team Collaboration
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Upgrade to Pro to invite team members, set permissions, and
              collaborate on expense tracking in real-time.
            </p>
            <Button variant="primary" className="flex items-center">
              <Users size={16} className="mr-2" />
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Lock className="text-yellow-600 mt-0.5" size={20} />
          <div>
            <h5 className="font-medium text-yellow-900 mb-1">
              Security Best Practices
            </h5>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Use password protection for sensitive financial data</li>
              <li>
                • Set appropriate expiry times for shared links (shorter is
                safer)
              </li>
              <li>• Only share with trusted recipients</li>
              <li>• Revoke access when no longer needed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Settings({ className, size }: { className?: string; size: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6m0-12l-4.5 2.6m9 5.4L12 13m4.5-7.4L12 8.2m4.5 7.4L12 13" />
    </svg>
  );
}
