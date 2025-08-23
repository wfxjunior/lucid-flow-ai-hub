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
      <div className="flex flex-wrap items-center gap-2 mb-6 md:mb-8">
        <Button 
          variant="secondary" 
          size="sm"
          className="bg-accent text-accent-foreground rounded-full px-4 md:px-6 py-2 text-xs md:text-sm"
        >
          Listings & Syndication
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full px-4 md:px-6 py-2 text-xs md:text-sm">
          Leads & CRM
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full px-4 md:px-6 py-2 text-xs md:text-sm">
          Campaigns
        </Button>
      </div>

      {/* Active Property Listings */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
            Active Property Listings
          </h2>
        </div>

        <div className="space-y-4">
          {activeListings.map((listing) => (
            <Card key={listing.id} className="bg-card border border-border rounded-2xl">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
                      <h3 className="text-base md:text-lg font-semibold text-foreground break-words">
                        {listing.name}
                      </h3>
                      <div className="flex items-center gap-3 sm:text-right">
                        <div className="text-lg md:text-xl font-semibold text-foreground">
                          {listing.price}
                        </div>
                        <Badge 
                          variant={listing.status === 'Active' ? 'success' : 'warning'}
                        >
                          {listing.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-3 md:h-4 w-3 md:w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-xs md:text-sm text-muted-foreground">
                          {listing.views} views • {listing.leads} leads
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2">
                      {listing.platforms.map((platform, index) => (
                        <Badge key={index} variant="outline" className="bg-muted/50 text-xs">
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