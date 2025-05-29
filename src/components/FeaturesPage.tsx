import { useState } from "react"
import { Heart, Plus, TrendingUp, Clock, CheckCircle, Crown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/LanguageContext"
import { PricingPlans } from "@/components/PricingPlans"

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

export function FeaturesPage() {
  const { t } = useLanguage()
  const [hasPremium] = useState(false) // This would come from your auth/subscription system
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

  const [newFeature, setNewFeature] = useState({
    title: "",
    description: "",
    category: ""
  })

  const [showAddForm, setShowAddForm] = useState(false)

  // If user doesn't have premium, show pricing plans
  if (!hasPremium) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Crown className="h-8 w-8 text-yellow-500" />
            <h1 className="text-3xl font-bold">Premium Feature</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Feature requests are available with our premium plans. Upgrade to suggest new features and vote on community ideas.
          </p>
        </div>

        <PricingPlans />
      </div>
    )
  }

  const handleLike = (featureId: string) => {
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
        <div className="flex items-center justify-center gap-2">
          <Crown className="h-6 w-6 text-yellow-500" />
          <h1 className="text-3xl font-bold">Feature Requests</h1>
          <Badge className="bg-yellow-100 text-yellow-800">Premium</Badge>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Help us build the future of FeatherBiz! Suggest new features and vote on existing ones. 
          The most popular requests get prioritized in our development roadmap.
        </p>
      </div>

      {/* Add Feature Button */}
      <div className="flex justify-center">
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2"
          size="lg"
        >
          <Plus className="h-4 w-4" />
          Suggest a Feature
        </Button>
      </div>

      {/* Add Feature Form */}
      {showAddForm && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Suggest a New Feature</CardTitle>
            <CardDescription>
              Tell us about the feature you'd like to see in FeatherBiz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Feature Title</label>
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
              <label className="text-sm font-medium">Description</label>
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
                </div>

                <div className="flex flex-col items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(feature.id)}
                    className={`flex items-center gap-1 ${
                      feature.isLiked ? 'text-blue-600' : 'text-muted-foreground'
                    }`}
                  >
                    <Heart 
                      className={`h-5 w-5 ${feature.isLiked ? 'fill-blue-600 text-blue-600' : ''}`} 
                    />
                    <span className="font-medium">{feature.likes}</span>
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
