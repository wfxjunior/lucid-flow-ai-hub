
import React from "react";
import { FileText, UserCheck, Package, Car, Calendar, Video, ClipboardList, Calculator, Zap } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "AI Invoice",
    description: "Generate professional invoices automatically with AI-powered smart templates and automated calculations."
  },
  {
    icon: UserCheck,
    title: "Crew Control",
    description: "Manage your team effectively with advanced crew scheduling, payroll, and performance tracking tools."
  },
  {
    icon: Package,
    title: "MatTrack",
    description: "Track materials and inventory in real-time with intelligent stock management and automated alerts."
  },
  {
    icon: Car,
    title: "Car Rental",
    description: "Complete car rental management system with booking, tracking, and maintenance scheduling."
  },
  {
    icon: Calendar,
    title: "Smart Schedule",
    description: "AI-powered scheduling that optimizes your time and resources for maximum productivity."
  },
  {
    icon: Video,
    title: "Meetings",
    description: "Schedule, manage, and track meetings with integrated video conferencing and note-taking."
  },
  {
    icon: ClipboardList,
    title: "Appointments",
    description: "Streamline appointment booking with automated reminders and calendar synchronization."
  },
  {
    icon: Calculator,
    title: "Estimates",
    description: "Create accurate project estimates with AI assistance and automated pricing calculations."
  },
  {
    icon: Zap,
    title: "And More...",
    description: "Discover additional powerful features designed to streamline every aspect of your business operations."
  }
];

export const LandingFeaturesSection = () => (
  <section id="features" className="py-16 sm:py-20 lg:py-32">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          Features
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
          Everything you need to grow
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          Powerful tools that work together to help you manage your business more efficiently
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group p-6 sm:p-8 bg-card rounded-2xl border hover:shadow-lg transition-all duration-300"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors">
              <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
              {feature.title}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
