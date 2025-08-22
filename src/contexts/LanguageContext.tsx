
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
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome back",
      totalCustomers: "Total Customers",
      activeProjects: "Active Projects", 
      monthlyRevenue: "Monthly Revenue",
      conversionRate: "Conversion Rate",
      fromLastMonth: "from last month"
    },
    sidebar: {
      mainFeatures: {
        dashboard: "Dashboard",
        aiVoice: "AI Voice",
        invoices: "Invoices",
        estimates: "Estimates",
        payments: "Payments",
        esignatures: "E-Signatures"
      },
      coreBusiness: {
        customers: "Customers",
        projects: "Projects",
        pipeline: "Pipeline",
        smartSchedule: "Smart Schedule"
      },
      financialTools: {
        featherBudget: "FeatherBudget",
        featherTax: "FeatherTax",
        easyCalc: "EasyCalc",
        accounting: "Accounting",
        quotes: "Quotes"
      },
      operations: {
        carRental: "Car Rental",
        workOrders: "Work Orders",
        matTrack: "MatTrack",
        crewControl: "Crew Control",
        earns: "EarnSync",
        aftercare: "AfterCare"
      },
      documents: {
        featherForms: "FeatherForms",
        salesOrders: "Sales Orders",
        businessProposals: "Business Proposals",
        bids: "Bids",
        contracts: "Contracts"
      },
      productivity: {
        meetings: "Meetings",
        todoList: "Todo List",
        notes: "Notes",
        appointments: "Appointments"
      },
      communication: {
        messages: "Messages",
        emailSettings: "Email Settings"
      },
      analytics: {
        analytics: "Analytics",
        adminPanel: "Admin Panel"
      },
      general: {
        careers: "Careers",
        referrals: "Referrals",
        features: "Features",
        faqHelp: "FAQ & Help",
        feedback: "Feedback",
        pricing: "Pricing",
        settings: "Settings"
      },
      allFeatures: "View All Features"
    },
    sidebarSections: {
      mainFeatures: "Main Features",
      coreBusiness: "Core Business",
      financialTools: "Financial Tools",
      operations: "Operations",
      documentsAndForms: "Documents & Forms",
      productivity: "Productivity",
      communication: "Communication",
      analytics: "Analytics",
      generalSupport: "General & Support"
    },
    userGreeting: {
      welcome: "Welcome to FeatherBiz",
      signIn: "Sign in",
      profile: "Profile",
      signOut: "Sign out",
      signingOut: "Signing out...",
      hello: "Hello, {{name}}!"
    },
    dashboardHeader: {
      title: "Business Dashboard",
      welcome: "Welcome back! Here's what's happening with your business today.",
      updating: "Updating...",
      refresh: "Refresh",
      aiVoiceAssistant: "AI Voice Assistant",
      viewAnalytics: "View Analytics",
      invoices: "Invoices"
    },
    notes: {
      title: "Notes",
      noteCount: {
        single: "note",
        plural: "notes"
      },
      loading: "Loading notes...",
      authRequired: "Authentication Required",
      authRequiredMessage: "Please log in to access your notes.",
      noNotesYet: "No notes yet",
      noNotesFound: "No notes found",
      noNotesYetMessage: "Start creating your first note and organize your ideas",
      noNotesFoundMessage: "Try adjusting your search or filters to find your notes",
      createFirstTip: "Tip: Use the + button to create a new note",
      searchPlaceholder: "Search notes...",
      allClients: "All clients",
      allProjects: "All projects",
      newest: "Newest",
      oldest: "Oldest",
      newNote: "New Note",
      editNote: "Edit Note",
      titlePlaceholder: "Title",
      content: "Content",
      contentPlaceholder: "Start writing...",
      client: "Client",
      selectClient: "Select client",
      project: "Project",
      selectProject: "Select project",
      none: "None",
      tags: "Tags",
      tagsPlaceholder: "Add tags separated by comma",
      cancel: "Cancel",
      saving: "Saving...",
      createNote: "Create Note",
      saveChanges: "Save Changes",
      success: "Success",
      error: "Error",
      noteCreated: "Note created successfully",
      noteUpdated: "Note updated successfully",
      saveError: "Failed to save note",
      noAdditionalContent: "No additional content"
    },
    featuresOverview: {
      title: "Features Overview",
      subtitle: "Everything included in your FeatherBiz experience",
      intro: "Get to know each functionality of our platform. With clear explanations, you'll quickly understand how FeatherBiz can help you manage and grow your business.",
      link: "Features Overview",
      backToHome: "← Back to Home",
    },
    features: {
      aiInvoice: {
        title: "AI Invoice",
        description: "Generate professional invoices automatically with AI-powered smart templates and automated calculations.",
      },
      crewControl: {
        title: "Crew Control",
        description: "Manage your team effectively with advanced scheduling, payroll, and performance analytics.",
      },
      matTrack: {
        title: "MatTrack",
        description: "Track your materials and inventory in real-time with smart management and instant alerts.",
      },
      carRental: {
        title: "Car Rental",
        description: "Booking, tracking, and scheduling for all your car rental needs in one place.",
      },
      smartSchedule: {
        title: "Smart Schedule",
        description: "AI-powered scheduling to maximize productivity for teams and individuals.",
      },
      meetings: {
        title: "Meetings",
        description: "Organize, schedule, and run productive meetings with builtin video calls and notes.",
      },
      appointments: {
        title: "Appointments",
        description: "Streamlined appointment booking, calendar sync, and automatic reminders.",
      },
      estimates: {
        title: "Estimates",
        description: "Create fast and accurate estimates for your projects with AI help.",
      },
      more: {
        title: "And More...",
        description: "Dozens of additional features designed to streamline your business workflow.",
      }
    },
    blog: {
      title: "FeatherBiz Blog",
      subtitle: "Business strategies & tips for small businesses",
      searchPlaceholder: "Search articles",
      newest: "Newest",
      mostLiked: "Most liked",
      all: "All",
      loadMore: "Load more",
      noPostsFound: "No posts found",
      noPostsYet: "No posts published yet",
      noPostsFoundMessage: "Try adjusting your search filters.",
      createFirstPost: "Create first post",
      manageblog: "Manage Blog"
    }
  }
}

// Initialize i18next - Force English only
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      "en-US": { translation: translations["en-US"] },
    },
    fallbackLng: "en-US",
    lng: "en-US", // Force English
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
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return "en-US" // Always return English
  })

  useEffect(() => {
    // Force English language on mount and clear any stored languages
    localStorage.setItem('i18nextLng', 'en-US')
    i18next.changeLanguage("en-US")
    
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage("en-US") // Always set to English
    }

    i18next.on("languageChanged", handleLanguageChange)

    return () => {
      i18next.off("languageChanged", handleLanguageChange)
    }
  }, [])

  const setLanguage = (lang: string) => {
    // Always force English, ignore language changes and clear localStorage
    localStorage.setItem('i18nextLng', 'en-US')
    i18next.changeLanguage("en-US")
  }

  const t = (key: string, options?: any): string => {
    const result = i18next.t(key, options)
    return typeof result === 'string' ? result : key
  }

  const value: LanguageContextProps = {
    currentLanguage,
    setLanguage,
    t,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
