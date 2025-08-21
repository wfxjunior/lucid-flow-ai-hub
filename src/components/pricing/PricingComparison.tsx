import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const FEATURE_MATRIX = [
  {
    group: "Core Business Management",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        desc: "Business overview with analytics and key metrics.",
        free: "Basic",
        pro: "Advanced",
        plus: "Advanced + custom widgets",
        ent: "Full customization"
      },
      {
        id: "customers",
        label: "Customer Management",
        desc: "Complete CRM with contact sync and customer tracking.",
        free: "Up to 100 customers",
        pro: "Up to 1,000 customers",
        plus: "Unlimited customers",
        ent: "Unlimited + custom fields"
      },
      {
        id: "projects",
        label: "Project Management",
        desc: "Track projects, milestones, and deliverables.",
        free: "Up to 3 projects",
        pro: "Up to 25 projects",
        plus: "Unlimited projects",
        ent: "Unlimited + templates"
      },
      {
        id: "pipeline",
        label: "Sales Pipeline",
        desc: "Visual sales funnel with deal tracking.",
        free: "Basic pipeline",
        pro: "Custom stages",
        plus: "Multiple pipelines",
        ent: "Advanced automation"
      },
      {
        id: "smart_schedule",
        label: "SmartSchedule",
        desc: "AI-powered scheduling with conflict detection.",
        free: "Basic (1 calendar)",
        pro: "Team (up to 5)",
        plus: "Team (unlimited)",
        ent: "Org-wide + admin controls"
      }
    ]
  },
  {
    group: "Financial Tools",
    items: [
      {
        id: "invoices",
        label: "Invoices",
        desc: "Create, send, and track invoices with reminders.",
        free: "5 per month",
        pro: "Unlimited",
        plus: "Unlimited + recurring",
        ent: "Unlimited + custom fields"
      },
      {
        id: "estimates",
        label: "Estimates & Quotes",
        desc: "Professional quotes with approval workflows.",
        free: "5 per month",
        pro: "Unlimited",
        plus: "Unlimited + templates",
        ent: "Advanced approval flows"
      },
      {
        id: "payments",
        label: "Payment Processing",
        desc: "Accept payments online with multiple gateways.",
        free: "—",
        pro: "Basic payment links",
        plus: "Multiple gateways",
        ent: "Custom payment flows"
      },
      {
        id: "easycalc",
        label: "EasyCalc",
        desc: "Smart pricing calculator with cost libraries.",
        free: "Basic calculations",
        pro: "Templates + formulas",
        plus: "Cost libraries",
        ent: "Advanced rules engine"
      },
      {
        id: "receipts",
        label: "Receipt Management",
        desc: "Digital receipt creation and tracking.",
        free: "Manual entry",
        pro: "Automated generation",
        plus: "Bulk operations",
        ent: "Custom templates"
      },
      {
        id: "accounting",
        label: "Accounting Tools",
        desc: "Basic bookkeeping and financial reporting.",
        free: "—",
        pro: "Basic reports",
        plus: "Advanced reports",
        ent: "Full accounting suite"
      },
      {
        id: "featherbudget",
        label: "FeatherBudget",
        desc: "AI-powered personal finance and budget tracking.",
        free: "—",
        pro: "Basic budgeting",
        plus: "AI insights",
        ent: "Team budgets + forecasting"
      },
      {
        id: "feathertax",
        label: "FeatherTax",
        desc: "Tax management and compliance tools.",
        free: "—",
        pro: "—",
        plus: "Basic tax tools",
        ent: "Full tax compliance"
      }
    ]
  },
  {
    group: "Operations & Workflow",
    items: [
      {
        id: "work_orders",
        label: "Work Orders",
        desc: "Service order management and tracking.",
        free: "—",
        pro: "Basic work orders",
        plus: "Advanced scheduling",
        ent: "Resource optimization"
      },
      {
        id: "appointments",
        label: "Appointment Booking",
        desc: "Online booking system with calendar integration.",
        free: "Manual scheduling",
        pro: "Online booking",
        plus: "Automated reminders",
        ent: "Advanced booking rules"
      },
      {
        id: "crew_control",
        label: "Crew Control",
        desc: "Team management and workforce scheduling.",
        free: "—",
        pro: "—",
        plus: "Basic team management",
        ent: "Advanced workforce tools"
      },
      {
        id: "mattrack",
        label: "MatTrack",
        desc: "Material and inventory tracking system.",
        free: "—",
        pro: "—",
        plus: "Basic inventory",
        ent: "Advanced inventory + forecasting"
      },
      {
        id: "car_rental",
        label: "Car Rental Management",
        desc: "Fleet management for rental businesses.",
        free: "—",
        pro: "—",
        plus: "—",
        ent: "Full fleet management"
      },
      {
        id: "automations",
        label: "Workflow Automations",
        desc: "Custom workflows and process automation.",
        free: "—",
        pro: "Basic workflows",
        plus: "Advanced automations",
        ent: "Custom automation engine"
      }
    ]
  },
  {
    group: "AI & Intelligence",
    items: [
      {
        id: "ai_voice",
        label: "AI Voice Assistant",
        desc: "Voice transcription and action item extraction.",
        free: "—",
        pro: "Quotes only",
        plus: "Quotes + follow-ups",
        ent: "Full AI + custom models"
      },
      {
        id: "analytics",
        label: "Business Analytics",
        desc: "Advanced reporting and business intelligence.",
        free: "Basic reports",
        pro: "Standard analytics",
        plus: "Advanced dashboards",
        ent: "Custom BI + forecasting"
      },
      {
        id: "growth",
        label: "Growth Insights",
        desc: "Business growth analytics and recommendations.",
        free: "—",
        pro: "Basic insights",
        plus: "Growth recommendations",
        ent: "Predictive analytics"
      }
    ]
  },
  {
    group: "Documents & Communication",
    items: [
      {
        id: "esign",
        label: "E-Signatures",
        desc: "Legally binding digital signatures with audit trail.",
        free: "3 per month",
        pro: "Up to 50 per month",
        plus: "Unlimited",
        ent: "Unlimited + SSO integration"
      },
      {
        id: "contracts",
        label: "Contract Management",
        desc: "Contract creation, tracking, and renewal management.",
        free: "—",
        pro: "Basic templates",
        plus: "Advanced templates",
        ent: "Custom contract flows"
      },
      {
        id: "featherforms",
        label: "FeatherForms",
        desc: "Custom form builder with advanced logic.",
        free: "Basic forms",
        pro: "Advanced forms",
        plus: "Conditional logic",
        ent: "Enterprise integrations"
      },
      {
        id: "proposals",
        label: "Business Proposals",
        desc: "Professional proposal creation and tracking.",
        free: "—",
        pro: "Basic proposals",
        plus: "Advanced templates",
        ent: "Custom branding + workflows"
      },
      {
        id: "email_center",
        label: "Email Center",
        desc: "Email campaigns and customer communication.",
        free: "Basic email",
        pro: "Email campaigns",
        plus: "Advanced automation",
        ent: "Full email marketing suite"
      },
      {
        id: "messages",
        label: "Internal Messaging",
        desc: "Team communication and collaboration tools.",
        free: "Basic messaging",
        pro: "Team channels",
        plus: "Advanced collaboration",
        ent: "Enterprise communication"
      }
    ]
  },
  {
    group: "Productivity Tools",
    items: [
      {
        id: "meetings",
        label: "Meeting Management",
        desc: "Schedule, track, and follow up on meetings.",
        free: "Basic scheduling",
        pro: "Meeting templates",
        plus: "Advanced integration",
        ent: "Enterprise meeting tools"
      },
      {
        id: "todo",
        label: "Todo Lists",
        desc: "Task management and productivity tracking.",
        free: "Personal tasks",
        pro: "Team tasks",
        plus: "Project integration",
        ent: "Advanced task automation"
      },
      {
        id: "notes",
        label: "Notes & Documentation",
        desc: "Centralized note-taking and knowledge management.",
        free: "Basic notes",
        pro: "Organized notebooks",
        plus: "Advanced search",
        ent: "Knowledge base + collaboration"
      },
      {
        id: "aftercare",
        label: "AfterCare",
        desc: "Customer follow-up and relationship management.",
        free: "—",
        pro: "Basic follow-ups",
        plus: "Automated sequences",
        ent: "Advanced relationship tools"
      }
    ]
  },
  {
    group: "Specialized Features",
    items: [
      {
        id: "bids",
        label: "Bidding System",
        desc: "Manage bids and tenders for projects.",
        free: "—",
        pro: "—",
        plus: "Basic bidding",
        ent: "Advanced bid management"
      },
      {
        id: "sales_orders",
        label: "Sales Orders",
        desc: "Process and track sales orders efficiently.",
        free: "—",
        pro: "Basic orders",
        plus: "Advanced processing",
        ent: "Enterprise order management"
      },
      {
        id: "tours",
        label: "Tours & Visits",
        desc: "Manage business tours and site visits.",
        free: "—",
        pro: "—",
        plus: "Basic tour management",
        ent: "Advanced scheduling + resources"
      },
      {
        id: "earnsync",
        label: "EarnSync",
        desc: "Earnings synchronization and financial tracking.",
        free: "—",
        pro: "—",
        plus: "Basic sync",
        ent: "Advanced financial sync"
      },
      {
        id: "referrals",
        label: "Referral Program",
        desc: "Manage customer referrals and rewards.",
        free: "—",
        pro: "Basic referrals",
        plus: "Advanced tracking",
        ent: "Custom referral programs"
      }
    ]
  },
  {
    group: "Security & Administration",
    items: [
      {
        id: "admin_panel",
        label: "Admin Panel",
        desc: "Advanced administrative controls and user management.",
        free: "—",
        pro: "—",
        plus: "Basic admin",
        ent: "Full admin suite"
      },
      {
        id: "sso_saml",
        label: "SSO / SAML",
        desc: "Enterprise authentication and single sign-on.",
        free: "—",
        pro: "—",
        plus: "—",
        ent: "✓ + SCIM provisioning"
      },
      {
        id: "audit_logs",
        label: "Audit Logs",
        desc: "Track all system changes and user activities.",
        free: "—",
        pro: "—",
        plus: "—",
        ent: "✓ + compliance reporting"
      },
      {
        id: "settings",
        label: "Advanced Settings",
        desc: "Comprehensive system configuration options.",
        free: "Basic settings",
        pro: "Advanced config",
        plus: "Team settings",
        ent: "Enterprise configuration"
      }
    ]
  },
  {
    group: "Support & Resources",
    items: [
      {
        id: "support",
        label: "Customer Support",
        desc: "Help desk and technical support access.",
        free: "Community support",
        pro: "Email support",
        plus: "Priority support",
        ent: "Dedicated success manager"
      },
      {
        id: "help_faq",
        label: "Help & Documentation",
        desc: "Comprehensive help center and documentation.",
        free: "✓",
        pro: "✓",
        plus: "✓ + video tutorials",
        ent: "✓ + custom training"
      },
      {
        id: "feedback",
        label: "Feedback System",
        desc: "Direct feedback and feature request system.",
        free: "✓",
        pro: "✓",
        plus: "✓ + priority feedback",
        ent: "✓ + product roadmap access"
      }
    ]
  }
];

