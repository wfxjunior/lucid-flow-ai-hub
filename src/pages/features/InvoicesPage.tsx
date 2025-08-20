
import React from 'react';
import { DemoPageLayout } from '@/components/demo/DemoPageLayout';
import { Card } from '@/components/ui/card';

export default function InvoicesPage() {
  return (
    <DemoPageLayout
      title="Smart Invoicing"
      subtitle="Create, send, and track professional invoices with automated reminders and payment processing"
    >
      {/* Overview */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-[#111827] mb-6">Overview</h2>
            <div className="space-y-4 text-[#374151]">
              <p>
                Professional invoicing made simple. Create branded invoices in seconds, track payment status, and get paid faster with integrated payment processing.
              </p>
              <p>
                Automated reminders ensure you never chase late payments manually. Set up recurring invoices for ongoing services and subscriptions.
              </p>
              <p>
                Real-time analytics help you understand cash flow patterns and optimize your billing process for better business outcomes.
              </p>
            </div>
          </div>
          
          {/* Live Demo */}
          <div>
            <h2 className="text-2xl font-semibold text-[#111827] mb-6">Live Demo</h2>
            <Card className="p-6 bg-[#F8FAFC] border-[#E5E7EB]">
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-[#111827]">Recent Invoices</h4>
                  <div className="text-sm text-[#6B7280]">MRR: $12,450</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <div className="font-medium text-[#111827]">INV-2024-001</div>
                      <div className="text-sm text-[#6B7280]">Johnson Construction</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-[#111827]">$2,450</div>
                      <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Paid</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <div className="font-medium text-[#111827]">INV-2024-002</div>
                      <div className="text-sm text-[#6B7280]">Metro Realty</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-[#111827]">$1,890</div>
                      <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <div className="font-medium text-[#111827]">INV-2024-003</div>
                      <div className="text-sm text-[#6B7280]">Green Valley HOA</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-[#111827]">$3,200</div>
                      <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Overdue</span>
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
            <h3 className="font-medium text-[#111827] mb-3">Professional Templates</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• Custom branded invoices</li>
              <li>• Multiple template designs</li>
              <li>• Logo and color customization</li>
              <li>• Professional formatting</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[#111827] mb-3">Payment Processing</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• Credit card payments</li>
              <li>• ACH bank transfers</li>
              <li>• PayPal integration</li>
              <li>• Stripe connectivity</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[#111827] mb-3">Automation</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• Recurring billing setup</li>
              <li>• Payment reminders</li>
              <li>• Late fee calculations</li>
              <li>• Receipt generation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-[#111827] mb-8 text-center">Integrations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {['Stripe', 'PayPal', 'QuickBooks', 'Xero', 'Square', 'Plaid'].map((integration) => (
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
