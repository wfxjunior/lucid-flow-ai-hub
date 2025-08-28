import React from 'react';
import { Users, Zap } from 'lucide-react';

export const ProductivityPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Users className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Productivity & Collaboration</h1>
        </div>
        <p className="text-lg text-gray-600">
          Context for your team operations and enhanced collaboration
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Users className="h-6 w-6 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
          <p className="text-gray-600 mb-4">
            Work together seamlessly with shared workspaces, real-time updates, and team insights.
          </p>
          <ul className="text-sm text-gray-500 space-y-2">
            <li>• Shared workspaces</li>
            <li>• Real-time collaboration</li>
            <li>• Team performance metrics</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Zap className="h-6 w-6 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Workflow Optimization</h3>
          <p className="text-gray-600 mb-4">
            Streamline your processes with intelligent workflow suggestions and automation.
          </p>
          <ul className="text-sm text-gray-500 space-y-2">
            <li>• Process optimization</li>
            <li>• Workflow templates</li>
            <li>• Performance tracking</li>
          </ul>
        </div>
      </div>
    </div>
  );
};