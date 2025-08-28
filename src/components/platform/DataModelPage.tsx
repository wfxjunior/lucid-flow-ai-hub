import React from 'react';
import { Database, RefreshCw } from 'lucide-react';

export const DataModelPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Database className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Data Model</h1>
        </div>
        <p className="text-lg text-gray-600">
          Sync and enrich your data with our powerful CRM platform
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <RefreshCw className="h-6 w-6 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Data Synchronization</h3>
          <p className="text-gray-600 mb-4">
            Keep your data in sync across all platforms with real-time updates and automatic conflict resolution.
          </p>
          <ul className="text-sm text-gray-500 space-y-2">
            <li>• Real-time data sync</li>
            <li>• Conflict resolution</li>
            <li>• Multi-source integration</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Database className="h-6 w-6 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Data Enrichment</h3>
          <p className="text-gray-600 mb-4">
            Enhance your customer data with additional insights and analytics for better decision making.
          </p>
          <ul className="text-sm text-gray-500 space-y-2">
            <li>• Automated data enrichment</li>
            <li>• Customer insights</li>
            <li>• Data validation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};