const FeatureTooltip = ({ desc }: { desc: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        className="ml-1 text-gray-400 hover:text-gray-600 transition-colors"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        aria-describedby="tooltip"
      >
        <Info size={14} />
      </button>
      {isVisible && (
        <div
          id="tooltip"
          className="absolute left-0 top-6 z-10 w-64 p-2 text-xs text-gray-700 bg-white border border-gray-200 rounded-lg shadow-lg"
          role="tooltip"
        >
          {desc}
        </div>
      )}
    </div>
  );
};

const getCellValue = (value: string) => {
  if (value === "✓") return { text: "✓", className: "text-gray-900 font-medium" };
  if (value === "—") return { text: "—", className: "text-gray-400" };
  return { text: value, className: "text-gray-700" };
};

export function PricingComparison() {
  const [openGroups, setOpenGroups] = useState<string[]>(['Core Business Management']);

  const toggleGroup = (group: string) => {
    setOpenGroups(prev =>
      prev.includes(group)
        ? prev.filter(g => g !== group)
        : [...prev, group]
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare plans</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything included in each plan, side by side.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow className="border-b border-gray-200">
                <TableHead className="text-left py-4 px-4 font-semibold text-gray-900 w-80">
                  Features
                </TableHead>
                <TableHead className="text-center py-4 px-4 font-semibold text-gray-900">
                  Free
                </TableHead>
                <TableHead className="text-center py-4 px-4 font-semibold text-gray-900">
                  Pro
                </TableHead>
                <TableHead className="text-center py-4 px-4 font-semibold text-gray-900">
                  Plus
                </TableHead>
                <TableHead className="text-center py-4 px-4 font-semibold text-gray-900">
                  Enterprise
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {FEATURE_MATRIX.map((group) => (
                <React.Fragment key={group.group}>
                  {/* Group Header */}
                  <TableRow className="bg-gray-50 border-b border-gray-100">
                    <TableCell
                      colSpan={5}
                      className="py-3 px-4 text-sm font-medium text-gray-900 uppercase tracking-wide"
                    >
                      {group.group}
                    </TableCell>
                  </TableRow>
                  {/* Group Items */}
                  {group.items.map((item, index) => (
                    <TableRow
                      key={item.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="py-4 px-4">
                        <div className="flex items-start">
                          <div>
                            <div className="font-medium text-gray-900 mb-1 flex items-center">
                              {item.label}
                              <FeatureTooltip desc={item.desc} />
                            </div>
                            <div className="text-sm text-gray-600 line-clamp-2">
                              {item.desc}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4 text-center">
                        <span className={getCellValue(item.free).className}>
                          {getCellValue(item.free).text}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 px-4 text-center">
                        <span className={getCellValue(item.pro).className}>
                          {getCellValue(item.pro).text}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 px-4 text-center">
                        <span className={getCellValue(item.plus).className}>
                          {getCellValue(item.plus).text}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 px-4 text-center">
                        <span className={getCellValue(item.ent).className}>
                          {getCellValue(item.ent).text}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Accordion */}
        <div className="lg:hidden space-y-4">
          {FEATURE_MATRIX.map((group) => (
            <Collapsible
              key={group.group}
              open={openGroups.includes(group.group)}
              onOpenChange={() => toggleGroup(group.group)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg text-left">
                <span className="font-semibold text-gray-900 uppercase tracking-wide text-sm">
                  {group.group}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openGroups.includes(group.group) ? 'transform rotate-180' : ''
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-3 mt-3">
                {group.items.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="mb-3">
                      <h4 className="font-medium text-gray-900 mb-1">{item.label}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-xs font-medium text-gray-500 mb-1">Free</div>
                        <div className={getCellValue(item.free).className}>
                          {getCellValue(item.free).text}
                        </div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-xs font-medium text-gray-500 mb-1">Pro</div>
                        <div className={getCellValue(item.pro).className}>
                          {getCellValue(item.pro).text}
                        </div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-xs font-medium text-gray-500 mb-1">Plus</div>
                        <div className={getCellValue(item.plus).className}>
                          {getCellValue(item.plus).text}
                        </div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-xs font-medium text-gray-500 mb-1">Enterprise</div>
                        <div className={getCellValue(item.ent).className}>
                          {getCellValue(item.ent).text}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        {/* Footer Notes */}
        <div className="mt-12 text-center">
          <div className="text-sm text-gray-500 space-y-1">
            <p>[1] Feature limits apply per workspace on Free and Pro plans.</p>
            <p>[2] "Team" features support multiple users with role-based permissions.</p>
            <p>[3] Enterprise plans include dedicated support and custom integrations.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
