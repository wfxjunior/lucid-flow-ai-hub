import React from 'react';
import { Rocket, CheckCircle, Play } from 'lucide-react';

export const GettingStartedPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Rocket className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">FeatherBiz 101</h1>
        </div>
        <p className="text-lg text-gray-600">
          Get up and running with FeatherBiz in just a few simple steps
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-3">Step 1: Set Up Your Profile</h3>
              <p className="text-gray-600 mb-4">
                Complete your business profile with company information, branding, and preferences.
              </p>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <Play className="h-4 w-4" />
                Watch Tutorial (3 min)
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-3">Step 2: Add Your First Customer</h3>
              <p className="text-gray-600 mb-4">
                Import your customer list or add your first customer to get started with CRM features.
              </p>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <Play className="h-4 w-4" />
                Watch Tutorial (2 min)
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-3">Step 3: Create Your First Invoice</h3>
              <p className="text-gray-600 mb-4">
                Learn how to create professional invoices and set up payment processing.
              </p>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <Play className="h-4 w-4" />
                Watch Tutorial (5 min)
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Need help getting started?</h2>
        <p className="text-gray-600 mb-6">
          Our support team is here to help you make the most of FeatherBiz.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
};