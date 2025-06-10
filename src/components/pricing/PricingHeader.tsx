
import { Crown } from "lucide-react"

export function PricingHeader() {
  return (
    <div className="text-center mb-12 sm:mb-16">
      <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
        <Crown className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
        Choose Your Perfect Plan
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4 sm:mb-6 px-4">
        Pricing Plans for Every Contractor
      </h2>
      <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
        Start free and scale as you grow. All plans include our powerful AI tools to streamline your business operations.
      </p>
    </div>
  )
}
