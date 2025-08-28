import React from 'react';
import { Calculator, Percent, Target } from 'lucide-react';

export const EasyCalcPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">EasyCalc</h1>
        </div>
        <p className="text-lg text-gray-600">
          Calculate margins, markups, and project costs with built-in business math tools
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Percent className="h-6 w-6 text-purple-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Margin Calculator</h3>
          <p className="text-gray-600 text-sm">
            Calculate profit margins and markups to ensure profitable pricing.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Target className="h-6 w-6 text-purple-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Cost Estimation</h3>
          <p className="text-gray-600 text-sm">
            Accurate project cost calculations including materials and labor.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Calculator className="h-6 w-6 text-purple-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Business Math</h3>
          <p className="text-gray-600 text-sm">
            Essential business calculations for contractors and service providers.
          </p>
        </div>
      </div>

      <div className="bg-purple-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Simplify your business calculations</h2>
        <p className="text-gray-600 mb-6">
          Make informed pricing decisions with our powerful calculation tools.
        </p>
        <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
          Start Calculating
        </button>
      </div>
    </div>
  );
};