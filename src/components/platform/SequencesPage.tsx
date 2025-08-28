import React from 'react';
import { Mail, Target } from 'lucide-react';

export const SequencesPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="h-8 w-8 text-pink-600" />
          <h1 className="text-3xl font-bold text-gray-900">Sequences</h1>
        </div>
        <p className="text-lg text-gray-600">
          Personalized outreach campaigns that convert
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Mail className="h-6 w-6 text-pink-600 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Email Sequences</h3>
          <p className="text-gray-600 mb-4">
            Create personalized email campaigns that nurture leads and drive conversions.
          </p>
          <ul className="text-sm text-gray-500 space-y-2">
            <li>• Automated email campaigns</li>
            <li>• Personalization tokens</li>
            <li>• A/B testing</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Target className="h-6 w-6 text-pink-600 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Smart Targeting</h3>
          <p className="text-gray-600 mb-4">
            Target the right audience with intelligent segmentation and timing.
          </p>
          <ul className="text-sm text-gray-500 space-y-2">
            <li>• Audience segmentation</li>
            <li>• Optimal timing</li>
            <li>• Performance analytics</li>
          </ul>
        </div>
      </div>
    </div>
  );
};