
import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { Button } from '@/components/ui/button';

interface DemoPageLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  badge?: string;
}

export const DemoPageLayout: React.FC<DemoPageLayoutProps> = ({ 
  title, 
  subtitle, 
  children, 
  badge 
}) => {
  return (
    <div className="min-h-screen bg-white" data-demo="true">
      <meta name="robots" content="noindex" />
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#111827]">
              {title}
            </h1>
            {badge && (
              <span className="px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 rounded-full">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xl text-[#6B7280] mb-8 leading-relaxed">
            {subtitle}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild className="bg-[#111827] hover:bg-[#111827]/90 text-white px-6 py-3 rounded-lg font-medium">
              <Link to="/signup">Start for free</Link>
            </Button>
            <Link
              to="/contact"
              className="px-6 py-3 text-[#111827] hover:text-[#111827]/80 font-medium transition-colors"
            >
              Talk to sales
            </Link>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center px-3 py-1 text-sm bg-amber-50 text-amber-700 rounded-full border border-amber-200">
              Demo content — read-only
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="pb-16">
        {children}
      </main>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#F8FAFC] border-t border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold text-[#111827] mb-4">
            Continue with Pro
          </h2>
          <p className="text-[#6B7280] mb-6">
            Get full access to all features and unlock the complete FeatherBiz experience.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild className="bg-[#111827] hover:bg-[#111827]/90 text-white px-8 py-3 rounded-lg font-medium">
              <Link to="/signup">Start 14-day free trial</Link>
            </Button>
            <Link
              to="/contact"
              className="px-8 py-3 text-[#111827] hover:text-[#111827]/80 font-medium transition-colors"
            >
              Talk to sales
            </Link>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};
