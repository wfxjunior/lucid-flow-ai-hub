
import { useEffect } from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function About() {
  useEffect(() => {
    document.title = 'About Us - FeatherBiz';
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <LandingHeader />
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About FeatherBiz</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              AI-native platform to build, scale and grow your business with data, automations, pipeline, productivity, and reporting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To empower businesses of all sizes with intelligent automation and data-driven insights that drive growth and efficiency.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  A world where every business can leverage AI to streamline operations, enhance productivity, and achieve sustainable growth.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Why Choose FeatherBiz?</CardTitle>
              <CardDescription>Built for modern businesses that value efficiency and growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">AI-Powered</h3>
                  <p className="text-sm text-gray-600">
                    Leverage artificial intelligence to automate repetitive tasks and gain insights from your data.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">All-in-One</h3>
                  <p className="text-sm text-gray-600">
                    Manage invoices, estimates, projects, teams, and more from a single platform.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Scalable</h3>
                  <p className="text-sm text-gray-600">
                    Grow from startup to enterprise with features that scale with your business needs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
