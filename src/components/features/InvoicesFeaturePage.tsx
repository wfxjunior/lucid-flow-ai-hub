import React from 'react';
import { FileText, DollarSign, Clock } from 'lucide-react';

export const InvoicesFeaturePage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Smart Invoicing</h1>
        </div>
        <p className="text-lg text-gray-600">
          Create, send, and track professional invoices with automated reminders and payment processing
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <FileText className="h-6 w-6 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Professional Templates</h3>
          <p className="text-gray-600 text-sm">
            Beautiful, customizable invoice templates that reflect your brand.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <DollarSign className="h-6 w-6 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Payment Processing</h3>
          <p className="text-gray-600 text-sm">
            Accept payments online with integrated payment gateways.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Clock className="h-6 w-6 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Auto Reminders</h3>
          <p className="text-gray-600 text-sm">
            Automated follow-ups and payment reminders to improve cash flow.
          </p>
        </div>
      </div>

      <div className="bg-green-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Start invoicing like a pro</h2>
        <p className="text-gray-600 mb-6">
          Streamline your billing process and get paid faster with our smart invoicing system.
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
          Create Invoice
        </button>
      </div>
    </div>
  );
};