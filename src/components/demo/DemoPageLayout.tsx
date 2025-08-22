
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface DemoPageLayoutProps {
  title: string;
  subtitle: string;
  badge?: string;
  children: React.ReactNode;
  onBack?: () => void;
}

export function DemoPageLayout({ 
  title, 
  subtitle, 
  badge, 
  children, 
  onBack 
}: DemoPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            {onBack && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="text-[#6B7280] hover:text-[#111827]"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            {badge && (
              <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {badge}
              </span>
            )}
          </div>
          <h1 className="text-4xl font-bold text-[#111827] mb-4">{title}</h1>
          <p className="text-xl text-[#6B7280] max-w-3xl">{subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        {children}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-[#E5E7EB] py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center px-4 py-2 text-sm bg-amber-50 text-amber-700 rounded-full border border-amber-200 mb-4">
            This is a demo page with sample data
          </div>
          <p className="text-[#6B7280] text-sm">
            Explore the features and see how they work with real business scenarios
          </p>
        </div>
      </div>
    </div>
  );
}
