
import React from "react";
import { 
  FileText, 
  Calendar, 
  Clock, 
  Package, 
  Users, 
  Car, 
  Camera, 
  BarChart3, 
  Sparkles 
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Invoice & Estimate Generator",
    description: "Send professional documents in seconds"
  },
  {
    icon: Calendar,
    title: "Appointments",
    description: "Bookings synced with your calendar"
  },
  {
    icon: Clock,
    title: "Smart Schedule",
    description: "Track jobs, assign workers, and visualize workload"
  },
  {
    icon: Package,
    title: "Material Tracker",
    description: "Monitor supply usage and delivery status"
  },
  {
    icon: Users,
    title: "CRM Lite",
    description: "Manage leads, customers, and sales stages"
  },
  {
    icon: Car,
    title: "Car Rental Manager",
    description: "Fleet, clients, documents, and billing in one place"
  },
  {
    icon: Camera,
    title: "Photo Timeline",
    description: "Visual job progress with client-shareable pages"
  },
  {
    icon: BarChart3,
    title: "Project Dashboard",
    description: "View everything from costs to tasks at a glance"
  },
  {
    icon: Sparkles,
    title: "AI Business Tools",
    description: "Use built-in smart docs for invoices, contracts, and more"
  }
];

export const LandingFeaturesSection = () => (
  <section id="features" className="py-20 sm:py-24 lg:py-32 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center mb-16 sm:mb-20">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6">
          Everything You Need
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Powerful tools that work
          <br />
          <span className="text-blue-600">together seamlessly</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          From invoicing to project management, everything you need to run your business efficiently
        </p>
      </div>

      {/* Features Grid - 3x3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group p-8 bg-white border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all duration-300 text-center"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors mx-auto">
              <feature.icon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Callout Text */}
      <div className="text-center">
        <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
          <p className="text-lg font-medium text-gray-700">
            And that's just the beginning. FeatherBiz offers{" "}
            <span className="text-blue-600 font-semibold">over 15 powerful tools</span>{" "}
            designed to grow your business your way.
          </p>
        </div>
      </div>
      
    </div>
  </section>
);
