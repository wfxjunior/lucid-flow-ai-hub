
import { useEffect } from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Company() {
  useEffect(() => {
    document.title = 'Company - FeatherBiz';
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <LandingHeader />
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Company</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Building the future of business automation with AI-first solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Founded</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Headquarters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">San Francisco, CA</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Size</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">50+ employees</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">AI-native business solutions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
