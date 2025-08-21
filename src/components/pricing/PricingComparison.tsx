
export function PricingComparison() {
  const features = [
    { name: "Invoices", free: "Limited", plus: "Unlimited", pro: "Unlimited", enterprise: "Flexible" },
    { name: "E-sign", free: "Limited", plus: "Unlimited", pro: "Unlimited", enterprise: "Unlimited" },
    { name: "SmartSchedule", free: "Basic", plus: "Team", pro: "Team", enterprise: "Advanced" },
    { name: "EasyCalc", free: "Basic", plus: "Pro", pro: "Pro", enterprise: "Advanced" },
    { name: "AI Voice", free: "—", plus: "Included", pro: "Included", enterprise: "Advanced" },
    { name: "Data Enrichment", free: "—", plus: "—", pro: "Advanced", enterprise: "Advanced" },
    { name: "Workflows", free: "—", plus: "—", pro: "Included", enterprise: "Custom" },
    { name: "Reports", free: "—", plus: "Basic", pro: "Advanced", enterprise: "Custom" },
    { name: "SSO/SCIM", free: "—", plus: "—", pro: "Team roles", enterprise: "SAML/SCIM" },
    { name: "API", free: "—", plus: "—", pro: "Included", enterprise: "Full access" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare plans</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Features</th>
              <th className="text-center py-4 px-4 font-semibold text-gray-900">Free</th>
              <th className="text-center py-4 px-4 font-semibold text-gray-900">Plus</th>
              <th className="text-center py-4 px-4 font-semibold text-gray-900">Pro</th>
              <th className="text-center py-4 px-4 font-semibold text-gray-900">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-4 px-4 text-gray-900">{feature.name}</td>
                <td className="py-4 px-4 text-center text-gray-600 text-sm">{feature.free}</td>
                <td className="py-4 px-4 text-center text-gray-600 text-sm">{feature.plus}</td>
                <td className="py-4 px-4 text-center text-gray-600 text-sm">{feature.pro}</td>
                <td className="py-4 px-4 text-center text-gray-600 text-sm">{feature.enterprise}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
