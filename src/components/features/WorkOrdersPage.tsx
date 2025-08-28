import React from 'react';
import { Clipboard, Users, Clock } from 'lucide-react';

export const WorkOrdersPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Clipboard className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Work Order Management</h1>
        </div>
        <p className="text-lg text-gray-600">
          Create, assign, and track work orders with real-time status updates and team coordination
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Clipboard className="h-6 w-6 text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Digital Work Orders</h3>
          <p className="text-gray-600 text-sm">
            Create detailed work orders with photos, descriptions, and requirements.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Users className="h-6 w-6 text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Team Assignment</h3>
          <p className="text-gray-600 text-sm">
            Assign work orders to team members based on skills and availability.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Clock className="h-6 w-6 text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Progress Tracking</h3>
          <p className="text-gray-600 text-sm">
            Real-time updates on work order status and completion progress.
          </p>
        </div>
      </div>

      <div className="bg-indigo-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Streamline your operations</h2>
        <p className="text-gray-600 mb-6">
          Improve efficiency and accountability with digital work order management.
        </p>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
          Create Work Order
        </button>
      </div>
    </div>
  );
};