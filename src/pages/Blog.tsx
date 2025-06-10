
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate, Link } from "react-router-dom"
import { Heart, Share2, MessageCircle, Calendar, User, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function Blog() {
  const navigate = useNavigate()
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())

  const handleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const blogPosts = [
    {
      id: 1,
      title: "10 Ways AI is Revolutionizing Small Business Operations",
      excerpt: "Discover how artificial intelligence is transforming the way small businesses operate, from automated invoicing to intelligent scheduling.",
      author: "Sarah Johnson",
      date: "2025-01-08",
      category: "AI & Technology",
      image: "/lovable-uploads/0e5059d6-0019-4810-aa5e-28488bd3ebfe.png",
      readTime: "5 min read",
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      title: "The Complete Guide to Project Management for Growing Teams",
      excerpt: "Learn essential project management strategies that scale with your business, from startup to enterprise level.",
      author: "Michael Chen",
      date: "2025-01-05",
      category: "Project Management",
      image: "/lovable-uploads/94a8f69c-f543-4b11-9bf7-8a3bb6f92f0f.png",
      readTime: "8 min read",
      likes: 31,
      comments: 12
    },
    {
      id: 3,
      title: "Streamlining Your Invoice Process: Best Practices for 2025",
      excerpt: "Modern invoicing strategies that improve cash flow and reduce administrative overhead for your business.",
      author: "Emily Rodriguez",
      date: "2025-01-03",
      category: "Finance",
      image: "/lovable-uploads/d0136229-21fd-4d10-bf06-8b0bcd905d73.png",
      readTime: "6 min read",
      likes: 18,
      comments: 5
    },
    {
      id: 4,
      title: "Building a Remote Team: Tools and Strategies That Work",
      excerpt: "Everything you need to know about creating and managing successful remote teams in today's digital workplace.",
      author: "David Kim",
      date: "2025-01-01",
      category: "Remote Work",
      image: "/lovable-uploads/8ce55bd9-24d8-4ad9-9f66-9dee70c7954c.png",
      readTime: "7 min read",
      likes: 42,
      comments: 16
    },
    {
      id: 5,
      title: "Customer Relationship Management: Beyond the Basics",
      excerpt: "Advanced CRM strategies that help you build lasting relationships and drive business growth.",
      author: "Lisa Park",
      date: "2024-12-28",
      category: "CRM",
      image: "/lovable-uploads/0e5059d6-0019-4810-aa5e-28488bd3ebfe.png",
      readTime: "9 min read",
      likes: 27,
      comments: 9
    },
    {
      id: 6,
      title: "The Future of Business Automation: Trends to Watch",
      excerpt: "Explore upcoming automation trends that will shape how businesses operate in the next decade.",
      author: "Alex Thompson",
      date: "2024-12-25",
      category: "Automation",
      image: "/lovable-uploads/94a8f69c-f543-4b11-9bf7-8a3bb6f92f0f.png",
      readTime: "6 min read",
      likes: 35,
      comments: 14
    }
  ]

  const categories = ["All", "AI & Technology", "Project Management", "Finance", "Remote Work", "CRM", "Automation"]
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/9c9fc115-bd20-4b1a-91a2-103ecc8ca698.png" 
                    alt="FeatherBiz Logo" 
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-primary">FeatherBiz</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/#features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              <span className="text-primary font-medium">Blog</span>
            </div>

            <div className="flex items-center space-x-4">
              <Button onClick={() => navigate('/dashboard')} variant="outline">
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-6">
            FeatherBiz Blog
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Insights, tips, and strategies to help you grow your business and work smarter
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    {post.category}
                  </Badge>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center text-xs text-muted-foreground space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            likedPosts.has(post.id) ? 'fill-primary text-primary' : ''
                          }`}
                        />
                        <span className="text-sm">
                          {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                        </span>
                      </button>
                      
                      <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      
                      <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      Read More
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
            Stay Updated with Our Latest Insights
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Get the latest business tips, industry news, and FeatherBiz updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-background text-foreground border border-border"
            />
            <Button className="bg-background text-primary hover:bg-background/90 px-6 py-3">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/9c9fc115-bd20-4b1a-91a2-103ecc8ca698.png" 
                  alt="FeatherBiz Logo" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-xl font-bold text-primary">FeatherBiz</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              © 2025 FeatherBiz. By FX American Group.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
