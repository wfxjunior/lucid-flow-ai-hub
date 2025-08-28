import React from 'react';
import { TrendingUp, PieChart } from 'lucide-react';

export const ReportingPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Reporting</h1>
        </div>
        <p className="text-lg text-gray-600">
          Insights in real time with powerful analytics and reporting
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <TrendingUp className="h-6 w-6 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
          <p className="text-gray-600 mb-4">
            Monitor your business performance with live dashboards and real-time metrics.
          </p>
          <ul className="text-sm text-gray-500 space-y-2">
            <li>• Live dashboards</li>
            <li>• Real-time metrics</li>
            <li>• Automated alerts</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <PieChart className="h-6 w-6 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Custom Reports</h3>
          <p className="text-gray-600 mb-4">
            Create detailed reports tailored to your business needs and objectives.
          </p>
          <ul className="text-sm text-gray-500 space-y-2">
            <li>• Custom report builder</li>
            <li>• Scheduled reports</li>
            <li>• Export options</li>
          </ul>
        </div>
      </div>
    </div>
  );
};