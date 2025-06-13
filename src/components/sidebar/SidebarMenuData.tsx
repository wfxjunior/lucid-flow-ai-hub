
import { useLanguage } from "@/contexts/LanguageContext"
import { MenuItem } from "./types"
import { mainFeatures } from "./mainFeaturesData"
import { businessTools } from "./businessToolsData"
import { communication } from "./communicationData"
import { analytics } from "./analyticsData"
import { integrations } from "./integrationsData"
import { systemTools } from "./systemToolsData"

export function useSidebarMenuData() {
  const { t } = useLanguage()
  
  // Apply translations to main features
  const translatedMainFeatures: MenuItem[] = mainFeatures.map(item => {
    switch (item.view) {
      case "ai-voice":
        return { ...item, title: t("sidebar.aiVoice") }
      case "invoice-creator":
        return { ...item, title: t("sidebar.createInvoice") }
      case "e-signatures":
        return { ...item, title: t("sidebar.esignatures") }
      default:
        return item
    }
  })

  return {
    mainFeatures: translatedMainFeatures,
    businessTools,
    communication,
    analytics,
    integrations,
    systemTools
  }
}

export type { MenuItem }
