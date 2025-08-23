
import React, { createContext, useContext, useState } from 'react'

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<string, Record<string, string>> = {
  en: {
    'dashboardHeader.title': 'Dashboard',
    'dashboardHeader.welcome': 'Overview of your business performance'
  },
  pt: {
    'dashboardHeader.title': 'Painel',
    'dashboardHeader.welcome': 'Visão geral do desempenho do seu negócio'
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('en')

  const t = (key: string) => {
    return translations[language]?.[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
