
import React from 'react';
import { DemoPageLayout } from '@/components/demo/DemoPageLayout';
import { Card } from '@/components/ui/card';
import { demoData } from '@/data/demoData';

export default function PipelinePage() {
  const { stages, activeDeals, conversionRates } = demoData.pipeline;

  const getStageColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      orange: 'bg-orange-100 text-orange-800',
      green: 'bg-green-100 text-green-800'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

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
                • Visual pipeline management helps you track every opportunity from initial contact to closed deal
              </p>
              <p>
                • Automated stage progression and follow-up reminders ensure no lead falls through the cracks
              </p>
              <p>
                • Real-time forecasting and conversion analytics help you make data-driven decisions about resource allocation
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
                  {stages.map((stage, index) => (
                    <div key={index} className="text-center">
                      <div className={`p-2 rounded ${getStageColor(stage.color)}`}>
                        <div className="font-medium">{stage.name}</div>
                        <div>{stage.deals} deals</div>
                        <div>${(stage.value / 1000).toFixed(0)}K</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-lg p-4 mt-4">
                  <h5 className="font-medium text-[#111827] mb-3">Active Opportunities</h5>
                  <div className="space-y-2">
                    {activeDeals.map((deal, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-[#F8FAFC] rounded">
                        <div>
                          <span className="text-sm font-medium text-[#111827]">{deal.name}</span>
                          <div className="text-xs text-[#6B7280]">{deal.stage} • {deal.probability}% probability</div>
                        </div>
                        <span className="text-sm text-[#6B7280]">${(deal.value / 1000).toFixed(0)}K</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center px-3 py-1 text-xs bg-amber-50 text-amber-700 rounded-full border border-amber-200"
                       title="Demo (read-only)"
                       aria-describedby="demo-tooltip">
                    Demo content only
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
