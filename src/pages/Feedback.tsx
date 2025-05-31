
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Heart, Star, Send, Crown, Lock } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { PricingPlans } from "@/components/PricingPlans"

const Feedback = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState(0)
  
  // Mock authentication and premium status - in a real app, this would come from your auth/subscription system
  const [isAuthenticated] = useState(false) // Set to false to show the premium gate
  const [hasPremium] = useState(false) // This would come from your auth/subscription system
  const navigate = useNavigate()

  // If user is not authenticated or doesn't have premium, show premium gate
  if (!isAuthenticated || !hasPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="h-8 w-8 text-yellow-500" />
              <h1 className="text-3xl sm:text-4xl font-bold">Premium Feature</h1>
            </div>
            
            <div className="bg-white rounded-lg border shadow-sm p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Lock className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold mb-3">Feedback Submission</h2>
              <p className="text-muted-foreground mb-6">
                {!isAuthenticated 
                  ? "Please log in to access the feedback feature. Feedback submission is available with our premium plans."
                  : "Feedback submission is available with our premium plans. Upgrade to share your thoughts and help us improve FeatherBiz."
                }
              </p>
              
              <div className="flex gap-3 justify-center">
                {!isAuthenticated && (
                  <Button 
                    onClick={() => navigate('/auth')}
                    className="flex items-center gap-2"
                  >
                    Log In
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/dashboard')}
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <PricingPlans />
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!feedback.trim()) {
      toast({
        title: "Please enter your feedback",
        description: "Your feedback is important to us!",
        variant: "destructive"
      })
      return
    }

    // Simulate feedback submission
    toast({
      title: "Thank you for your feedback!",
      description: "We appreciate your input and will review it soon.",
    })

    // Reset form
    setName("")
    setEmail("")
    setFeedback("")
    setRating(0)
  }

  const feedbackExamples = [
    {
      name: "Sarah Johnson",
      feedback: "FeatherBiz has completely transformed how I manage my small business. The AI features are incredible!",
      rating: 5
    },
    {
      name: "Mike Chen",
      feedback: "The invoice creation is so intuitive and the document tracking feature is a game-changer.",
      rating: 5
    },
    {
      name: "Emma Wilson",
      feedback: "Love the family savings feature! It helps me separate business and personal finances perfectly.",
      rating: 5
    },
    {
      name: "David Martinez",
      feedback: "The AI voice assistant saves me hours every week. Highly recommend to any entrepreneur!",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-blue-600 fill-blue-600" />
            <h1 className="text-3xl sm:text-4xl font-bold">Feedback</h1>
            <Badge className="bg-yellow-100 text-yellow-800">Premium</Badge>
          </div>
          <p className="text-lg text-muted-foreground">
            We'd love to hear from you! Share your thoughts and help us improve FeatherBiz.
          </p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="mt-4"
          >
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-blue-600 fill-blue-600" />
                Share Your Feedback
              </CardTitle>
              <CardDescription>
                Tell us about your experience with FeatherBiz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name (optional)
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email (optional)
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setRating(star)}
                        className="p-1"
                      >
                        <Star 
                          className={`h-6 w-6 ${
                            star <= rating 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-300"
                          }`}
                        />
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="feedback" className="block text-sm font-medium mb-2">
                    Your Feedback *
                  </label>
                  <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your thoughts, suggestions, or experiences with FeatherBiz..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Feedback
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Customer Testimonials */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-blue-600 fill-blue-600" />
                  What Our Users Say
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {feedbackExamples.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-white/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            className={`h-4 w-4 ${
                              star <= item.rating 
                                ? "text-yellow-400 fill-yellow-400" 
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <Heart className="h-4 w-4 text-blue-600 fill-blue-600" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">"{item.feedback}"</p>
                    <p className="text-xs font-medium">— {item.name}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why Your Feedback Matters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-blue-600 fill-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Improve Features</h4>
                    <p className="text-sm text-muted-foreground">
                      Your input helps us enhance existing features and prioritize new ones.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-blue-600 fill-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Shape the Future</h4>
                    <p className="text-sm text-muted-foreground">
                      Be part of building the ultimate AI-powered business platform.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-blue-600 fill-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Community Driven</h4>
                    <p className="text-sm text-muted-foreground">
                      Join a community of entrepreneurs who care about innovation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feedback
