import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

interface LanguageContextProps {
  currentLanguage: string
  setLanguage: (lang: string) => void
  t: (key: string, options?: any) => string
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
)

interface LanguageProviderProps {
  children: ReactNode
}

const translations = {
  "en-US": {
    sidebar: {
      dashboard: "Dashboard",
      aiVoice: "AI Voice",
      createInvoice: "Create Invoice",
      customers: "Customers",
      analytics: "Analytics",
      features: "Feature Requests"
    },
    language: {
      title: "Language",
      selectPlaceholder: "Select language"
    },
    features: {
      title: "Feature Requests",
      subtitle: "Help us build the future of FeatherBiz!",
      suggest: "Suggest a Feature",
      vote: "Vote",
      pending: "Pending",
      inProgress: "In Progress",
      completed: "Completed"
    }
  },
  de: {
    sidebar: {
      dashboard: "Dashboard",
      aiVoice: "KI-Stimme",
      createInvoice: "Rechnung erstellen",
      customers: "Kunden",
      analytics: "Analysen",
      features: "Feature-Anfragen"
    },
    language: {
      title: "Sprache",
      selectPlaceholder: "Sprache auswählen"
    },
    features: {
      title: "Feature-Anfragen",
      subtitle: "Helfen Sie uns, die Zukunft von FeatherBiz zu gestalten!",
      suggest: "Feature vorschlagen",
      vote: "Abstimmen",
      pending: "Ausstehend",
      inProgress: "In Bearbeitung",
      completed: "Abgeschlossen"
    }
  },
  fr: {
    sidebar: {
      dashboard: "Tableau de bord",
      aiVoice: "Voix IA",
      createInvoice: "Créer une facture",
      customers: "Clients",
      analytics: "Analyses",
      features: "Demandes de fonctionnalités"
    },
    language: {
      title: "Langue",
      selectPlaceholder: "Sélectionner la langue"
    },
    features: {
      title: "Demandes de fonctionnalités",
      subtitle: "Aidez-nous à construire l'avenir de FeatherBiz!",
      suggest: "Suggérer une fonctionnalité",
      vote: "Voter",
      pending: "En attente",
      inProgress: "En cours",
      completed: "Terminé"
    }
  },
  es: {
    sidebar: {
      dashboard: "Panel",
      aiVoice: "Voz IA",
      createInvoice: "Crear factura",
      customers: "Clientes",
      analytics: "Análisis",
      features: "Solicitudes de características"
    },
    language: {
      title: "Idioma",
      selectPlaceholder: "Seleccionar idioma"
    },
    features: {
      title: "Solicitudes de características",
      subtitle: "¡Ayúdanos a construir el futuro de FeatherBiz!",
      suggest: "Sugerir una característica",
      vote: "Votar",
      pending: "Pendiente",
      inProgress: "En progreso",
      completed: "Completado"
    }
  },
  zh: {
    sidebar: {
      dashboard: "仪表板",
      aiVoice: "AI语音",
      createInvoice: "创建发票",
      customers: "客户",
      analytics: "分析",
      features: "功能请求"
    },
    language: {
      title: "语言",
      selectPlaceholder: "选择语言"
    },
    features: {
      title: "功能请求",
      subtitle: "帮助我们构建FeatherBiz的未来！",
      suggest: "建议功能",
      vote: "投票",
      pending: "待处理",
      inProgress: "进行中",
      completed: "已完成"
    }
  },
  "pt-BR": {
    sidebar: {
      dashboard: "Painel",
      aiVoice: "Voz IA",
      createInvoice: "Criar fatura",
      customers: "Clientes",
      analytics: "Análises",
      features: "Solicitações de recursos"
    },
    language: {
      title: "Idioma",
      selectPlaceholder: "Selecionar idioma"
    },
    features: {
      title: "Solicitações de recursos",
      subtitle: "Ajude-nos a construir o futuro do FeatherBiz!",
      suggest: "Sugerir um recurso",
      vote: "Votar",
      pending: "Pendente",
      inProgress: "Em andamento",
      completed: "Concluído"
    }
  }
}

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      "en-US": { translation: translations["en-US"] },
      de: { translation: translations["de"] },
      fr: { translation: translations["fr"] },
      es: { translation: translations["es"] },
      zh: { translation: translations["zh"] },
      "pt-BR": { translation: translations["pt-BR"] },
    },
    fallbackLng: "en-US",
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18next.language)

  useEffect(() => {
    i18next.on("languageChanged", (lng) => {
      setCurrentLanguage(lng)
    })

    return () => {
      i18next.off("languageChanged")
    }
  }, [])

  const setLanguage = (lang: string) => {
    i18next.changeLanguage(lang)
  }

  const t = (key: string, options?: any): string => {
    return i18next.t(key, options)
  }

  const value: LanguageContextProps = {
    currentLanguage,
    setLanguage,
    t,
  }

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
