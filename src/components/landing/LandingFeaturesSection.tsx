
import React from "react";
import {
  FileText,
  Users,
  Calendar,
  BarChart3,
  MessageSquare,
  DollarSign,
  Settings,
  Truck,
  CreditCard,
  Building2,
  Clock,
  Target
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Document Management",
    description: "Create, manage, and track all your business documents from estimates to invoices."
  },
  {
    icon: Users,
    title: "Customer Relations",
    description: "Comprehensive CRM to manage your customers and build lasting relationships."
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "AI-powered scheduling and appointment management system."
  },
  {
    icon: BarChart3,
    title: "Business Analytics",
    description: "Real-time insights and analytics to drive your business decisions."
  },
  {
    icon: MessageSquare,
    title: "Communication Hub",
    description: "Centralized messaging and communication tools for your team."
  },
  {
    icon: DollarSign,
    title: "Financial Tracking",
    description: "Complete financial management from payments to accounting."
  },
  {
    icon: Settings,
    title: "Workflow Automation",
    description: "Automate repetitive tasks and streamline your business processes."
  },
  {
    icon: Truck,
    title: "Project Management",
    description: "End-to-end project tracking and management capabilities."
  },
  {
    icon: CreditCard,
    title: "Payment Processing",
    description: "Secure payment processing and invoice management."
  },
  {
    icon: Building2,
    title: "Multi-Business Support",
    description: "Manage multiple business entities from a single platform."
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description: "Track time, productivity, and team performance."
  },
  {
    icon: Target,
    title: "Goal Management",
    description: "Set, track, and achieve your business goals and targets."
  }
];

export const LandingFeaturesSection = () => {
  return (
    <section id="features" className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-4">
            Everything your business needs,{" "}
            <span className="text-muted-foreground">in one place.</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed px-4">
            From customer management to financial tracking, FeatherBiz provides all the tools you need to run and grow your business efficiently.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl border border-border/50 hover:border-border transition-all duration-500 hover:shadow-lg bg-card/50 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-muted/50 border border-border/50 group-hover:bg-muted transition-colors">
                  <feature.icon className="h-5 w-5 text-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <strong className="text-foreground">50+ integrated business tools</strong> designed to work together seamlessly, giving you the complete business management experience you've been looking for.
          </p>
        </div>
      </div>
    </section>
  );
};
