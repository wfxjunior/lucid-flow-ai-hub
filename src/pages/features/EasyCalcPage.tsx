
import React from 'react';
import { DemoPageLayout } from '@/components/demo/DemoPageLayout';
import { Card } from '@/components/ui/card';
import { demoData } from '@/data/demoData';

export default function EasyCalcPage() {
  const { calculations, templates } = demoData.easyCalc;

  return (
    <DemoPageLayout
      title="EasyCalc"
      subtitle="Calculate margins, markups, and project costs with built-in business math tools"
    >
      {/* Overview */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-[#111827] mb-6">Overview</h2>
            <div className="space-y-4 text-[#374151]">
              <p>
                • Never second-guess your pricing with instant calculations for margins, markups, discounts, and complex project costs
              </p>
              <p>
                • Built-in templates for common business scenarios help you price services accurately while maintaining profitable margins
              </p>
              <p>
                • Save calculation templates for recurring use and share pricing models across your team for consistent estimates
              </p>
            </div>
          </div>
          
          {/* Live Demo */}
          <div>
            <h2 className="text-2xl font-semibold text-[#111827] mb-6">Live Demo</h2>
            <Card className="p-6 bg-[#F8FAFC] border-[#E5E7EB]">
              <div className="space-y-4">
                <h4 className="font-medium text-[#111827] mb-4">Pricing Calculator</h4>
                
                <div className="bg-white rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#111827]">Cost</label>
                      <div className="mt-1 p-2 bg-[#F8FAFC] rounded border text-[#111827]">
                        ${calculations[0].cost.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#111827]">Markup %</label>
                      <div className="mt-1 p-2 bg-[#F8FAFC] rounded border text-[#111827]">
                        {calculations[0].markup}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-[#E5E7EB] pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[#6B7280]">Markup Amount:</span>
                      <span className="font-medium text-[#111827]">
                        ${(calculations[0].sellingPrice - calculations[0].cost).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[#6B7280]">Selling Price:</span>
                      <span className="font-medium text-[#111827]">
                        ${calculations[0].sellingPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#6B7280]">Profit Margin:</span>
                      <span className="font-medium text-green-600">{calculations[0].margin}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    className="flex-1 px-3 py-2 text-sm bg-[#111827] text-white rounded hover:bg-[#111827]/90 disabled:opacity-50 disabled:cursor-not-allowed" 
                    disabled
                    title="Demo (read-only)"
                  >
                    Save Template
                  </button>
                  <button 
                    className="flex-1 px-3 py-2 text-sm border border-[#E5E7EB] text-[#111827] rounded hover:bg-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed" 
                    disabled
                    title="Demo (read-only)"
                  >
                    Export
                  </button>
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
            <h3 className="font-medium text-[#111827] mb-3">Financial Calculations</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• Margin and markup calculations</li>
              <li>• Break-even analysis</li>
              <li>• ROI calculations</li>
              <li>• Discount impact analysis</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[#111827] mb-3">Project Costing</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• Material cost breakdowns</li>
              <li>• Labor hour calculations</li>
              <li>• Overhead allocation</li>
              <li>• Multi-phase project costs</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[#111827] mb-3">Templates & Sharing</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• Reusable calculation templates</li>
              <li>• Team sharing capabilities</li>
              <li>• Export to spreadsheets</li>
              <li>• Historical calculation logs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-[#111827] mb-8 text-center">Integrations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {['Excel', 'Sheets', 'QuickBooks', 'Estimates', 'Invoices', 'Reports'].map((integration) => (
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
