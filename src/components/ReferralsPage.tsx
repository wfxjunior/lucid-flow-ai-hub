import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Share2, Gift, Users, DollarSign, Trophy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

function generateReferralCode(email: string | null): string {
  // Gera código determinístico, único por e-mail. Se quiser randomizar depois, pode adicionar um ID ou similar.
  if (!email) return "ANON-" + Math.random().toString(36).substring(2, 8).toUpperCase()
  // Simple: usa prefixo + 6 chars hash do email
  const cleanMail = email.split("@")[0] || "user"
  const hash = btoa(email).replace(/[^A-Z0-9]/gi, "").substring(0, 6).toUpperCase()
  return `${cleanMail}-${hash}`
}

export function ReferralsPage() {
  const { toast } = useToast()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [referralCode, setReferralCode] = useState<string>("")
  const [referralLink, setReferralLink] = useState<string>("")

  useEffect(() => {
    // Busca usuário atual do Supabase
    const fetchUserEmail = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        setUserEmail(null)
        setReferralCode("ANON-ERROR")
        setReferralLink("https://featherbiz.com/signup")
        return
      }

      const email = data?.user?.email ?? null
      setUserEmail(email)
      const code = generateReferralCode(email)
      setReferralCode(code)
      setReferralLink(`https://featherbiz.com/signup?ref=${code}`)
    }
    fetchUserEmail()
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    })
  }

  const shareOnSocial = (platform: string) => {
    const message = "Check out FeatherBiz - the complete business management platform!"
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(referralLink)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(message + " " + referralLink)}`
    }
    
    window.open(urls[platform as keyof typeof urls], '_blank')
  }

  const referralStats = [
    { label: "Total Referrals", value: "12", icon: Users, color: "text-blue-600" },
    { label: "Successful Signups", value: "8", icon: Trophy, color: "text-green-600" },
    { label: "Earnings", value: "$240", icon: DollarSign, color: "text-orange-600" },
    { label: "Pending Rewards", value: "$60", icon: Gift, color: "text-purple-600" }
  ]

  const recentReferrals = [
    { name: "John Smith", email: "john@example.com", status: "Active", reward: "$30", date: "2025-01-08" },
    { name: "Sarah Johnson", email: "sarah@example.com", status: "Pending", reward: "$30", date: "2025-01-07" },
    { name: "Mike Wilson", email: "mike@example.com", status: "Active", reward: "$30", date: "2025-01-05" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Refer Friends & Earn Rewards</h1>
          <p className="text-xl text-primary-foreground/90">
            Share FeatherBiz with your network and earn $30 for every successful referral
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {referralStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Share Your Link */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share Your Referral Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Referral Code</label>
                <div className="flex gap-2">
                  <Input value={referralCode} readOnly />
                  <Button onClick={() => copyToClipboard(referralCode)} variant="outline">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Your Referral Link</label>
                <div className="flex gap-2">
                  <Input value={referralLink} readOnly className="text-sm" />
                  <Button onClick={() => copyToClipboard(referralLink)} variant="outline">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Share on Social Media</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={() => shareOnSocial('facebook')} variant="outline" className="justify-start">
                    Facebook
                  </Button>
                  <Button onClick={() => shareOnSocial('twitter')} variant="outline" className="justify-start">
                    Twitter
                  </Button>
                  <Button onClick={() => shareOnSocial('linkedin')} variant="outline" className="justify-start">
                    LinkedIn
                  </Button>
                  <Button onClick={() => shareOnSocial('whatsapp')} variant="outline" className="justify-start">
                    WhatsApp
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Share Your Link</h4>
                    <p className="text-sm text-muted-foreground">Send your unique referral link to friends and colleagues</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">They Sign Up</h4>
                    <p className="text-sm text-muted-foreground">Your friend creates a FeatherBiz account using your link</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Earn Rewards</h4>
                    <p className="text-sm text-muted-foreground">Get $30 when they become a paying customer</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Bonus Rewards</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your friend gets 20% off their first month</li>
                  <li>• Unlimited referrals</li>
                  <li>• Instant payouts via PayPal</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Referrals */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReferrals.map((referral, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{referral.name}</p>
                    <p className="text-sm text-muted-foreground">{referral.email}</p>
                    <p className="text-xs text-muted-foreground">Referred on {referral.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={referral.status === 'Active' ? 'default' : 'secondary'}>
                      {referral.status}
                    </Badge>
                    <span className="font-medium text-green-600">{referral.reward}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
