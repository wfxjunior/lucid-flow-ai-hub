
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Users, Star, MapPin, Calendar } from 'lucide-react'

interface ToursPageProps {
  onNavigate: (view: string) => void
}

export function ToursPage({ onNavigate }: ToursPageProps) {
  const [tours] = useState([
    {
      id: 1,
      title: 'Getting Started with FeatherBiz',
      description: 'Complete walkthrough of the platform basics and setup',
      duration: '15 minutes',
      participants: 1240,
      rating: 4.8,
      category: 'basics',
      featured: true,
      thumbnail: '/lovable-uploads/tour-1.jpg',
      modules: [
        'Dashboard Overview',
        'Setting Up Your Profile',
        'Creating Your First Invoice',
        'Managing Customers'
      ]
    },
    {
      id: 2,
      title: 'Advanced Invoice Management',
      description: 'Master invoice creation, automation, and payment tracking',
      duration: '25 minutes',
      participants: 890,
      rating: 4.9,
      category: 'invoicing',
      featured: false,
      thumbnail: '/lovable-uploads/tour-2.jpg',
      modules: [
        'Custom Invoice Templates',
        'Automated Reminders',
        'Payment Processing',
        'Reports and Analytics'
      ]
    },
    {
      id: 3,
      title: 'Customer Relationship Management',
      description: 'Build stronger relationships and track customer interactions',
      duration: '20 minutes',
      participants: 675,
      rating: 4.7,
      category: 'crm',
      featured: false,
      thumbnail: '/lovable-uploads/tour-3.jpg',
      modules: [
        'Customer Profiles',
        'Communication History',
        'Follow-up Scheduling',
        'Customer Segmentation'
      ]
    },
    {
      id: 4,
      title: 'Project Management Essentials',
      description: 'Organize projects, track progress, and manage deadlines',
      duration: '30 minutes',
      participants: 524,
      rating: 4.6,
      category: 'projects',
      featured: false,
      thumbnail: '/lovable-uploads/tour-4.jpg',
      modules: [
        'Creating Projects',
        'Task Management',
        'Timeline View',
        'Team Collaboration'
      ]
    },
    {
      id: 5,
      title: 'Financial Analytics and Reporting',
      description: 'Understand your business performance with detailed analytics',
      duration: '22 minutes',
      participants: 432,
      rating: 4.8,
      category: 'analytics',
      featured: true,
      thumbnail: '/lovable-uploads/tour-5.jpg',
      modules: [
        'Revenue Tracking',
        'Expense Management',
        'Profit Analysis',
        'Custom Reports'
      ]
    }
  ])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basics': return 'bg-blue-100 text-blue-800'
      case 'invoicing': return 'bg-green-100 text-green-800'
      case 'crm': return 'bg-purple-100 text-purple-800'
      case 'projects': return 'bg-orange-100 text-orange-800'
      case 'analytics': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'basics': return 'Basics'
      case 'invoicing': return 'Invoicing'
      case 'crm': return 'CRM'
      case 'projects': return 'Projects'
      case 'analytics': return 'Analytics'
      default: return 'General'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Interactive Tours</h1>
          <p className="text-muted-foreground mt-2">Learn FeatherBiz with guided, interactive tutorials</p>
        </div>
        <Button className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Schedule Live Demo
        </Button>
      </div>

      {/* Featured Tours */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Featured Tours</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tours.filter(tour => tour.featured).map((tour) => (
            <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <Play className="h-12 w-12 text-blue-600" />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{tour.title}</CardTitle>
                    <CardDescription className="mt-2">{tour.description}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Featured
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {tour.participants.toLocaleString()} learners
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    {tour.rating}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">What you'll learn:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {tour.modules.slice(0, 3).map((module, index) => (
                      <li key={index}>• {module}</li>
                    ))}
                    {tour.modules.length > 3 && (
                      <li>• +{tour.modules.length - 3} more modules</li>
                    )}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Badge className={getCategoryColor(tour.category)}>
                    {getCategoryName(tour.category)}
                  </Badge>
                  <Button className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Start Tour
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Tours */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.filter(tour => !tour.featured).map((tour) => (
            <Card key={tour.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <Play className="h-8 w-8 text-gray-600" />
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">{tour.title}</CardTitle>
                <CardDescription className="text-sm">{tour.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current text-yellow-500" />
                    {tour.rating}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={getCategoryColor(tour.category)} variant="secondary">
                    {getCategoryName(tour.category)}
                  </Badge>
                  <Button size="sm" className="flex items-center gap-1">
                    <Play className="h-3 w-3" />
                    Start
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Getting Help */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Need More Help?
          </CardTitle>
          <CardDescription>
            Can't find what you're looking for? Our support team is here to help.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button variant="outline">
            Contact Support
          </Button>
          <Button variant="outline">
            Schedule 1-on-1 Demo
          </Button>
          <Button variant="outline" onClick={() => onNavigate('faq-help')}>
            View FAQ
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
