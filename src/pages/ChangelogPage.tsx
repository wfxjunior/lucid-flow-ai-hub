
import React from 'react';
import { DemoPageLayout } from '@/components/demo/DemoPageLayout';
import { Card } from '@/components/ui/card';

export default function ChangelogPage() {
  const updates = [
    {
      version: "2.4.0",
      date: "January 18, 2024",
      type: "Major Release",
      features: [
        "AI Voice Assistant - Transform calls into actionable tasks",
        "Enhanced Pipeline Management with drag-and-drop stages",
        "Advanced Invoice Templates with custom branding",
        "Improved Mobile Experience across all features"
      ],
      improvements: [
        "Faster loading times across dashboard",
        "Better error handling for payment processing",
        "Enhanced security for sensitive data"
      ],
      fixes: [
        "Fixed invoice calculation edge cases",
        "Resolved calendar sync issues",
        "Improved browser compatibility"
      ]
    },
    {
      version: "2.3.2",
      date: "January 5, 2024",
      type: "Feature Update",
      features: [
        "EasyCalc - Smart pricing calculator with templates",
        "Work Order Management with real-time tracking",
        "Enhanced Team Collaboration tools"
      ],
      improvements: [
        "Streamlined onboarding process",
        "Better integration with QuickBooks",
        "Improved data export capabilities"
      ],
      fixes: [
        "Fixed timezone handling in scheduling",
        "Resolved notification delivery issues",
        "Improved PDF generation quality"
      ]
    },
    {
      version: "2.3.1",
      date: "December 20, 2023",
      type: "Bug Fixes",
      features: [],
      improvements: [
        "Enhanced search functionality",
        "Better mobile navigation",
        "Improved accessibility features"
      ],
      fixes: [
        "Fixed rare data sync issues",
        "Resolved email template formatting",
        "Improved backup and recovery processes"
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      "Major Release": "bg-blue-100 text-blue-800",
      "Feature Update": "bg-green-100 text-green-800",
      "Bug Fixes": "bg-yellow-100 text-yellow-800"
    };
    return colors[type as keyof typeof colors] || colors["Feature Update"];
  };

  return (
    <DemoPageLayout
      title="What's New"
      subtitle="Stay up to date with the latest FeatherBiz features, improvements, and bug fixes"
      badge="Updated"
    >
      {/* Release Notes */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="space-y-8">
          {updates.map((update, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-semibold text-[#111827]">
                    Version {update.version}
                  </h3>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(update.type)}`}>
                    {update.type}
                  </span>
                </div>
                <span className="text-sm text-[#6B7280]">{update.date}</span>
              </div>

              <div className="space-y-6">
                {update.features.length > 0 && (
                  <div>
                    <h4 className="font-medium text-[#111827] mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      New Features
                    </h4>
                    <ul className="space-y-2 text-[#374151] text-sm ml-4">
                      {update.features.map((feature, i) => (
                        <li key={i}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {update.improvements.length > 0 && (
                  <div>
                    <h4 className="font-medium text-[#111827] mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Improvements
                    </h4>
                    <ul className="space-y-2 text-[#374151] text-sm ml-4">
                      {update.improvements.map((improvement, i) => (
                        <li key={i}>• {improvement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {update.fixes.length > 0 && (
                  <div>
                    <h4 className="font-medium text-[#111827] mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      Bug Fixes
                    </h4>
                    <ul className="space-y-2 text-[#374151] text-sm ml-4">
                      {update.fixes.map((fix, i) => (
                        <li key={i}>• {fix}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-semibold text-[#111827] mb-8 text-center">Coming Soon</h2>
        
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-[#111827] mb-2">Version 2.5.0</h3>
            <p className="text-[#6B7280]">Expected release: February 2024</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-[#111827] mb-3">Upcoming Features</h4>
              <ul className="space-y-2 text-[#374151] text-sm">
                <li>• Advanced Analytics Dashboard</li>
                <li>• Multi-language Support</li>
                <li>• Custom Workflow Builder</li>
                <li>• Enhanced Mobile Apps</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-[#111827] mb-3">Integrations</h4>
              <ul className="space-y-2 text-[#374151] text-sm">
                <li>• Slack Integration</li>
                <li>• Microsoft Teams</li>
                <li>• Zapier Connectivity</li>
                <li>• Advanced API Features</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Feedback */}
      <section className="max-w-4xl mx-auto px-6">
        <Card className="p-6 text-center bg-[#F8FAFC]">
          <h3 className="font-semibold text-[#111827] mb-2">Have Feedback?</h3>
          <p className="text-[#6B7280] mb-4">
            We'd love to hear your thoughts on recent updates or suggestions for future releases.
          </p>
          <button 
            className="px-6 py-2 bg-[#111827] text-white rounded-lg hover:bg-[#111827]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
            title="Demo (read-only)"
          >
            Share Feedback
          </button>
        </Card>
      </section>
    </DemoPageLayout>
  );
}
