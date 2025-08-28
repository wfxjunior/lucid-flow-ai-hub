import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

export const DocumentationPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="h-8 w-8 text-gray-700" />
          <h1 className="text-3xl font-bold text-gray-900">Platform Documentation</h1>
        </div>
        <p className="text-lg text-gray-600">
          Complete guide to using the FeatherBiz platform effectively
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            Getting Started
            <ExternalLink className="h-4 w-4" />
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Learn the basics and get up and running quickly with our platform.
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Quick start guide</li>
            <li>• Initial setup</li>
            <li>• Basic features</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            API Reference
            <ExternalLink className="h-4 w-4" />
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Complete API documentation for developers and integrations.
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• REST API</li>
            <li>• Authentication</li>
            <li>• Code examples</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            Advanced Features
            <ExternalLink className="h-4 w-4" />
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Detailed guides for power users and advanced configurations.
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Automation setup</li>
            <li>• Custom workflows</li>
            <li>• Integrations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};