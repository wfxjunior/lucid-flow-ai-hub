import React from 'react';
import { Calculator, TrendingUp, CheckCircle } from 'lucide-react';

export const EstimatesFeaturePage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="h-8 w-8 text-orange-600" />
          <h1 className="text-3xl font-bold text-gray-900">Accurate Estimates</h1>
        </div>
        <p className="text-lg text-gray-600">
          Generate detailed project estimates and quotes that convert to invoices with one click
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Calculator className="h-6 w-6 text-orange-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Smart Calculations</h3>
          <p className="text-gray-600 text-sm">
            Automated pricing calculations with material costs, labor, and margins.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <TrendingUp className="h-6 w-6 text-orange-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Profit Optimization</h3>
          <p className="text-gray-600 text-sm">
            Optimize pricing strategies with profit margin analysis and recommendations.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <CheckCircle className="h-6 w-6 text-orange-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Quick Conversion</h3>
          <p className="text-gray-600 text-sm">
            Convert approved estimates to invoices instantly with one click.
          </p>
        </div>
      </div>

      <div className="bg-orange-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Win more projects with accurate estimates</h2>
        <p className="text-gray-600 mb-6">
          Create professional estimates that showcase your expertise and win client trust.
        </p>
        <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
          Create Estimate
        </button>
      </div>
    </div>
  );
};