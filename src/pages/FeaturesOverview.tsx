
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/LanguageContext"
import { Card, CardContent } from "@/components/ui/card"

// All features available on the platform
const allFeatures = [
  { name: "Dashboard", category: "Main", description: "Central hub for business overview" },
  { name: "AI Voice", category: "Main", description: "Voice assistant for automation" },
  { name: "Create Invoice", category: "Main", description: "Generate professional invoices" },
  { name: "Estimates", category: "Main", description: "Create project estimates" },
  { name: "Payments", category: "Main", description: "Track and manage payments" },
  { name: "E-Signatures", category: "Main", description: "Digital signature solution" },

  { name: "Customer Management", category: "Core Business", description: "Manage client relationships" },
  { name: "Projects", category: "Core Business", description: "Project management tools" },
  { name: "Project Timeline", category: "Core Business", description: "Timeline view of projects" },
  { name: "Pipeline", category: "Core Business", description: "Sales pipeline management" },
  { name: "Smart Schedule", category: "Core Business", description: "Intelligent scheduling" },

  { name: "FeatherBudget", category: "Financial", description: "Budget management tool" },
  { name: "FeatherTax", category: "Financial", description: "Tax calculation and filing" },
  { name: "EasyCalc", category: "Financial", description: "Financial calculator" },
  { name: "Accounting", category: "Financial", description: "Complete accounting suite" },
  { name: "Quotes", category: "Financial", description: "Generate price quotes" },

  { name: "Car Rental", category: "Operations", description: "Vehicle rental management" },
  { name: "Work Orders", category: "Operations", description: "Service work orders" },
  { name: "MatTrack", category: "Operations", description: "Material tracking system" },
  { name: "Crew Control", category: "Operations", description: "Team management" },
  { name: "EarnSync", category: "Operations", description: "Earnings synchronization" },
  { name: "AfterCare", category: "Operations", description: "Post-service care" },

  { name: "FeatherForms", category: "Documents", description: "Custom form builder" },
  { name: "Sales Orders", category: "Documents", description: "Sales order management" },
  { name: "Business Proposals", category: "Documents", description: "Professional proposals" },
  { name: "Bids", category: "Documents", description: "Bidding system" },
  { name: "Contracts", category: "Documents", description: "Contract management" },

  { name: "Meetings", category: "Productivity", description: "Meeting scheduler" },
  { name: "Todo List", category: "Productivity", description: "Task management" },
  { name: "Notes", category: "Productivity", description: "Note-taking system" },

  { name: "Messages", category: "Communication", description: "Client messaging" },
  { name: "Email Settings", category: "Communication", description: "Email configuration" },

  { name: "Analytics", category: "Analytics", description: "Business analytics dashboard" },
  { name: "Admin Panel", category: "Analytics", description: "Administrative controls" },

  { name: "Careers", category: "General", description: "Career opportunities" },
  { name: "Appointments", category: "General", description: "Appointment scheduling" },
  { name: "Referrals", category: "General", description: "Referral program" },
  { name: "Features", category: "General", description: "Feature request system" },
  { name: "FAQ & Help", category: "General", description: "Help center" },
  { name: "Feedback", category: "General", description: "Feedback collection" },
  { name: "Pricing", category: "General", description: "Pricing plans" },
  { name: "Settings", category: "General", description: "Platform settings" },
];

export default function FeaturesOverview() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-4">
          Features Overview
        </h1>
        <p className="text-lg text-muted-foreground mb-2">
          Explore all available features in one place.
        </p>
        <p className="text-base text-muted-foreground">
          Centralize, automate, and grow your business with our complete platform toolkit.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {allFeatures.map((f) => (
          <Card key={f.name} className="bg-card/90 border hover:shadow-lg transition-shadow p-0">
            <CardContent className="px-7 pt-8 pb-6 flex flex-col items-center">
              <div className="rounded-xl bg-primary/10 p-4 mb-5">
                <span className="font-bold text-lg text-primary">{f.name[0]}</span>
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">
                {f.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {f.description}
              </p>
              <span className="mt-1 text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{f.category}</span>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="max-w-2xl mx-auto flex flex-col items-center mt-10 gap-4">
        <Link to="/" className="inline-block px-6 py-2 rounded-lg border bg-muted/80 hover:bg-primary/10 text-foreground font-medium transition mt-2">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
