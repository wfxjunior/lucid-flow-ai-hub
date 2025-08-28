import React from 'react';
import { Code, Key } from 'lucide-react';

export const APIPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Code className="h-8 w-8 text-gray-700" />
          <h1 className="text-3xl font-bold text-gray-900">API Reference</h1>
        </div>
        <p className="text-lg text-gray-600">
          Complete API documentation for developers and system integrations
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Code className="h-6 w-6 text-gray-700 mb-4" />
          <h3 className="text-xl font-semibold mb-3">RESTful API</h3>
          <p className="text-gray-600 mb-4">
            Access all platform features through our comprehensive REST API with full CRUD operations.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg text-sm font-mono">
            <div className="text-green-600">GET</div>
            <div className="text-gray-700">https://api.featherbiz.com/v1/customers</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Key className="h-6 w-6 text-gray-700 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Authentication</h3>
          <p className="text-gray-600 mb-4">
            Secure API access using OAuth 2.0 and API keys with rate limiting and monitoring.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg text-sm font-mono">
            <div className="text-gray-500">Authorization:</div>
            <div className="text-gray-700">Bearer your_api_token_here</div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-blue-900">Quick Start</h3>
        <p className="text-blue-700 mb-4">
          Get started with our API in minutes using our interactive documentation and code examples.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          View Interactive Docs
        </button>
      </div>
    </div>
  );
};