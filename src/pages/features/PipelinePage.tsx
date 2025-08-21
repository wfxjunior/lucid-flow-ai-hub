
import React from 'react';
import { DemoPageLayout } from '@/components/demo/DemoPageLayout';
import { Card } from '@/components/ui/card';

export default function PipelinePage() {
  return (
    <DemoPageLayout
      title="Sales Pipeline"
      subtitle="Track leads through your sales process with visual pipeline management and forecasting"
    >
      {/* Overview */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-[#111827] mb-6">Overview</h2>
            <div className="space-y-4 text-[#374151]">
              <p>
                Visual pipeline management helps you track every opportunity from initial contact to closed deal. Never lose track of potential revenue again.
              </p>
              <p>
                Automated stage progression and follow-up reminders ensure no lead falls through the cracks. Customize stages to match your unique sales process.
              </p>
              <p>
                Real-time forecasting and conversion analytics help you make data-driven decisions about resource allocation and growth planning.
              </p>
            </div>
          </div>
          
          {/* Live Demo */}
          <div>
            <h2 className="text-2xl font-semibold text-[#111827] mb-6">Live Demo</h2>
            <Card className="p-6 bg-[#F8FAFC] border-[#E5E7EB]">
              <div className="space-y-4">
                <h4 className="font-medium text-[#111827] mb-4">Sales Pipeline</h4>
                
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="text-center">
                    <div className="bg-blue-100 text-blue-800 p-2 rounded">
                      <div className="font-medium">Leads</div>
                      <div>8 deals</div>
                      <div>$45K</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-yellow-100 text-yellow-800 p-2 rounded">
                      <div className="font-medium">Qualified</div>
                      <div>5 deals</div>
                      <div>$32K</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-orange-100 text-orange-800 p-2 rounded">
                      <div className="font-medium">Proposal</div>
                      <div>3 deals</div>
                      <div>$28K</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 text-green-800 p-2 rounded">
                      <div className="font-medium">Closed</div>
                      <div>2 deals</div>
                      <div>$18K</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 mt-4">
                  <h5 className="font-medium text-[#111827] mb-3">Active Opportunities</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-[#F8FAFC] rounded">
                      <span className="text-sm font-medium text-[#111827]">Downtown Office Complex</span>
                      <span className="text-sm text-[#6B7280]">$15K</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-[#F8FAFC] rounded">
                      <span className="text-sm font-medium text-[#111827]">Residential Renovation</span>
                      <span className="text-sm text-[#6B7280]">$8K</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-[#F8FAFC] rounded">
                      <span className="text-sm font-medium text-[#111827]">Shopping Center Repair</span>
                      <span className="text-sm text-[#6B7280]">$5K</span>
                    </div>
                  </div>
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
            <h3 className="font-medium text-[#111827] mb-3">Visual Management</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• Drag-and-drop pipeline stages</li>
              <li>• Custom stage definitions</li>
              <li>• Deal progress tracking</li>
              <li>• Visual opportunity cards</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[#111827] mb-3">Automation</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• Automatic follow-up reminders</li>
              <li>• Stage progression triggers</li>
              <li>• Email sequence automation</li>
              <li>• Task creation workflows</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[#111827] mb-3">Analytics</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• Conversion rate tracking</li>
              <li>• Revenue forecasting</li>
              <li>• Stage duration analysis</li>
              <li>• Performance dashboards</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-[#111827] mb-8 text-center">Integrations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {['CRM', 'Email', 'Calendar', 'Estimates', 'Contracts', 'Analytics'].map((integration) => (
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
