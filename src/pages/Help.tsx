
import { useEffect, useState } from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Book, Video, MessageSquare, ExternalLink } from 'lucide-react';

const helpCategories = [
  {
    title: 'Getting Started',
    description: 'New to FeatherBiz? Start here',
    icon: Book,
    articles: [
      'Setting up your account',
      'Creating your first invoice',
      'Managing customers',
      'Understanding the dashboard'
    ]
  },
  {
    title: 'Features & Tools',
    description: 'Learn about our powerful features',
    icon: Video,
    articles: [
      'AI Voice Assistant',
      'Pipeline Management',
      'Estimates & Quotes',
      'Work Orders',
      'Financial Tracking'
    ]
  },
  {
    title: 'Integrations',
    description: 'Connect with other tools',
    icon: MessageSquare,
    articles: [
      'Payment processors',
      'Accounting software',
      'Email marketing',
      'CRM systems'
    ]
  }
];

const popularArticles = [
  'How to create professional invoices',
  'Setting up automated workflows',
  'Managing your subscription',
  'Exporting your data',
  'Security and privacy settings'
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = 'Help & Documentation - FeatherBiz';
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <LandingHeader />
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Find answers to common questions and learn how to get the most out of FeatherBiz.
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Popular Articles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularArticles.map((article, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{article}</p>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Help Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {helpCategories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{category.title}</CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.articles.map((article, articleIndex) => (
                          <li key={articleIndex}>
                            <a 
                              href="#" 
                              className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center justify-between"
                            >
                              {article}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Contact Support */}
          <Card>
            <CardHeader>
              <CardTitle>Still need help?</CardTitle>
              <CardDescription>
                Can't find what you're looking for? Our support team is here to help.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Badge variant="outline" className="p-2">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Live Chat
                </Badge>
                <Badge variant="outline" className="p-2">
                  <Book className="h-4 w-4 mr-2" />
                  Email Support
                </Badge>
                <Badge variant="outline" className="p-2">
                  <Video className="h-4 w-4 mr-2" />
                  Video Tutorials
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
