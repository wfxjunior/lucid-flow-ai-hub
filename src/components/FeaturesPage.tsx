
import { useState } from "react"
import { Heart, Plus, TrendingUp, Clock, CheckCircle, Crown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/LanguageContext"
import { toast } from "@/hooks/use-toast"

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
      case "completed": return "bg-green-100 text-green-800"
      case "in-progress": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4" />
      case "in-progress": return <TrendingUp className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const sortedFeatures = [...features].sort((a, b) => b.likes - a.likes)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Feature Requests</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Help us build the future of FeatherBiz! Suggest new features and vote on existing ones. 
          The most popular requests get prioritized in our development roadmap.
        </p>
        {!hasPremium && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 justify-center">
              <Crown className="h-5 w-5 text-yellow-600" />
              <p className="text-yellow-800 font-medium">
                Premium features like suggesting, liking, and commenting require an upgrade
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add Feature Button */}
      <div className="flex justify-center">
        <Button 
          onClick={() => hasPremium ? setShowAddForm(!showAddForm) : toast({
            title: "Premium Feature Required",
            description: "Upgrade to premium to suggest new features.",
            variant: "destructive"
          })}
          className="flex items-center gap-2"
          size="lg"
          variant={hasPremium ? "default" : "outline"}
        >
          {!hasPremium && <Crown className="h-4 w-4" />}
          <Plus className="h-4 w-4" />
          Suggest a Feature
        </Button>
      </div>

      {/* Add Feature Form */}
      {showAddForm && hasPremium && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Suggest a New Feature</CardTitle>
            <CardDescription>
              Tell us about the feature you'd like to see in FeatherBiz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Feature Title *</label>
              <Input
                placeholder="e.g., Advanced Email Templates"
                value={newFeature.title}
                onChange={(e) => setNewFeature({ ...newFeature, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <Input
                placeholder="e.g., Communication, Analytics, Integration"
                value={newFeature.category}
                onChange={(e) => setNewFeature({ ...newFeature, category: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description *</label>
              <Textarea
                placeholder="Describe your feature idea in detail..."
                value={newFeature.description}
                onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSubmitFeature}>Submit Feature</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features List */}
      <div className="grid gap-4 max-w-4xl mx-auto">
        {sortedFeatures.map((feature) => (
          <Card key={feature.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <Badge variant="outline" className={getStatusColor(feature.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(feature.status)}
                        <span className="capitalize">{feature.status.replace('-', ' ')}</span>
                      </div>
                    </Badge>
                    <Badge variant="secondary">{feature.category}</Badge>
                  </div>
                  
                  <p className="text-muted-foreground">{feature.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Submitted by {feature.submittedBy}</span>
                    <span>•</span>
                    <span>{feature.submittedAt}</span>
                  </div>

                  {/* Comments Section */}
                  {selectedFeature === feature.id && (
                    <div className="mt-4 space-y-3 border-t pt-4">
                      <h4 className="font-medium">Comments</h4>
                      {comments
                        .filter(comment => comment.featureId === feature.id)
                        .map((comment) => (
                          <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                            <p className="text-sm">{comment.text}</p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                              <span>{comment.author}</span>
                              <span>•</span>
                              <span>{comment.createdAt}</span>
                            </div>
                          </div>
                        ))}
                      
                      {hasPremium ? (
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="flex-1"
                          />
                          <Button 
                            size="sm" 
                            onClick={() => handleAddComment(feature.id)}
                            disabled={!newComment.trim()}
                          >
                            Post
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                          <Crown className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm text-yellow-800">Premium required to comment</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(feature.id)}
                    className={`flex items-center gap-1 ${
                      feature.isLiked ? 'text-blue-600' : 'text-muted-foreground'
                    }`}
                    disabled={!hasPremium}
                  >
                    <Heart 
                      className={`h-5 w-5 ${feature.isLiked ? 'fill-blue-600 text-blue-600' : ''}`} 
                    />
                    <span className="font-medium">{feature.likes}</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFeature(
                      selectedFeature === feature.id ? null : feature.id
                    )}
                    className="text-xs"
                  >
                    {selectedFeature === feature.id ? 'Hide' : 'Comments'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Info */}
      <div className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
        <p>
          Features are prioritized based on community votes, technical feasibility, and alignment with our product roadmap. 
          We review suggestions monthly and update status accordingly.
        </p>
      </div>
    </div>
  )
}
