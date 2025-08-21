
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface LanguageContextType {
  language: string
  currentLanguage: string
  setLanguage: (lang: string) => void
  t: (key: string, params?: string | Record<string, string>) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

// Basic translations - you can expand this as needed
const translations = {
  'en-US': {
    'dashboard.monthlyRevenue': 'Monthly Revenue',
    'dashboard.activeCustomers': 'Active Customers', 
    'dashboard.pendingInvoices': 'Pending Invoices',
    'dashboard.monthlyGoals': 'Monthly Goals',
    'dashboard.recentActivities': 'Recent Activities',
    'dashboard.upcomingTasks': 'Upcoming Tasks',
    'dashboard.viewAll': 'View All',
    'dashboard.noActivities': 'No recent activities',
    'dashboard.noTasks': 'No upcoming tasks',
    'dashboardHeader.title': 'Dashboard',
    'dashboardHeader.welcome': 'Overview of your business performance',
    'userGreeting.welcome': 'Welcome to FeatherBiz',
    'userGreeting.signIn': 'Sign In',
    'userGreeting.profile': 'Profile',
    'userGreeting.signOut': 'Sign Out',
    'userGreeting.signingOut': 'Signing out...',
    'userGreeting.hello': 'Hello, {{name}}!',
    'sidebar.allFeatures': 'View All Features',
    'sidebar.mainFeatures.dashboard': 'Dashboard',
    'sidebar.mainFeatures.aiVoice': 'AI Voice',
    'sidebar.mainFeatures.invoices': 'Invoices',
    'sidebar.mainFeatures.estimates': 'Estimates',
    'sidebar.mainFeatures.payments': 'Payments',
    'sidebar.mainFeatures.esignatures': 'E-Signatures',
    'sidebar.coreBusiness.customers': 'Customers',
    'sidebar.coreBusiness.projects': 'Projects',
    'sidebar.coreBusiness.projectTimeline': 'Project Timeline',
    'sidebar.coreBusiness.pipeline': 'Pipeline',
    'sidebar.coreBusiness.smartSchedule': 'Smart Schedule',
    'sidebar.financialTools.featherBudget': 'FeatherBudget',
    'sidebar.financialTools.featherTax': 'FeatherTax',
    'sidebar.financialTools.easyCalc': 'EasyCalc',
    'sidebar.financialTools.receipts': 'Receipts',
    'sidebar.financialTools.accounting': 'Accounting',
    'sidebar.financialTools.quotes': 'Quotes',
    'sidebar.operations.carRental': 'Car Rental',
    'sidebar.operations.workOrders': 'Work Orders',
    'sidebar.operations.matTrack': 'MatTrack',
    'sidebar.operations.crewControl': 'Crew Control',
    'sidebar.operations.earnsync': 'EarnSync',
    'sidebar.operations.aftercare': 'AfterCare',
    'sidebar.documents.featherForms': 'FeatherForms',
    'sidebar.documents.salesOrders': 'Sales Orders',
    'sidebar.documents.businessProposals': 'Business Proposals',
    'sidebar.documents.bids': 'Bids',
    'sidebar.documents.contracts': 'Contracts',
    'sidebar.productivity.meetings': 'Meetings',
    'sidebar.productivity.todoList': 'Todo List',
    'sidebar.productivity.notes': 'Notes',
    'sidebar.productivity.appointments': 'Appointments',
    'sidebar.communication.messages': 'Messages',
    'sidebar.communication.emailCenter': 'Email Center',
    'sidebar.analytics.analytics': 'Analytics',
    'sidebar.analytics.adminPanel': 'Admin Panel',
    'sidebar.general.careers': 'Careers',
    'sidebar.general.referrals': 'Referrals',
    'sidebar.general.features': 'Features',
    'sidebar.general.faqHelp': 'FAQ & Help',
    'sidebar.general.feedback': 'Feedback',
    'sidebar.general.pricing': 'Pricing',
    'sidebar.general.settings': 'Settings',
    'sidebarSections.mainFeatures': 'Main Features',
    'sidebarSections.coreBusiness': 'Core Business',
    'sidebarSections.financialTools': 'Financial Tools',
    'sidebarSections.operations': 'Operations',
    'sidebarSections.documentsAndForms': 'Documents & Forms',
    'sidebarSections.productivity': 'Productivity',
    'sidebarSections.communication': 'Communication',
    'sidebarSections.analytics': 'Analytics',
    'sidebarSections.generalSupport': 'General & Support'
  },
  'en': {
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
  const [currentLanguage, setCurrentLanguage] = useState('en-US')

  const t = (key: string, params?: string | Record<string, string>): string => {
    const translation = translations[currentLanguage as keyof typeof translations]?.[key as keyof typeof translations['en-US']]
    let result = translation || key

    if (params) {
      if (typeof params === 'string') {
        // If params is a string, use it as fallback
        result = translation || params
      } else {
        // If params is an object, interpolate the values
        Object.keys(params).forEach(paramKey => {
          result = result.replace(new RegExp(`\\{\\{${paramKey}\\}\\}`, 'g'), params[paramKey])
        })
      }
    }

    return result
  }

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang)
  }

  return (
    <LanguageContext.Provider value={{ 
      language: currentLanguage,
      currentLanguage,
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
