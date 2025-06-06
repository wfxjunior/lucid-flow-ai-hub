
import { useState } from "react"
import { Heart, Plus, TrendingUp, Clock, CheckCircle, Crown, Menu, Star, Users, MessageCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/LanguageContext"
import { toast } from "@/hooks/use-toast"
import { useSidebar } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

interface Feature {
  id: string
  title: string
  description: string
  likes: number
  status: "pending" | "in-progress" | "completed"
  category: string
  submittedBy: string
  submittedAt: string
  isLiked: boolean
}

interface Comment {
  id: string
  featureId: string
  text: string
  author: string
  createdAt: string
}

export function FeaturesPage() {
  const { t } = useLanguage()
  const { toggleSidebar } = useSidebar()
  
  // Mock premium status - in a real app, this would come from your auth/subscription system
  const [hasPremium] = useState(false)
  
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: "1",
      title: "Real-time Collaboration",
      description: "Allow multiple team members to work on invoices and projects simultaneously with live updates.",
      likes: 24,
      status: "in-progress",
      category: "Collaboration",
      submittedBy: "Sarah M.",
      submittedAt: "2024-01-15",
      isLiked: false
    },
    {
      id: "2",
      title: "Mobile App for iOS/Android",
      description: "Native mobile applications for managing business operations on the go.",
      likes: 18,
      status: "pending",
      category: "Mobile",
      submittedBy: "John D.",
      submittedAt: "2024-01-20",
      isLiked: true
    },
    {
      id: "3",
      title: "Advanced Reporting Dashboard",
      description: "More detailed analytics with custom date ranges, export options, and visual charts.",
      likes: 31,
      status: "completed",
      category: "Analytics",
      submittedBy: "Maria L.",
      submittedAt: "2024-01-10",
      isLiked: false
    },
    {
      id: "4",
      title: "Integration with QuickBooks",
      description: "Sync data automatically with QuickBooks for seamless accounting workflow.",
      likes: 15,
      status: "pending",
      category: "Integration",
      submittedBy: "David R.",
      submittedAt: "2024-01-25",
      isLiked: false
    }
  ])

  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      featureId: "1",
      text: "This would be amazing for our team workflow!",
      author: "Alex K.",
      createdAt: "2024-01-16"
    },
    {
      id: "2",
      featureId: "2",
      text: "Really looking forward to this feature!",
      author: "Emma S.",
      createdAt: "2024-01-21"
    }
  ])

  const [newFeature, setNewFeature] = useState({
    title: "",
    description: "",
    category: ""
  })

  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [newComment, setNewComment] = useState("")

  const handleLike = (featureId: string) => {
    if (!hasPremium) {
      toast({
        title: "Premium Feature Required",
        description: "Upgrade to premium to like feature requests.",
        variant: "destructive"
      })
      return
    }

    setFeatures(features.map(feature => 
      feature.id === featureId 
        ? { 
            ...feature, 
            likes: feature.isLiked ? feature.likes - 1 : feature.likes + 1,
            isLiked: !feature.isLiked 
          }
        : feature
    ))
  }

  const handleSubmitFeature = () => {
    if (!hasPremium) {
      toast({
        title: "Premium Feature Required",
        description: "Upgrade to premium to suggest new features.",
        variant: "destructive"
      })
      return
    }

    if (newFeature.title.trim() && newFeature.description.trim()) {
      const feature: Feature = {
        id: Date.now().toString(),
        title: newFeature.title,
        description: newFeature.description,
        likes: 0,
        status: "pending",
        category: newFeature.category || "General",
        submittedBy: "You",
        submittedAt: new Date().toISOString().split('T')[0],
        isLiked: false
      }
      
      setFeatures([feature, ...features])
      setNewFeature({ title: "", description: "", category: "" })
      setShowAddForm(false)
      
      toast({
        title: "Feature Submitted",
        description: "Your feature request has been submitted for review.",
      })
    } else {
      toast({
        title: "Please fill all required fields",
        description: "Title and description are required.",
        variant: "destructive"
      })
    }
  }

  const handleAddComment = (featureId: string) => {
    if (!hasPremium) {
      toast({
        title: "Premium Feature Required",
        description: "Upgrade to premium to comment on features.",
        variant: "destructive"
      })
      return
    }

    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        featureId,
        text: newComment,
        author: "You",
        createdAt: new Date().toISOString().split('T')[0]
      }
      
      setComments([...comments, comment])
      setNewComment("")
      
      toast({
        title: "Comment Added",
        description: "Your comment has been added.",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200"
      case "in-progress": return "bg-blue-100 text-blue-800 border-blue-200"
      default: return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4" />
      case "in-progress": return <TrendingUp className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completed"
      case "in-progress": return "In Progress"
      default: return "Under Review"
    }
  }

  const sortedFeatures = [...features].sort((a, b) => b.likes - a.likes)
  const totalFeatures = features.length
  const completedFeatures = features.filter(f => f.status === "completed").length
  const inProgressFeatures = features.filter(f => f.status === "in-progress").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Button onClick={toggleSidebar} variant="outline" size="sm">
              <Menu className="mr-2 h-4 w-4" />
              Menu
            </Button>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🚀 Feature Requests
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Shape the future of FeatherBiz! Your ideas drive our development. 
              Suggest features, vote on proposals, and see your requests come to life.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-2xl font-bold text-gray-900">{totalFeatures}</span>
                </div>
                <p className="text-sm text-gray-600">Total Requests</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <span className="text-2xl font-bold text-gray-900">{inProgressFeatures}</span>
                </div>
                <p className="text-sm text-gray-600">In Development</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-2xl font-bold text-gray-900">{completedFeatures}</span>
                </div>
                <p className="text-sm text-gray-600">Completed</p>
              </CardContent>
            </Card>
          </div>

          {/* Premium Notice */}
          {!hasPremium && (
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 justify-center">
                  <Crown className="h-6 w-6 text-yellow-600" />
                  <div className="text-center">
                    <h3 className="font-semibold text-yellow-800">Unlock Premium Features</h3>
                    <p className="text-yellow-700 text-sm mt-1">
                      Suggest features, vote, and comment with a premium account
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Action Section */}
        <div className="flex justify-center">
          <Button 
            onClick={() => hasPremium ? setShowAddForm(!showAddForm) : toast({
              title: "Premium Feature Required",
              description: "Upgrade to premium to suggest new features.",
              variant: "destructive"
            })}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
          >
            {!hasPremium && <Crown className="h-5 w-5 mr-2" />}
            <Plus className="h-5 w-5 mr-2" />
            Suggest New Feature
          </Button>
        </div>

        {/* Add Feature Form */}
        {showAddForm && hasPremium && (
          <Card className="max-w-2xl mx-auto bg-white shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Suggest a New Feature
              </CardTitle>
              <CardDescription className="text-blue-100">
                Tell us about the feature you'd like to see in FeatherBiz
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Feature Title *</label>
                <Input
                  placeholder="e.g., Advanced Email Templates"
                  value={newFeature.title}
                  onChange={(e) => setNewFeature({ ...newFeature, title: e.target.value })}
                  className="border-2 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Category</label>
                <Input
                  placeholder="e.g., Communication, Analytics, Integration"
                  value={newFeature.category}
                  onChange={(e) => setNewFeature({ ...newFeature, category: e.target.value })}
                  className="border-2 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Description *</label>
                <Textarea
                  placeholder="Describe your feature idea in detail. How would it help you and other users?"
                  value={newFeature.description}
                  onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                  rows={4}
                  className="border-2 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={handleSubmitFeature}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                >
                  Submit Feature Request
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)} className="border-2">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features List */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Community Requests</h2>
            <p className="text-gray-600">Sorted by popularity - your votes matter!</p>
          </div>
          
          <div className="grid gap-6 max-w-4xl mx-auto">
            {sortedFeatures.map((feature) => (
              <Card key={feature.id} className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      {/* Header */}
                      <div className="flex items-start gap-3 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={`${getStatusColor(feature.status)} font-semibold border`}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(feature.status)}
                                <span>{getStatusText(feature.status)}</span>
                              </div>
                            </Badge>
                            <Badge variant="outline" className="bg-gray-50 border-gray-200">
                              {feature.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                      
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>by {feature.submittedBy}</span>
                        </div>
                        <span>•</span>
                        <span>{new Date(feature.submittedAt).toLocaleDateString()}</span>
                      </div>

                      {/* Comments Section */}
                      {selectedFeature === feature.id && (
                        <div className="mt-6 space-y-4 border-t pt-6">
                          <h4 className="font-semibold flex items-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            Comments
                          </h4>
                          {comments
                            .filter(comment => comment.featureId === feature.id)
                            .map((comment) => (
                              <div key={comment.id} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                                <p className="text-gray-800">{comment.text}</p>
                                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                                  <span className="font-medium">{comment.author}</span>
                                  <span>•</span>
                                  <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                            ))}
                          
                          {hasPremium ? (
                            <div className="flex gap-2">
                              <Input
                                placeholder="Add your thoughts..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="flex-1 border-2 focus:border-blue-500"
                              />
                              <Button 
                                onClick={() => handleAddComment(feature.id)}
                                disabled={!newComment.trim()}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                Post
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                              <Crown className="h-4 w-4 text-yellow-600" />
                              <span className="text-sm text-yellow-800">Premium required to comment</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(feature.id)}
                        className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-200 ${
                          feature.isLiked 
                            ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                            : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                        }`}
                        disabled={!hasPremium}
                      >
                        <Heart 
                          className={`h-6 w-6 ${feature.isLiked ? 'fill-red-600 text-red-600' : ''}`} 
                        />
                        <span className="font-bold text-lg">{feature.likes}</span>
                        <span className="text-xs">votes</span>
                      </Button>
                      
                      <Separator className="w-full" />
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedFeature(
                          selectedFeature === feature.id ? null : feature.id
                        )}
                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all duration-200"
                      >
                        <MessageCircle className="h-4 w-4" />
                        {selectedFeature === feature.id ? 'Hide' : 'Comments'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardContent className="p-8 text-center">
            <h3 className="font-semibold text-gray-900 mb-3">How Feature Requests Work</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
              <div>
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Plus className="h-6 w-6 text-blue-600" />
                </div>
                <p><strong>1. Submit Ideas</strong><br />Share your feature suggestions with the community</p>
              </div>
              <div>
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <p><strong>2. Vote & Discuss</strong><br />Community votes help us prioritize development</p>
              </div>
              <div>
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <p><strong>3. See Results</strong><br />Popular features are built and released monthly</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
