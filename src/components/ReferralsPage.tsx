
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Gift, Users, Link2, Share, Crown, Calendar, CheckCircle, Clock, UserPlus, Copy, Mail, MessageSquare, Facebook } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Referral {
  id: string
  name: string
  email: string
  status: "pending" | "registered" | "confirmed"
  joinDate: string
  rewardEarned?: string
}

interface Reward {
  id: string
  type: "days" | "credits" | "features"
  value: number
  description: string
  requiredReferrals: number
  icon: React.ComponentType
}

export function ReferralsPage() {
  const { toast } = useToast()
  const [referralLink, setReferralLink] = useState("")
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [shareMethod, setShareMethod] = useState("")
  
  // Mock data - in real app this would come from backend
  const [referrals] = useState<Referral[]>([
    {
      id: "1",
      name: "João Silva",
      email: "joao@example.com",
      status: "confirmed",
      joinDate: "2024-01-15",
      rewardEarned: "30 days Premium"
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@example.com",
      status: "registered",
      joinDate: "2024-01-18"
    },
    {
      id: "3",
      name: "Pedro Costa",
      email: "pedro@example.com",
      status: "pending",
      joinDate: "2024-01-20"
    }
  ])

  const rewards: Reward[] = [
    {
      id: "1",
      type: "days",
      value: 30,
      description: "30 Days Premium Free",
      requiredReferrals: 3,
      icon: Crown
    },
    {
      id: "2",
      type: "days",
      value: 60,
      description: "60 Days Premium Free",
      requiredReferrals: 5,
      icon: Calendar
    },
    {
      id: "3",
      type: "features",
      value: 1,
      description: "Unlock Premium Features",
      requiredReferrals: 10,
      icon: Gift
    }
  ]

  const confirmedReferrals = referrals.filter(r => r.status === "confirmed").length
  const totalRewards = Math.floor(confirmedReferrals / 3) * 30 // 30 days per 3 referrals

  useEffect(() => {
    // Generate referral link based on user ID
    const userId = "user123" // In real app, get from auth context
    setReferralLink(`https://featherbiz.com/invite/${userId}`)
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    toast({
      title: "Link Copied!",
      description: "Your referral link has been copied to clipboard"
    })
  }

  const handleShare = (method: string) => {
    setShareMethod(method)
    const message = "Join FeatherBiz - The AI-Powered Business Platform!"
    const encodedMessage = encodeURIComponent(message)
    const encodedLink = encodeURIComponent(referralLink)
    
    let url = ""
    
    switch (method) {
      case "whatsapp":
        url = `https://wa.me/?text=${encodedMessage}%20${encodedLink}`
        break
      case "email":
        url = `mailto:?subject=${encodedMessage}&body=Check out this amazing business platform: ${encodedLink}`
        break
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`
        break
      case "imessage":
        url = `sms:&body=${encodedMessage}%20${encodedLink}`
        break
    }
    
    if (url) {
      window.open(url, '_blank')
      setShareDialogOpen(true)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "registered":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "registered":
        return <UserPlus className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Referrals</h1>
          <p className="text-muted-foreground">
            Invite friends and earn rewards together
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Gift className="h-4 w-4" />
          View All Rewards
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referrals.length}</div>
            <p className="text-xs text-muted-foreground">
              {confirmedReferrals} confirmed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rewards Earned</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRewards} days</div>
            <p className="text-xs text-muted-foreground">
              Premium access
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Reward</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{3 - (confirmedReferrals % 3)}</div>
            <p className="text-xs text-muted-foreground">
              more invites needed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="invite" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="invite">Invite Friends</TabsTrigger>
          <TabsTrigger value="dashboard">My Referrals</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        {/* Invite Tab */}
        <TabsContent value="invite" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share className="h-5 w-5" />
                Share Your Referral Link
              </CardTitle>
              <CardDescription>
                Share your unique link and earn rewards when friends join
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input value={referralLink} readOnly className="flex-1" />
                <Button onClick={handleCopyLink} variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button 
                  onClick={() => handleShare("whatsapp")}
                  variant="outline" 
                  className="flex items-center gap-2 h-12"
                >
                  <MessageSquare className="h-4 w-4 text-green-600" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </Button>
                
                <Button 
                  onClick={() => handleShare("imessage")}
                  variant="outline" 
                  className="flex items-center gap-2 h-12"
                >
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                  <span className="hidden sm:inline">iMessage</span>
                </Button>
                
                <Button 
                  onClick={() => handleShare("email")}
                  variant="outline" 
                  className="flex items-center gap-2 h-12"
                >
                  <Mail className="h-4 w-4 text-red-600" />
                  <span className="hidden sm:inline">Email</span>
                </Button>
                
                <Button 
                  onClick={() => handleShare("facebook")}
                  variant="outline" 
                  className="flex items-center gap-2 h-12"
                >
                  <Facebook className="h-4 w-4 text-blue-800" />
                  <span className="hidden sm:inline">Facebook</span>
                </Button>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Share your unique referral link</li>
                  <li>2. Friends sign up using your link</li>
                  <li>3. You both get rewards when they confirm their account</li>
                  <li>4. Invite 3 users = 30 days free Premium!</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Referrals</CardTitle>
              <CardDescription>
                Track the status of people you've invited
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referrals.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{referral.name}</p>
                        <Badge variant="outline" className={getStatusColor(referral.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(referral.status)}
                            {referral.status}
                          </span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{referral.email}</p>
                      <p className="text-xs text-muted-foreground">Joined: {referral.joinDate}</p>
                    </div>
                    {referral.rewardEarned && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {referral.rewardEarned}
                      </Badge>
                    )}
                  </div>
                ))}
                
                {referrals.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No referrals yet</p>
                    <p className="text-sm text-muted-foreground">Start inviting friends to see them here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rewards.map((reward) => {
              const IconComponent = reward.icon
              const isEarned = confirmedReferrals >= reward.requiredReferrals
              const progress = Math.min((confirmedReferrals / reward.requiredReferrals) * 100, 100)
              
              return (
                <Card key={reward.id} className={`relative ${isEarned ? 'border-green-500 bg-green-50' : ''}`}>
                  {isEarned && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-500">Earned!</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-2">
                      <IconComponent className={`h-8 w-8 ${isEarned ? 'text-green-600' : 'text-muted-foreground'}`} />
                    </div>
                    <CardTitle className="text-lg">{reward.description}</CardTitle>
                    <CardDescription>
                      Invite {reward.requiredReferrals} friends
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{confirmedReferrals}/{reward.requiredReferrals}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${isEarned ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Share Confirmation Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Shared Successfully!
            </DialogTitle>
            <DialogDescription>
              Your referral link has been shared via {shareMethod}. 
              You'll be notified when someone signs up using your link.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setShareDialogOpen(false)}>
              Great!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
