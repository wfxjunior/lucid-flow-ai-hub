
import { AppIcon } from "@/components/ui/AppIcon"

const capabilities = [
  { id: "ai-voice", label: "AI Voice", icon: "Mic", color: "text-blue-600" },
  { id: "estimates", label: "Estimates", icon: "FileText", color: "text-blue-600" },
  { id: "smartschedule", label: "SmartSchedule", icon: "Calendar", color: "text-blue-600" },
  { id: "easycalc", label: "EasyCalc", icon: "Calculator", color: "text-blue-600" },
  { id: "e-sign", label: "E-sign", icon: "PenTool", color: "text-blue-600" },
  { id: "reports", label: "Reports", icon: "BarChart3", color: "text-blue-600" },
  { id: "invoices", label: "Invoices", icon: "Receipt", color: "text-blue-600" },
  { id: "receipts", label: "Receipts", icon: "FileCheck", color: "text-blue-600" },
  { id: "bids", label: "Bids", icon: "Gavel", color: "text-blue-600" }
]

interface CapabilitiesPillsProps {
  onCapabilityClick?: (capabilityId: string) => void
}

export function CapabilitiesPills({ onCapabilityClick }: CapabilitiesPillsProps) {
  const handleClick = (capabilityId: string) => {
    if (onCapabilityClick) {
      onCapabilityClick(capabilityId)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-3 gap-4 place-items-center">
        {capabilities.map((capability) => (
          <button
            key={capability.id}
            onClick={() => handleClick(capability.id)}
            className="group flex items-center gap-3 px-4 py-3 bg-white/50 backdrop-blur-sm border border-border rounded-xl hover:bg-white/80 hover:shadow-md hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:scale-105 w-full max-w-[200px] min-h-[60px] justify-center"
            aria-label={`Capability: ${capability.label}`}
          >
            <AppIcon 
              name={capability.icon as keyof typeof import('lucide-react')} 
              size="md"
              className={capability.color}
              aria-hidden={true}
            />
            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
              {capability.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
