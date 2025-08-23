
import { useEffect } from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  useEffect(() => {
    document.title = 'FeatherBiz - AI-Native Business Platform';
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <LandingHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              AI-Native Platform for Modern Business
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Build, scale and grow your business with data, automations, pipeline, productivity, and reporting.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/auth">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Everything you need to grow
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Powerful features designed to streamline your business operations
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-blue-600 mb-4" />
                  <CardTitle>Enterprise Security</CardTitle>
                  <CardDescription>
                    Bank-grade security with end-to-end encryption and compliance
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 text-blue-600 mb-4" />
                  <CardTitle>AI Automation</CardTitle>
                  <CardDescription>
                    Intelligent automation that learns and adapts to your workflow
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-blue-600 mb-4" />
                  <CardTitle>Team Collaboration</CardTitle>
                  <CardDescription>
                    Seamless collaboration tools for distributed teams
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
