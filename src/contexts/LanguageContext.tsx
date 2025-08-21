
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

// Basic translations - you can expand this as needed
const translations = {
  en: {
    'dashboard.monthlyRevenue': 'Monthly Revenue',
    'dashboard.activeCustomers': 'Active Customers', 
    'dashboard.pendingInvoices': 'Pending Invoices',
    'dashboard.monthlyGoals': 'Monthly Goals',
    'dashboard.recentActivities': 'Recent Activities',
    'dashboard.upcomingTasks': 'Upcoming Tasks',
    'dashboard.viewAll': 'View All',
    'dashboard.noActivities': 'No recent activities',
    'dashboard.noTasks': 'No upcoming tasks'
  }
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState('en')

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key
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
