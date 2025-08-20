
import React from 'react';
import { DemoPageLayout } from '@/components/demo/DemoPageLayout';
import { Card } from '@/components/ui/card';
import { demoData } from '@/data/demoData';

export default function InvoicesPage() {
  const { recentInvoices, monthlyRevenue, mrr } = demoData.invoices;

  const getStatusBadge = (status: string) => {
    const styles = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      overdue: 'bg-red-100 text-red-800',
      draft: 'bg-gray-100 text-gray-800'
    };
    return styles[status as keyof typeof styles] || styles.draft;
  };

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
                • Professional invoicing made simple with branded templates, payment tracking, and integrated processing
              </p>
              <p>
                • Automated reminders and recurring billing ensure you never chase late payments manually
              </p>
              <p>
                • Real-time analytics help you understand cash flow patterns and optimize billing processes
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
                  <div className="text-sm text-[#6B7280]">MRR: ${mrr.toLocaleString()}</div>
                </div>
                
                <div className="space-y-3">
                  {recentInvoices.slice(0, 3).map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <div className="font-medium text-[#111827]">{invoice.id}</div>
                        <div className="text-sm text-[#6B7280]">{invoice.client}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-[#111827]">${invoice.amount.toLocaleString()}</div>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusBadge(invoice.status)}`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
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
