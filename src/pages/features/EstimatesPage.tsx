
import React from 'react';
import { DemoPageLayout } from '@/components/demo/DemoPageLayout';
import { Card } from '@/components/ui/card';
import { demoData } from '@/data/demoData';

export default function EstimatesPage() {
  const { activeEstimates, conversionRate, avgValue } = demoData.estimates;

  return (
    <DemoPageLayout
      title="Accurate Estimates"
      subtitle="Generate detailed project estimates and quotes that convert to invoices with one click"
    >
      {/* Overview */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-[#111827] mb-6">Overview</h2>
            <div className="space-y-4 text-[#374151]">
              <p>
                • Create detailed, professional estimates that win more projects with intelligent pricing and margin calculations
              </p>
              <p>
                • Compare multiple estimate versions side-by-side to present options and track approval rates over time
              </p>
              <p>
                • Convert approved estimates to invoices instantly while maintaining all line items and pricing details
              </p>
            </div>
          </div>
          
          {/* Live Demo */}
          <div>
            <h2 className="text-2xl font-semibold text-[#111827] mb-6">Live Demo</h2>
            <Card className="p-6 bg-[#F8FAFC] border-[#E5E7EB]">
              <div className="space-y-4">
                <h4 className="font-medium text-[#111827] mb-4">Deck Construction Estimates</h4>
                
                <div className="space-y-3">
                  {activeEstimates[0].packages.map((pkg, index) => (
                    <div key={index} className={`bg-white rounded-lg p-4 ${pkg.status === 'approved' ? 'border-2 border-green-200' : ''}`}>
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium text-[#111827]">{pkg.name}</h5>
                        <span className="text-lg font-semibold text-[#111827]">${pkg.price.toLocaleString()}</span>
                      </div>
                      <ul className="text-sm text-[#6B7280] space-y-1 mb-3">
                        {pkg.features.map((feature, i) => (
                          <li key={i}>• {feature}</li>
                        ))}
                      </ul>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-[#6B7280]">Sent 2 days ago</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          pkg.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {pkg.status === 'approved' ? 'Approved' : 'Under Review'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-4">
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
            <h3 className="font-medium text-[#111827] mb-3">Smart Pricing</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• Material cost database</li>
              <li>• Labor time calculations</li>
              <li>• Profit margin optimization</li>
              <li>• Regional pricing adjustments</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[#111827] mb-3">Version Control</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• Multiple estimate versions</li>
              <li>• Side-by-side comparisons</li>
              <li>• Change tracking</li>
              <li>• Approval workflows</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[#111827] mb-3">Conversion Tools</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• One-click invoice creation</li>
              <li>• Project milestone setup</li>
              <li>• Progress billing</li>
              <li>• Contract generation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-[#111827] mb-8 text-center">Integrations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {['Material DB', 'Labor Track', 'DocuSign', 'QuickBooks', 'CRM', 'Calendar'].map((integration) => (
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
