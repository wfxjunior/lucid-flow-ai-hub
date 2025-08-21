
import React from 'react';
import { DemoPageLayout } from '@/components/demo/DemoPageLayout';
import { Card } from '@/components/ui/card';
import { demoData } from '@/data/demoData';

export default function FeatherTaxPage() {
  const { upcomingDates, documents, taxSavings, deductionsFound } = demoData.featherTax;

  const getTaskTypeColor = (type: string) => {
    const colors = {
      payment: 'bg-red-100 text-red-800',
      document: 'bg-blue-100 text-blue-800',
      filing: 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || colors.document;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      complete: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  return (
    <DemoPageLayout
      title="FeatherTax"
      subtitle="Tax management made easy with automated tracking, receipt storage, and deadline alerts"
    >
      {/* Overview */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-[#111827] mb-6">Overview</h2>
            <div className="space-y-4 text-[#374151]">
              <p>
                • Stay on top of tax obligations with automated tracking, receipt storage, and deadline alerts
              </p>
              <p>
                • Smart categorization helps maximize deductions while maintaining compliance with tax regulations
              </p>
              <p>
                • Seamless integration with accounting tools ensures accurate reporting and simplified tax preparation
              </p>
            </div>
          </div>
          
          {/* Live Demo */}
          <div>
            <h2 className="text-2xl font-semibold text-[#111827] mb-6">Live Demo</h2>
            <Card className="p-6 bg-[#F8FAFC] border-[#E5E7EB]">
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-[#111827]">Tax Dashboard</h4>
                  <div className="text-sm text-[#6B7280]">
                    Est. Savings: ${taxSavings.toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-medium text-[#111827] mb-3">Upcoming Deadlines</h5>
                  <div className="space-y-2">
                    {upcomingDates.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-[#F8FAFC] rounded text-sm">
                        <div>
                          <div className="font-medium text-[#111827]">{item.task}</div>
                          <div className="text-[#6B7280]">{item.date}</div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getTaskTypeColor(item.type)}`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-medium text-[#111827] mb-3">Document Status</h5>
                  <div className="space-y-2">
                    {documents.slice(0, 3).map((doc, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-[#F8FAFC] rounded text-sm">
                        <div>
                          <div className="font-medium text-[#111827]">{doc.name}</div>
                          <div className="text-[#6B7280]">{doc.count} items</div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(doc.status)}`}>
                          {doc.status.replace('_', ' ').charAt(0).toUpperCase() + doc.status.replace('_', ' ').slice(1)}
                        </span>
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
            <h3 className="font-medium text-[#111827] mb-3">Automated Tracking</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• Receipt scanning and storage</li>
              <li>• Expense categorization</li>
              <li>• Mileage tracking</li>
              <li>• Bank transaction sync</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[#111827] mb-3">Compliance</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• Tax deadline reminders</li>
              <li>• Document requirements</li>
              <li>• Audit trail maintenance</li>
              <li>• Regulation updates</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[#111827] mb-3">Optimization</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• Deduction identification</li>
              <li>• Tax saving strategies</li>
              <li>• Quarterly planning</li>
              <li>• Professional consultation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-[#111827] mb-8 text-center">Integrations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {['QuickBooks', 'TurboTax', 'IRS Forms', 'Banking', 'Receipts', 'CPA Tools'].map((integration) => (
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
