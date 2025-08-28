import React from 'react';
import { Calendar, Star, Bug, Zap } from 'lucide-react';

export const ChangelogPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">What's New</h1>
        </div>
        <p className="text-lg text-gray-600">
          Latest updates, features, and improvements to FeatherBiz
        </p>
      </div>

      <div className="space-y-8">
        <div className="border-l-4 border-purple-600 pl-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-medium text-purple-600">March 2024</span>
            <Star className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">New Feature</span>
          </div>
          <h3 className="text-xl font-semibold mb-3">AI Voice Assistant</h3>
          <p className="text-gray-600 mb-4">
            Transform phone calls into actionable tasks and insights with our new AI Voice Assistant. 
            Automatically transcribe calls, extract key information, and create follow-up tasks.
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Real-time call transcription</li>
            <li>• Automatic action item extraction</li>
            <li>• Sentiment analysis</li>
            <li>• Multi-language support</li>
          </ul>
        </div>

        <div className="border-l-4 border-green-600 pl-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-medium text-green-600">February 2024</span>
            <Zap className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">Improvement</span>
          </div>
          <h3 className="text-xl font-semibold mb-3">Enhanced Pipeline Management</h3>
          <p className="text-gray-600 mb-4">
            Improved drag-and-drop functionality and added advanced filtering options to the sales pipeline.
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Smoother drag-and-drop experience</li>
            <li>• Advanced filtering by date, value, and status</li>
            <li>• Bulk actions for multiple leads</li>
          </ul>
        </div>

        <div className="border-l-4 border-orange-600 pl-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-medium text-orange-600">January 2024</span>
            <Bug className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-600">Bug Fix</span>
          </div>
          <h3 className="text-xl font-semibold mb-3">Invoice Template Fixes</h3>
          <p className="text-gray-600 mb-4">
            Fixed issues with custom invoice templates not saving properly and improved PDF generation.
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Fixed template saving issues</li>
            <li>• Improved PDF rendering quality</li>
            <li>• Better mobile responsiveness</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-6">
          Subscribe to our newsletter to get notified about new features and updates.
        </p>
        <div className="flex gap-4">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};