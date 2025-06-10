
import { Shield, Check } from "lucide-react"

export function TrustIndicators() {
  const guarantees = [
    { text: "No setup fees" },
    { text: "Cancel anytime" },
    { text: "24/7 support" },
    { text: "Free migration" }
  ]

  return (
    <div className="text-center mt-12 sm:mt-16">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-lg border border-gray-200 mx-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          <span className="text-base sm:text-lg font-semibold text-gray-900">30-Day Money-Back Guarantee</span>
        </div>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
          All plans include SSL security, automatic backups, 99.9% uptime guarantee, and dedicated contractor support.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
          {guarantees.map((guarantee, index) => (
            <div key={index} className="flex items-center justify-center gap-1 sm:gap-2">
              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
              <span>{guarantee.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
