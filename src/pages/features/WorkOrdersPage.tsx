
import React from 'react';
import { DemoPageLayout } from '@/components/demo/DemoPageLayout';
import { Card } from '@/components/ui/card';
import { demoData } from '@/data/demoData';

export default function WorkOrdersPage() {
  const { orders, metrics, crew } = demoData.workOrders;

  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      in_progress: 'bg-blue-100 text-blue-800',
      scheduled: 'bg-yellow-100 text-yellow-800',
      pending: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getCrewStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      break: 'bg-yellow-100 text-yellow-800',
      offline: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || colors.offline;
  };

  return (
    <DemoPageLayout
      title="Work Orders"
      subtitle="Streamline operations with work order management, real-time tracking, and team coordination"
    >
      {/* Overview */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-[#111827] mb-6">Overview</h2>
            <div className="space-y-4 text-[#374151]">
              <p>
                • Create, assign, and track work orders with real-time status updates and team coordination
              </p>
              <p>
                • Mobile-first design enables field teams to update progress, capture photos, and communicate in real-time
              </p>
              <p>
                • Automated scheduling and dispatch optimization helps maximize efficiency and customer satisfaction
              </p>
            </div>
          </div>
          
          {/* Live Demo */}
          <div>
            <h2 className="text-2xl font-semibold text-[#111827] mb-6">Live Demo</h2>
            <Card className="p-6 bg-[#F8FAFC] border-[#E5E7EB]">
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-[#111827]">Active Work Orders</h4>
                  <div className="text-sm text-[#6B7280]">
                    {metrics.completedToday} completed today
                  </div>
                </div>
                
                <div className="space-y-3">
                  {orders.slice(0, 4).map((order) => (
                    <div key={order.id} className="bg-white rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium text-[#111827]">{order.id}</div>
                          <div className="text-sm text-[#6B7280]">{order.client}</div>
                          <div className="text-sm text-[#374151]">{order.service}</div>
                        </div>
                        <div className="text-right space-y-1">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                            {order.status.replace('_', ' ').charAt(0).toUpperCase() + order.status.replace('_', ' ').slice(1)}
                          </span>
                          <div>
                            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(order.priority)}`}>
                              {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-[#6B7280]">
                        Assigned to: {order.assigned}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-medium text-[#111827] mb-3">Crew Status</h5>
                  <div className="space-y-2">
                    {crew.slice(0, 3).map((member, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-[#F8FAFC] rounded text-sm">
                        <div>
                          <div className="font-medium text-[#111827]">{member.name}</div>
                          <div className="text-[#6B7280]">{member.location}</div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getCrewStatusColor(member.status)}`}>
                          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
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
            <h3 className="font-medium text-[#111827] mb-3">Order Management</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• Digital work order creation</li>
              <li>• Priority and status tracking</li>
              <li>• Customer communication</li>
              <li>• Photo and signature capture</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[#111827] mb-3">Team Coordination</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• Real-time crew tracking</li>
              <li>• Automatic dispatch</li>
              <li>• Skills-based assignment</li>
              <li>• Mobile team apps</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[#111827] mb-3">Analytics & Reporting</h3>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>• Performance metrics</li>
              <li>• Time tracking</li>
              <li>• Customer satisfaction</li>
              <li>• Efficiency reports</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-[#111827] mb-8 text-center">Integrations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {['GPS Tracking', 'Mobile Apps', 'Scheduling', 'CRM', 'Inventory', 'Billing'].map((integration) => (
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
