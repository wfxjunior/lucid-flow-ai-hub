import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function PricingFeaturesDetails() {
  const sections = [
    {
      title: "Core Business Management",
      description:
        "Core tools to run your business day-to-day: customers, projects, quotes, invoices, and more.",
      items: [
        { name: "Dashboard", desc: "Business overview and metrics." },
        { name: "Projects Management", desc: "Project tracking and organization." },
        { name: "Customer Management", desc: "Client database and relationships." },
        { name: "Contracts", desc: "Contract creation and management." },
        { name: "Estimates", desc: "Price estimates for services." },
        { name: "Quotes", desc: "Customer quotations." },
        { name: "Invoices", desc: "Invoice generation and tracking." },
        { name: "Work Orders", desc: "Work order management." },
        { name: "Service Orders", desc: "Service request tracking." },
        { name: "Sales Orders", desc: "Sales process management." },
        { name: "Bids", desc: "Bidding system for projects." },
        { name: "Business Proposals", desc: "Professional proposal creation." },
      ],
    },
    {
      title: "Financial Tools",
      description:
        "Track money in and out with payments, receipts, accounting, taxes, and budgeting.",
      items: [
        { name: "Payments", desc: "Payment processing and tracking." },
        { name: "Receipts", desc: "Receipt management and organization." },
        { name: "Accounting", desc: "Financial record keeping." },
        { name: "FeatherTax", desc: "Tax management system." },
        { name: "FeatherBudget", desc: "Budget planning and tracking." },
        { name: "EarnSync", desc: "Earnings synchronization and tracking." },
      ],
    },
    {
      title: "Operations & Specialized Tools",
      description:
        "Operational systems for materials, teams, scheduling, appointments, and pipeline.",
      items: [
        { name: "MatTrack", desc: "Material tracking system." },
        { name: "CrewControl", desc: "Employee and crew management." },
        { name: "Car Rental", desc: "Vehicle rental management." },
        { name: "Smart Schedule", desc: "Intelligent scheduling system." },
        { name: "Appointments", desc: "Appointment booking and management." },
        { name: "Meetings", desc: "Meeting coordination and tracking." },
        { name: "Pipeline Board", desc: "Sales pipeline visualization." },
        { name: "Next Projects Calendar", desc: "Upcoming project planning." },
      ],
    },
    {
      title: "Documents & Forms",
      description:
        "Create, sign, track, and store all your documents with powerful generation tools.",
      items: [
        { name: "E-Signatures", desc: "Digital signature management." },
        { name: "Document Tracker", desc: "Document status tracking." },
        { name: "File Manager", desc: "File organization and storage." },
        { name: "PDF Generator", desc: "Document generation tools." },
        { name: "FeatherForms", desc: "Custom form builder." },
        { name: "Contract Creator", desc: "Automated contract generation." },
        { name: "Invoice Creator", desc: "Invoice generation tools." },
      ],
    },
    {
      title: "Productivity & Communication",
      description:
        "Stay organized and in sync with notes, tasks, messaging, email, and AI assistants.",
      items: [
        { name: "Notes", desc: "Note-taking and organization." },
        { name: "To-Do List", desc: "Task management." },
        { name: "Messages", desc: "Internal messaging system." },
        { name: "Email Center", desc: "Email management hub." },
        { name: "AI Voice Assistant", desc: "Voice-powered assistance." },
        { name: "FeatherBot", desc: "AI assistant chatbot." },
      ],
    },
    {
      title: "Analytics & Administration",
      description:
        "Understand performance with dashboards, revenue charts, KPIs, and exportable reports.",
      items: [
        { name: "Analytics Dashboard", desc: "Business intelligence." },
        { name: "Business Analytics", desc: "Performance metrics." },
        { name: "Revenue Charts", desc: "Financial visualization." },
        { name: "Key Metrics", desc: "Important KPI tracking." },
        { name: "Reports Export", desc: "Data export capabilities." },
        { name: "Admin Dashboard", desc: "Administrative controls." },
      ],
    },
    {
      title: "System & Configuration",
      description: "Configure, connect, and support your business at scale.",
      items: [
        { name: "Settings", desc: "System configuration." },
        { name: "Company Settings", desc: "Business profile management." },
        { name: "User Management", desc: "User access control." },
        { name: "Integrations Hub", desc: "Third-party integrations." },
        { name: "Quick Actions", desc: "Fast access tools." },
        { name: "Help Center", desc: "Support resources." },
        { name: "FAQ System", desc: "Frequently asked questions." },
      ],
    },
    {
      title: "Additional Features",
      description: "Enhancements that complete the platform experience.",
      items: [
        { name: "Referrals", desc: "Referral program management." },
        { name: "Feedback", desc: "Customer feedback collection." },
        { name: "After Care", desc: "Post-service follow-up." },
        { name: "Client Portal", desc: "Customer self-service portal." },
        { name: "Project Timeline", desc: "Visual project tracking." },
        { name: "Document Events", desc: "Document activity tracking." },
        { name: "Signature Canvas", desc: "Digital signature capture." },
        { name: "Rich Text Editor", desc: "Advanced text editing." },
        { name: "Currency Selector", desc: "Multi-currency support." },
        { name: "Theme Toggle", desc: "Dark/light mode switching." },
        { name: "Mobile Responsive", desc: "Mobile-optimized interface." },
        { name: "Real-time Updates", desc: "Live data synchronization." },
        { name: "Search Functionality", desc: "Global search capabilities." },
        { name: "Export Tools", desc: "Data export options." },
        { name: "Backup Systems", desc: "Data protection." },
        { name: "Security Features", desc: "User authentication and authorization." },
        { name: "API Integration", desc: "External system connectivity." },
        { name: "Custom Workflows", desc: "Automated business processes." },
        { name: "Reporting Suite", desc: "Comprehensive reporting tools." },
      ],
    },
  ]

  return (
    <section aria-labelledby="features-explained" className="max-w-6xl mx-auto px-4 mt-16">
      <header className="text-center mb-8">
        <h3 id="features-explained" className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          All features, explained
        </h3>
        <p className="text-muted-foreground text-lg">
          Explore everything included in FeatherBiz across categories.
        </p>
      </header>

      <div className="bg-background rounded-lg border shadow-sm overflow-hidden">
        <Accordion type="multiple" className="divide-y">
          {sections.map((section, idx) => (
            <AccordionItem key={idx} value={`section-${idx}`}>
              <AccordionTrigger className="px-4 sm:px-6 py-4 text-left">
                <div>
                  <div className="text-base sm:text-lg font-semibold text-foreground">
                    {section.title}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {section.description}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-4 sm:px-6 pb-6">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {section.items.map((item, i) => (
                      <li key={i} className="p-4 rounded-md border bg-muted/10">
                        <div className="font-medium text-foreground">{item.name}</div>
                        <div className="text-sm text-muted-foreground mt-1">{item.desc}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
