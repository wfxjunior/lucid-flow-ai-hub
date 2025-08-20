
import React from 'react';
import { DemoPageLayout } from '@/components/demo/DemoPageLayout';
import { Card } from '@/components/ui/card';

export default function AIVoicePage() {
  return (
    <DemoPageLayout
      title="AI Voice"
      subtitle="Transform phone calls into actionable tasks and insights with advanced AI voice processing"
      badge="New"
    >
      {/* Overview */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-[#111827] mb-6">Overview</h2>
            <div className="space-y-4 text-[#374151]">
              <p>
                AI Voice automatically transcribes and analyzes your business calls, extracting key information and generating actionable insights.
              </p>
              <p>
                Never miss important details from client conversations. Our AI identifies follow-up tasks, deadlines, and commitments automatically.
              </p>
              <p>
                Seamlessly integrates with your existing workflow, creating tasks, calendar events, and project updates based on call content.
              </p>
            </div>
          </div>
          
          {/* Live Demo */}
          <div>
            <h2 className="text-2xl font-semibold text-[#111827] mb-6">Live Demo</h2>
            <Card className="p-6 bg-[#F8FAFC] border-[#E5E7EB]">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium text-[#111827]">Call with Johnson Construction</span>
                  <span className="text-xs text-[#6B7280]">15:32</span>
                </div>
                
                <div className="bg-white rounded-lg p-4 space-y-3">
                  <div className="text-sm">
                    <span className="font-medium text-[#111827]">Client:</span> "We need the deck project completed by March 15th for the spring party."
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-[#111827]">You:</span> "Absolutely, I'll send the updated timeline today."
                  </div>
                </div>

                <div className="border-t border-[#E5E7EB] pt-4">
                  <h4 className="font-medium text-[#111827] mb-2">Action Items Generated:</h4>
                  <ul className="space-y-2 text-sm text-[#374151]">
                    <li>• Update project timeline for Johnson deck</li>
                    <li>• Set deadline reminder for March 15th</li>
                    <li>• Send timeline document to client</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-semibold text-[#111827] mb-8 text-center">Capabilities</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="font-medium text-[#111827] mb-3">Real-time Transcription</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• Live speech-to-text conversion</li>
              <li>• Speaker identification</li>
              <li>• Timestamp tracking</li>
              <li>• Multi-language support</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[#111827] mb-3">Smart Analysis</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• Action item extraction</li>
              <li>• Deadline identification</li>
              <li>• Follow-up reminders</li>
              <li>• Sentiment analysis</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[#111827] mb-3">Workflow Integration</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• Automatic task creation</li>
              <li>• Calendar event scheduling</li>
              <li>• Project updates</li>
              <li>• Client record updates</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-[#111827] mb-8 text-center">Integrations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {['Zoom', 'Teams', 'Slack', 'Calendar', 'CRM', 'Email'].map((integration) => (
            <div key={integration} className="text-center">
              <div className="w-16 h-16 bg-[#E5E7EB] rounded-lg mx-auto mb-2 hover:bg-[#D1D5DB] transition-colors"></div>
              <span className="text-sm text-[#6B7280]">{integration}</span>
            </div>
          ))}
        </div>
      </section>
    </DemoPageLayout>
  );
}
