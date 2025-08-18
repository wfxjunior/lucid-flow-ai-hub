import { CleanPageLayout } from "@/components/layouts/CleanPageLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Building, 
  Users, 
  Target, 
  Calendar,
  TrendingUp,
  ArrowUpRight
} from "lucide-react"

const metrics = [
  {
    title: "Active Listings",
    value: "8",
    subtitle: "+2 this week",
    icon: Building
  },
  {
    title: "Qualified Leads",
    value: "24",
    subtitle: "+15% this month",
    icon: Users
  },
  {
    title: "Conversion Rate",
    value: "18%",
    subtitle: "+3% improved",
    icon: Target
  },
  {
    title: "Avg Days to Lease",
    value: "12 days",
    subtitle: "-4 days faster",
    icon: Calendar
  }
]

const activeListings = [
  {
    id: 1,
    name: "Sunset Apartments #204",
    platforms: ["Zillow", "Apartments.com", "Rent.com"],
    views: 247,
    leads: 8,
    price: "$1,850/mo",
    status: "Active"
  },
  {
    id: 2,
    name: "Oak View Complex #105",
    platforms: ["Zillow", "Craigslist"],
    views: 189,
    leads: 5,
    price: "$2,100/mo",
    status: "Active"
  },
  {
    id: 3,
    name: "Pine Street Building #301",
    platforms: ["Apartments.com", "Rent.com", "Facebook"],
    views: 156,
    leads: 3,
    price: "$1,750/mo",
    status: "Pending"
  }
]

interface GrowthPageProps {
  onNavigate: (view: string) => void
}

export function GrowthPage({ onNavigate }: GrowthPageProps) {
  const handleCreateCampaign = () => {
    console.log("Create campaign clicked")
  }

  return (
    <CleanPageLayout
      title="Growth Engine"
      subtitle="Listings, lead management, and marketing campaigns"
      actionLabel="Create Campaign"
      onActionClick={handleCreateCampaign}
      metrics={metrics}
    >
      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 mb-8">
        <Button 
          variant="secondary" 
          size="sm"
          className="bg-accent text-accent-foreground rounded-full px-6 py-2"
        >
          Listings & Syndication
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full px-6 py-2">
          Leads & CRM
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full px-6 py-2">
          Campaigns
        </Button>
      </div>

      {/* Active Property Listings */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Active Property Listings
          </h2>
        </div>

        <div className="space-y-4">
          {activeListings.map((listing) => (
            <Card key={listing.id} className="bg-card border border-border rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        {listing.name}
                      </h3>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-foreground mb-1">
                          {listing.price}
                        </div>
                        <Badge 
                          variant={listing.status === 'Active' ? 'success' : 'warning'}
                        >
                          {listing.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {listing.views} views • {listing.leads} leads
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {listing.platforms.map((platform, index) => (
                        <Badge key={index} variant="outline" className="bg-muted/50">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CleanPageLayout>
  )
}