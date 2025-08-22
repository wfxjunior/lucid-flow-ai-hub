
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon, ExternalLink } from 'lucide-react';

const mockSearchResults = [
  {
    title: 'AI Voice Assistant',
    description: 'Automate your business tasks with our intelligent voice assistant',
    url: '/features/ai-voice',
    type: 'feature'
  },
  {
    title: 'Professional Invoicing',
    description: 'Create and send professional invoices to your clients',
    url: '/features/invoices',
    type: 'feature'
  },
  {
    title: 'Project Pipeline Management',
    description: 'Track and manage your projects from start to finish',
    url: '/features/pipeline',
    type: 'feature'
  },
  {
    title: 'Pricing Plans',
    description: 'Choose the perfect plan for your business needs',
    url: '/pricing',
    type: 'page'
  },
  {
    title: 'Getting Started Guide',
    description: 'Learn how to set up and use FeatherBiz effectively',
    url: '/help',
    type: 'help'
  }
];

export default function Search() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState(mockSearchResults);

  useEffect(() => {
    document.title = query ? `Search: ${query} - FeatherBiz` : 'Search - FeatherBiz';
  }, [query]);

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      setQuery(searchQuery);
      performSearch(searchQuery);
    }
  }, [searchParams]);

  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(mockSearchResults);
      return;
    }

    const filtered = mockSearchResults.filter(result =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
    // Update URL without navigation
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('q', query);
    window.history.pushState({}, '', newUrl);
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      feature: 'bg-blue-100 text-blue-800',
      page: 'bg-green-100 text-green-800',
      help: 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <LandingHeader />
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Search</h1>
            <p className="text-xl text-gray-600 mb-8">
              Find features, help articles, and more
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-8">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for features, help articles, pricing..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 py-3 text-lg"
              />
            </form>
          </div>

          {/* Search Results */}
          <div className="space-y-4">
            {query && (
              <div className="text-gray-600 mb-6">
                {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
              </div>
            )}

            {results.length === 0 && query ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <SearchIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No results found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or browse our help center for more information.
                  </p>
                </CardContent>
              </Card>
            ) : (
              results.map((result, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{result.title}</h3>
                          <Badge className={getTypeBadge(result.type)}>
                            {result.type}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{result.description}</p>
                        <p className="text-sm text-gray-400">{result.url}</p>
                      </div>
                      <ExternalLink className="h-5 w-5 text-gray-400 ml-4" />
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Suggested Searches */}
          {!query && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-4">Popular Searches</h2>
              <div className="flex flex-wrap gap-2">
                {['AI Voice', 'Invoices', 'Pricing', 'Getting Started', 'Pipeline', 'Work Orders'].map((term) => (
                  <Badge 
                    key={term}
                    variant="outline" 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      setQuery(term);
                      performSearch(term);
                    }}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
