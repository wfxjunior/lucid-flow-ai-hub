
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
    group: "Core",
    items: [
      {
        id: "contact_sync",
        label: "Real-time contact syncing",
        desc: "Sync contacts and company records in real time across devices.",
        free: "✓",
        pro: "✓",
        plus: "✓",
        ent: "✓"
      },
      {
        id: "smart_schedule",
        label: "SmartSchedule",
        desc: "Automated scheduling with conflict detection and buffers.",
        free: "Basic (1 calendar)",
        pro: "Team (up to 5)",
        plus: "Team (unlimited)",
        ent: "Org-wide (admin controls)"
      },
      {
        id: "easycalc",
        label: "EasyCalc",
        desc: "Fast estimating with reusable templates and cost libraries.",
        free: "Quick estimates",
        pro: "Templates",
        plus: "Templates + libraries",
        ent: "Advanced rules"
      },
      {
        id: "invoices",
        label: "Invoices",
        desc: "Create, send, and track invoices with reminders.",
        free: "Limited / mo",
        pro: "Unlimited",
        plus: "Unlimited",
        ent: "Unlimited + custom fields"
      },
      {
        id: "esign",
        label: "E-sign",
        desc: "Legally binding signatures with audit trail.",
        free: "Limited / mo",
        pro: "Up to 50 / mo",
        plus: "Unlimited",
        ent: "Unlimited + SSO"
      },
    ]
  },
  {
    group: "Automation & Intelligence",
    items: [
      {
        id: "ai_voice",
        label: "AI Voice",
        desc: "Transcribe calls and auto-extract action items.",
        free: "—",
        pro: "Quotes only",
        plus: "Quotes + follow-ups",
        ent: "Full + custom models"
      },
      {
        id: "workflows",
        label: "Custom workflows",
        desc: "Trigger sequences, approvals, and multi-step automations.",
        free: "—",
        pro: "Basic",
        plus: "Advanced",
        ent: "Advanced + SLAs"
      }
    ]
  },
  {
    group: "Collaboration",
    items: [
      {
        id: "shared_pipelines",
        label: "Shared pipelines",
        desc: "Kanban pipelines shared across teams.",
        free: "—",
        pro: "—",
        plus: "✓",
        ent: "✓"
      },
      {
        id: "reports",
        label: "Reports",
        desc: "Dashboards and exports for revenue and ops metrics.",
        free: "Basic",
        pro: "Basic",
        plus: "Advanced",
        ent: "Advanced + audit"
      }
    ]
  },
  {
    group: "Security & Admin",
    items: [
      {
        id: "sso_saml",
        label: "SSO / SAML",
        desc: "Enterprise authentication and provisioning.",
        free: "—",
        pro: "—",
        plus: "—",
        ent: "✓ + SCIM"
      },
      {
        id: "audit_logs",
        label: "Audit logs",
        desc: "Track changes and access across the organization.",
        free: "—",
        pro: "—",
        plus: "—",
        ent: "✓"
      }
    ]
  },
  {
    group: "Support",
    items: [
      {
        id: "support",
        label: "Support",
        desc: "Business-hours email support; dedicated options on Enterprise.",
        free: "Community",
        pro: "Standard",
        plus: "Priority",
        ent: "Dedicated CSM"
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
  const [openGroups, setOpenGroups] = useState<string[]>(['Core']);

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
            <p>[1] "Limited / mo" means workspace-defined limits apply.</p>
            <p>[2] "Team (up to 5)" refers to 5 connected calendars maximum.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
