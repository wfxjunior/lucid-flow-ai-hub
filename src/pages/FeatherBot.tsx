
import { useEffect } from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare, Zap, Brain } from 'lucide-react';

export default function FeatherBot() {
  useEffect(() => {
    document.title = 'FeatherBot - AI Assistant | FeatherBiz';
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <LandingHeader />
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Bot className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">FeatherBot</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your intelligent AI assistant that helps automate tasks and provide insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <MessageSquare className="h-8 w-8 text-blue-600 mb-4" />
                <CardTitle>Natural Conversations</CardTitle>
                <CardDescription>
                  Chat naturally with FeatherBot to get help with any business task
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-blue-600 mb-4" />
                <CardTitle>Smart Automation</CardTitle>
                <CardDescription>
                  Automatically handle routine tasks and workflows
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Brain className="h-8 w-8 text-blue-600 mb-4" />
                <CardTitle>Business Intelligence</CardTitle>
                <CardDescription>
                  Get insights and recommendations based on your data
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Bot className="h-8 w-8 text-blue-600 mb-4" />
                <CardTitle>24/7 Availability</CardTitle>
                <CardDescription>
                  Always ready to help, whenever you need assistance
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg">
              Try FeatherBot Now
            </Button>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
