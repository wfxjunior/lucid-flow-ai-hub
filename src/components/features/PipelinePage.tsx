import React from 'react';
import { BarChart3, Users, Target } from 'lucide-react';

export const PipelinePage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Sales Pipeline</h1>
        </div>
        <p className="text-lg text-gray-600">
          Track leads through your sales process with visual pipeline management and forecasting
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <BarChart3 className="h-6 w-6 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Visual Pipeline</h3>
          <p className="text-gray-600 text-sm">
            Drag-and-drop interface to manage leads through your sales stages.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Users className="h-6 w-6 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Lead Management</h3>
          <p className="text-gray-600 text-sm">
            Track lead sources, interactions, and conversion rates.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Target className="h-6 w-6 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Sales Forecasting</h3>
          <p className="text-gray-600 text-sm">
            Predict future revenue based on pipeline data and conversion rates.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Close more deals with better visibility</h2>
        <p className="text-gray-600 mb-6">
          Get complete visibility into your sales process and identify opportunities to improve.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          View Pipeline
        </button>
      </div>
    </div>
  );
};