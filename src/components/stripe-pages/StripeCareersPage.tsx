
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { Users, MapPin, Clock, Briefcase } from "lucide-react"

export function StripeCareersPage() {
  const openPositions = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build and maintain scalable business management solutions"
    },
    {
      title: "Product Manager",
      department: "Product", 
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Drive product strategy and roadmap for small business tools"
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time", 
      description: "Design intuitive interfaces for business management workflows"
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "New York, NY",
      type: "Full-time",
      description: "Help customers achieve success with our platform"
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Manage infrastructure and deployment pipelines"
    }
  ]

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader searchPlaceholder="Search positions..." />
        
        <StripePageLayout
          title="Careers"
          description="Join our mission to simplify business management for everyone"
        >
          <div className="space-y-8">
            {/* Company Info */}
            <div className="stripe-card">
              <div className="stripe-card-header">
                <h3 className="stripe-card-title">About FeatherBiz</h3>
                <p className="stripe-card-description">
                  We're building the future of business management software, empowering small businesses 
                  to thrive with intuitive tools and seamless workflows.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h4 className="font-medium mb-1">50+ Employees</h4>
                  <p className="text-sm text-muted-foreground">Growing team</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h4 className="font-medium mb-1">Remote First</h4>
                  <p className="text-sm text-muted-foreground">Work from anywhere</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h4 className="font-medium mb-1">Mission Driven</h4>
                  <p className="text-sm text-muted-foreground">Impact focused</p>
                </div>
              </div>
            </div>

            {/* Open Positions */}
            <div className="stripe-card">
              <div className="stripe-card-header">
                <h3 className="stripe-card-title">Open Positions</h3>
                <p className="stripe-card-description">{openPositions.length} open positions</p>
              </div>
              
              <div className="space-y-4">
                {openPositions.map((position, index) => (
                  <div key={index} className="border rounded-lg p-6 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg mb-1">{position.title}</h4>
                        <p className="text-muted-foreground">{position.description}</p>
                      </div>
                      <button className="stripe-button-primary">Apply</button>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {position.department}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {position.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="stripe-card">
              <div className="stripe-card-header">
                <h3 className="stripe-card-title">Benefits & Perks</h3>
                <p className="stripe-card-description">We believe in taking care of our team</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Competitive salary and equity",
                  "Health, dental, and vision insurance",
                  "Flexible PTO and work-life balance",
                  "Remote work options",
                  "Professional development budget",
                  "Modern equipment and tools"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
