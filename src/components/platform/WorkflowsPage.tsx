import React from 'react';
import { ArrowRight, GitBranch } from 'lucide-react';

export const WorkflowsPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <GitBranch className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Workflows</h1>
        </div>
        <p className="text-lg text-gray-600">
          Automate any process with powerful workflow automation
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <ArrowRight className="h-6 w-6 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Process Automation</h3>
          <p className="text-gray-600 mb-4">
            Create automated workflows that trigger based on specific conditions and actions.
          </p>
          <ul className="text-sm text-gray-500 space-y-2">
            <li>• Trigger-based automation</li>
            <li>• Multi-step workflows</li>
            <li>• Conditional logic</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <GitBranch className="h-6 w-6 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Visual Builder</h3>
          <p className="text-gray-600 mb-4">
            Design workflows with our intuitive drag-and-drop interface.
          </p>
          <ul className="text-sm text-gray-500 space-y-2">
            <li>• Drag-and-drop builder</li>
            <li>• Pre-built templates</li>
            <li>• Real-time testing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};