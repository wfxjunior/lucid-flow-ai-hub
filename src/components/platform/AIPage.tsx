import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

export const AIPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Platform</h1>
        </div>
        <p className="text-lg text-gray-600">
          AI native to your CRM for intelligent business automation
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Sparkles className="h-6 w-6 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Smart Automation</h3>
          <p className="text-gray-600 mb-4">
            Let AI handle repetitive tasks and focus on what matters most to your business.
          </p>
          <ul className="text-sm text-gray-500 space-y-2">
            <li>• Intelligent task automation</li>
            <li>• Predictive analytics</li>
            <li>• Smart recommendations</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Brain className="h-6 w-6 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Natural Language Processing</h3>
          <p className="text-gray-600 mb-4">
            Communicate with your CRM using natural language for easier data entry and insights.
          </p>
          <ul className="text-sm text-gray-500 space-y-2">
            <li>• Voice commands</li>
            <li>• Text analysis</li>
            <li>• Sentiment analysis</li>
          </ul>
        </div>
      </div>
    </div>
  );
};