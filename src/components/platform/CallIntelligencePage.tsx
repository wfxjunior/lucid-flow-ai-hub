import React from 'react';
import { Mic, BarChart } from 'lucide-react';

export const CallIntelligencePage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Mic className="h-8 w-8 text-red-600" />
          <h1 className="text-3xl font-bold text-gray-900">Call Intelligence</h1>
        </div>
        <p className="text-lg text-gray-600">
          Record and analyze meetings with AI-powered insights
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Mic className="h-6 w-6 text-red-600 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Call Recording</h3>
          <p className="text-gray-600 mb-4">
            Automatically record and transcribe your calls for future reference and analysis.
          </p>
          <ul className="text-sm text-gray-500 space-y-2">
            <li>• Automatic recording</li>
            <li>• Real-time transcription</li>
            <li>• Secure storage</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <BarChart className="h-6 w-6 text-red-600 mb-4" />
          <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
          <p className="text-gray-600 mb-4">
            Get intelligent insights from your conversations to improve sales performance.
          </p>
          <ul className="text-sm text-gray-500 space-y-2">
            <li>• Sentiment analysis</li>
            <li>• Key topic extraction</li>
            <li>• Performance metrics</li>
          </ul>
        </div>
      </div>
    </div>
  );
};