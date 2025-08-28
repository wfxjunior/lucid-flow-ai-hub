import React from 'react';
import { FileText, Calendar, AlertCircle } from 'lucide-react';

export const FeatherTaxPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="h-8 w-8 text-emerald-600" />
          <h1 className="text-3xl font-bold text-gray-900">FeatherTax</h1>
        </div>
        <p className="text-lg text-gray-600">
          Stay on top of tax obligations with automated tracking, receipt storage, and deadline alerts
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <FileText className="h-6 w-6 text-emerald-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Receipt Management</h3>
          <p className="text-gray-600 text-sm">
            Capture and organize receipts automatically with OCR technology.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Calendar className="h-6 w-6 text-emerald-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Tax Calendar</h3>
          <p className="text-gray-600 text-sm">
            Never miss important tax deadlines with automated reminders.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <AlertCircle className="h-6 w-6 text-emerald-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Compliance Tracking</h3>
          <p className="text-gray-600 text-sm">
            Stay compliant with automated tax obligation tracking and reporting.
          </p>
        </div>
      </div>

      <div className="bg-emerald-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Simplify your tax management</h2>
        <p className="text-gray-600 mb-6">
          Keep your taxes organized year-round and reduce stress during tax season.
        </p>
        <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
};