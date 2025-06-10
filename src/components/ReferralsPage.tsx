
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Users, 
  Copy, 
  Share2,
  Gift,
  Trophy,
  Calendar,
  Check,
  Clock,
  UserPlus,
  Star,
  Target,
  Crown,
  ExternalLink
} from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface ReferredUser {
  id: string
  name: string
  email: string
  status: 'pending' | 'registered' | 'confirmed'
  inviteDate: string
  registrationDate?: string
}

interface Reward {
  id: string
  type: 'days' | 'credits' | 'features'
  threshold: number
  value: number
  description: string
  icon: any
}

export function ReferralsPage() {
  const { toast } = useToast()
  const [referralCode] = useState('FEATHER2024')
  const userId = 'user123' // This would come from auth context
  const referralLink = `https://featherbiz.com/signup?ref=${referralCode}`
  
  const [referredUsers] = useState<ReferredUser[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'confirmed',
      inviteDate: '2024-01-15',
      registrationDate: '2024-01-16'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'registered',
      inviteDate: '2024-01-20',
      registrationDate: '2024-01-21'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      status: 'pending',
      inviteDate: '2024-01-25'
    }
  ])

  const [rewards] = useState<Reward[]>([
    {
      id: '1',
      type: 'days',
      threshold: 3,
      value: 30,
      description: 'Invite 3 users = 30 days free Premium',
      icon: Calendar
    },
    {
      id: '2',
      type: 'credits',
      threshold: 5,
      value: 100,
      description: 'Invite 5 users = 100 bonus credits',
      icon: Star
    },
    {
      id: '3',
      type: 'features',
      threshold: 10,
      value: 1,
      description: 'Invite 10 users = Unlock VIP features',
      icon: Crown
    }
  ])

  const [showShareDialog, setShowShareDialog] = useState(false)
  const [shareMethod, setShareMethod] = useState('')

  const confirmedCount = referredUsers.filter(user => user.status === 'confirmed').length
  const registeredCount = referredUsers.filter(user => user.status === 'registered').length
  const pendingCount = referredUsers.filter(user => user.status === 'pending').length

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    toast({
      title: "Link Copied!",
      description: "Your referral link has been copied to clipboard.",
    })
  }

  const shareVia = (method: string) => {
    const message = `Join FeatherBiz with my referral link and get premium features! ${referralLink}`
    
    let url = ''
    switch (method) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(message)}`
        break
      case 'email':
        url = `mailto:?subject=Join FeatherBiz&body=${encodeURIComponent(message)}`
        break
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`
        break
      default:
        copyToClipboard()
        return
    }
    
    setShareMethod(method)
    setShowShareDialog(true)
    
    if (url) {
      window.open(url, '_blank')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500'
      case 'registered':
        return 'bg-blue-500'
      case 'pending':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed'
      case 'registered':
        return 'Registered'
      case 'pending':
        return 'Pending'
      default:
        return 'Unknown'
    }
  }

  const getProgress = (threshold: number) => {
    return Math.min((confirmedCount / threshold) * 100, 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Referral Program</h1>
          <p className="text-muted-foreground">
            Invite friends and earn amazing rewards
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-sm">
            <Gift className="w-4 h-4 mr-1" />
            {confirmedCount} confirmed referrals
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Invited</p>
                <p className="text-2xl font-bold">{referredUsers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Registered</p>
                <p className="text-2xl font-bold">{registeredCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold">{confirmedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="share" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="share">Share & Invite</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="share" className="space-y-6">
          {/* Referral Link Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Your Referral Link
              </CardTitle>
              <CardDescription>
                Share your unique link and earn rewards when friends sign up
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="referral-link">Referral Link</Label>
                <div className="flex gap-2 mt-1">
                  <Input 
                    id="referral-link"
                    value={referralLink} 
                    readOnly 
                    className="font-mono text-sm"
                  />
                  <Button onClick={copyToClipboard} size="icon">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Share Buttons */}
              <div className="space-y-3">
                <Label>Share via:</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 h-12"
                    onClick={() => shareVia('whatsapp')}
                  >
                    <div className="w-5 h-5 bg-green-500 rounded" />
                    WhatsApp
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 h-12"
                    onClick={() => shareVia('email')}
                  >
                    <div className="w-5 h-5 bg-blue-500 rounded" />
                    Email
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 h-12"
                    onClick={() => shareVia('facebook')}
                  >
                    <div className="w-5 h-5 bg-blue-600 rounded" />
                    Messenger
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 h-12"
                    onClick={copyToClipboard}
                  >
                    <Copy className="w-5 h-5" />
                    Copy Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Referred Users */}
          <Card>
            <CardHeader>
              <CardTitle>Referred Users</CardTitle>
              <CardDescription>
                Track the status of people you've invited
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(user.status)}`} />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">
                        {getStatusText(user.status)}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        Invited: {new Date(user.inviteDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {referredUsers.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No referrals yet. Start inviting friends!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          {/* Rewards Progress */}
          <div className="grid gap-4">
            {rewards.map((reward) => {
              const progress = getProgress(reward.threshold)
              const isCompleted = progress >= 100
              
              return (
                <Card key={reward.id} className={isCompleted ? 'border-green-500 bg-green-50 dark:bg-green-950' : ''}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-100'}`}>
                          <reward.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{reward.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {confirmedCount} of {reward.threshold} confirmed referrals
                          </p>
                        </div>
                      </div>
                      {isCompleted && (
                        <Badge className="bg-green-500">
                          <Trophy className="w-3 h-3 mr-1" />
                          Earned!
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${progress}%` }}
                        />
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
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Successful!</DialogTitle>
            <DialogDescription>
              Your referral link has been shared via {shareMethod}. 
              You'll be notified when someone signs up using your link.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setShowShareDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
