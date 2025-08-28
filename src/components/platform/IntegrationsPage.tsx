import React from 'react';
import { Plug, Grip } from 'lucide-react';

export const IntegrationsPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Grip className="h-8 w-8 text-orange-600" />
          <h1 className="text-3xl font-bold text-gray-900">Apps & Integrations</h1>
        </div>
        <p className="text-lg text-gray-600">
          Connect all your favorite tools in one unified platform
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Plug className="h-6 w-6 text-orange-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Native Integrations</h3>
          <p className="text-gray-600 text-sm">
            Seamlessly connect with popular business tools and services.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Grip className="h-6 w-6 text-orange-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">API Connections</h3>
          <p className="text-gray-600 text-sm">
            Build custom integrations with our robust API framework.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Plug className="h-6 w-6 text-orange-600 mb-4" />
          <h3 className="text-lg font-semibold mb-3">Marketplace</h3>
          <p className="text-gray-600 text-sm">
            Discover and install apps from our extensive marketplace.
          </p>
        </div>
      </div>
    </div>
  );
};