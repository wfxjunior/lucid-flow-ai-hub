
import React, { createContext, useContext, useState } from 'react'

interface LanguageContextType {
  language: string
  currentLanguage: string // Add this to match component expectations
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<string, Record<string, string>> = {
  en: {
    'dashboardHeader.title': 'Dashboard',
    'dashboardHeader.welcome': 'Overview of your business performance'
  },
  'en-US': {
    'dashboardHeader.title': 'Dashboard',
    'dashboardHeader.welcome': 'Overview of your business performance'
  },
  pt: {
    'dashboardHeader.title': 'Painel',
    'dashboardHeader.welcome': 'Visão geral do desempenho do seu negócio'
  },
  'pt-BR': {
    'dashboardHeader.title': 'Painel',
    'dashboardHeader.welcome': 'Visão geral do desempenho do seu negócio'
  },
  de: {
    'dashboardHeader.title': 'Dashboard',
    'dashboardHeader.welcome': 'Überblick über Ihre Geschäftsleistung'
  },
  fr: {
    'dashboardHeader.title': 'Tableau de bord',
    'dashboardHeader.welcome': 'Aperçu de la performance de votre entreprise'
  },
  es: {
    'dashboardHeader.title': 'Panel de control',
    'dashboardHeader.welcome': 'Resumen del rendimiento de su negocio'
  },
  zh: {
    'dashboardHeader.title': '仪表板',
    'dashboardHeader.welcome': '您的业务绩效概览'
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('en-US')

  const t = (key: string) => {
    return translations[language]?.[key] || translations['en']?.[key] || key
  }

  return (
    <LanguageContext.Provider value={{ 
      language, 
      currentLanguage: language, // Provide both for compatibility
      setLanguage, 
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
