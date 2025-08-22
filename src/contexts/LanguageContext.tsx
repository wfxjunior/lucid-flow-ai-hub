
import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'pt' | 'es'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

// Simple translations object - can be expanded
const translations = {
  en: {
    dashboard: 'Dashboard',
    customers: 'Customers',
    projects: 'Projects',
    invoices: 'Invoices',
    payments: 'Payments',
    settings: 'Settings'
  },
  pt: {
    dashboard: 'Painel',
    customers: 'Clientes',
    projects: 'Projetos',
    invoices: 'Faturas',
    payments: 'Pagamentos',
    settings: 'Configurações'
  },
  es: {
    dashboard: 'Panel',
    customers: 'Clientes',
    projects: 'Proyectos',
    invoices: 'Facturas',
    payments: 'Pagos',
    settings: 'Configuración'
  }
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  const value = {
    language,
    setLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
