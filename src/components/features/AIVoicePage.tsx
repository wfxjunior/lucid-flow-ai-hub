import React from 'react';
import { Mic, Zap, Brain } from 'lucide-react';

export const AIVoicePage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Mic className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Voice Assistant</h1>
          <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">New</span>
        </div>
        <p className="text-lg text-gray-600">
          Transform phone calls into actionable tasks and insights with advanced AI voice processing
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Mic className="h-6 w-6 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Voice Recognition</h3>
          <p className="text-gray-600 text-sm">
            Advanced speech-to-text with 99% accuracy in multiple languages.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Brain className="h-6 w-6 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">AI Analysis</h3>
          <p className="text-gray-600 text-sm">
            Intelligent analysis of conversations to extract key insights and actions.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Zap className="h-6 w-6 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Auto Actions</h3>
          <p className="text-gray-600 text-sm">
            Automatically create tasks, appointments, and follow-ups from conversations.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Ready to transform your calls?</h2>
        <p className="text-gray-600 mb-6">
          Start using AI Voice Assistant to turn every conversation into actionable business intelligence.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
};