
import React from 'react';
import { DemoPageLayout } from '@/components/demo/DemoPageLayout';
import { Card } from '@/components/ui/card';

export default function GettingStartedPage() {
  const guides = [
    {
      title: "Set up your first project",
      description: "Learn how to create and configure your first project in FeatherBiz",
      duration: "5 min",
      topics: ["Project creation", "Team setup", "Basic configuration"]
    },
    {
      title: "Create and send invoices",
      description: "Step-by-step guide to creating professional invoices and getting paid faster",
      duration: "8 min",
      topics: ["Invoice templates", "Payment setup", "Client management"]
    },
    {
      title: "Manage your sales pipeline",
      description: "Track leads from first contact to closed deals with visual pipeline management",
      duration: "12 min",
      topics: ["Pipeline stages", "Deal tracking", "Conversion optimization"]
    },
    {
      title: "Automate with AI Voice",
      description: "Set up AI voice assistant to turn calls into actionable tasks and insights",
      duration: "15 min",
      topics: ["Voice setup", "Integration", "Action items"]
    }
  ];

  return (
    <DemoPageLayout
      title="FeatherBiz 101"
      subtitle="Get started with FeatherBiz in minutes. Learn the essentials to run your business more efficiently"
    >
      {/* Quick Start */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-[#111827] mb-4">Quick Start Guide</h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto">
            Follow these essential guides to get your business up and running with FeatherBiz. 
            Each guide includes step-by-step instructions and practical examples.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {guides.map((guide, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-[#111827]">{guide.title}</h3>
                <span className="text-sm text-[#6B7280] bg-[#F8FAFC] px-2 py-1 rounded">
                  {guide.duration}
                </span>
              </div>
              
              <p className="text-[#6B7280] mb-4 leading-relaxed">
                {guide.description}
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="text-sm font-medium text-[#111827]">You'll learn:</div>
                <ul className="text-sm text-[#6B7280] space-y-1">
                  {guide.topics.map((topic, i) => (
                    <li key={i}>• {topic}</li>
                  ))}
                </ul>
              </div>

              <button 
                className="w-full px-4 py-2 bg-[#111827] text-white rounded-lg hover:bg-[#111827]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
                title="Demo (read-only)"
              >
                Start Guide
              </button>
            </Card>
          ))}
        </div>
      </section>

      {/* Additional Resources */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-semibold text-[#111827] mb-8 text-center">Additional Resources</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-[#E5E7EB] rounded-lg mx-auto mb-4"></div>
            <h3 className="font-semibold text-[#111827] mb-2">Video Tutorials</h3>
            <p className="text-sm text-[#6B7280] mb-4">
              Watch detailed video guides for each feature and workflow
            </p>
            <button 
              className="text-sm text-[#111827] hover:text-[#111827]/80 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
              title="Demo (read-only)"
            >
              Browse Videos →
            </button>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-[#E5E7EB] rounded-lg mx-auto mb-4"></div>
            <h3 className="font-semibold text-[#111827] mb-2">Community Forum</h3>
            <p className="text-sm text-[#6B7280] mb-4">
              Connect with other users and get answers to your questions
            </p>
            <button 
              className="text-sm text-[#111827] hover:text-[#111827]/80 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
              title="Demo (read-only)"
            >
              Join Community →
            </button>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-[#E5E7EB] rounded-lg mx-auto mb-4"></div>
            <h3 className="font-semibold text-[#111827] mb-2">Expert Support</h3>
            <p className="text-sm text-[#6B7280] mb-4">
              Get personalized help from our customer success team
            </p>
            <button 
              className="text-sm text-[#111827] hover:text-[#111827]/80 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
              title="Demo (read-only)"
            >
              Contact Support →
            </button>
          </Card>
        </div>
      </section>

      {/* Demo Notice */}
      <section className="max-w-6xl mx-auto px-6">
        <Card className="p-6 bg-amber-50 border-amber-200">
          <div className="text-center">
            <h3 className="font-semibold text-amber-800 mb-2">Demo Content</h3>
            <p className="text-amber-700 text-sm">
              This is a demonstration of our getting started experience. 
              Sign up for free to access the complete interactive guides and tutorials.
            </p>
          </div>
        </Card>
      </section>
    </DemoPageLayout>
  );
}
