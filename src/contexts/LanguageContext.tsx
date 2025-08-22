
import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en-US' | 'de' | 'fr' | 'es' | 'zh' | 'pt-BR'

interface LanguageContextType {
  language: Language
  currentLanguage: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, any>) => string
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

// Expanded translations object
const translations = {
  'en-US': {
    dashboard: 'Dashboard',
    customers: 'Customers',
    projects: 'Projects',
    invoices: 'Invoices',
    payments: 'Payments',
    settings: 'Settings',
    'dashboardHeader.title': 'Dashboard',
    'dashboardHeader.welcome': 'Overview of your business performance',
    'userGreeting.welcome': 'Welcome',
    'userGreeting.signIn': 'Sign In',
    'userGreeting.hello': 'Hello, {{name}}!',
    'userGreeting.profile': 'Profile',
    'userGreeting.signOut': 'Sign Out',
    'userGreeting.signingOut': 'Signing Out...',
    'notes.noNotesYet': 'No notes yet',
    'notes.noNotesFound': 'No notes found',
    'notes.noNotesYetMessage': 'Create your first note to get started with organizing your thoughts and ideas.',
    'notes.noNotesFoundMessage': 'Try adjusting your search or filter criteria.',
    'notes.createFirstTip': 'Click the + button to create your first note'
  },
  'pt-BR': {
    dashboard: 'Painel',
    customers: 'Clientes',
    projects: 'Projetos',
    invoices: 'Faturas',
    payments: 'Pagamentos',
    settings: 'Configurações',
    'dashboardHeader.title': 'Painel',
    'dashboardHeader.welcome': 'Visão geral do desempenho do seu negócio',
    'userGreeting.welcome': 'Bem-vindo',
    'userGreeting.signIn': 'Entrar',
    'userGreeting.hello': 'Olá, {{name}}!',
    'userGreeting.profile': 'Perfil',
    'userGreeting.signOut': 'Sair',
    'userGreeting.signingOut': 'Saindo...',
    'notes.noNotesYet': 'Nenhuma nota ainda',
    'notes.noNotesFound': 'Nenhuma nota encontrada',
    'notes.noNotesYetMessage': 'Crie sua primeira nota para começar a organizar seus pensamentos e ideias.',
    'notes.noNotesFoundMessage': 'Tente ajustar seus critérios de busca ou filtro.',
    'notes.createFirstTip': 'Clique no botão + para criar sua primeira nota'
  },
  'es': {
    dashboard: 'Panel',
    customers: 'Clientes',
    projects: 'Proyectos',
    invoices: 'Facturas',
    payments: 'Pagos',
    settings: 'Configuración',
    'dashboardHeader.title': 'Panel',
    'dashboardHeader.welcome': 'Resumen del rendimiento de su negocio',
    'userGreeting.welcome': 'Bienvenido',
    'userGreeting.signIn': 'Iniciar Sesión',
    'userGreeting.hello': '¡Hola, {{name}}!',
    'userGreeting.profile': 'Perfil',
    'userGreeting.signOut': 'Cerrar Sesión',
    'userGreeting.signingOut': 'Cerrando Sesión...',
    'notes.noNotesYet': 'Aún no hay notas',
    'notes.noNotesFound': 'No se encontraron notas',
    'notes.noNotesYetMessage': 'Crea tu primera nota para comenzar a organizar tus pensamientos e ideas.',
    'notes.noNotesFoundMessage': 'Intenta ajustar tus criterios de búsqueda o filtro.',
    'notes.createFirstTip': 'Haz clic en el botón + para crear tu primera nota'
  },
  'de': {
    dashboard: 'Dashboard',
    customers: 'Kunden',
    projects: 'Projekte',
    invoices: 'Rechnungen',
    payments: 'Zahlungen',
    settings: 'Einstellungen',
    'dashboardHeader.title': 'Dashboard',
    'dashboardHeader.welcome': 'Überblick über Ihre Geschäftsleistung',
    'userGreeting.welcome': 'Willkommen',
    'userGreeting.signIn': 'Anmelden',
    'userGreeting.hello': 'Hallo, {{name}}!',
    'userGreeting.profile': 'Profil',
    'userGreeting.signOut': 'Abmelden',
    'userGreeting.signingOut': 'Abmelden...',
    'notes.noNotesYet': 'Noch keine Notizen',
    'notes.noNotesFound': 'Keine Notizen gefunden',
    'notes.noNotesYetMessage': 'Erstellen Sie Ihre erste Notiz, um mit der Organisation Ihrer Gedanken und Ideen zu beginnen.',
    'notes.noNotesFoundMessage': 'Versuchen Sie, Ihre Such- oder Filterkriterien anzupassen.',
    'notes.createFirstTip': 'Klicken Sie auf die + Schaltfläche, um Ihre erste Notiz zu erstellen'
  },
  'fr': {
    dashboard: 'Tableau de bord',
    customers: 'Clients',
    projects: 'Projets',
    invoices: 'Factures',
    payments: 'Paiements',
    settings: 'Paramètres',
    'dashboardHeader.title': 'Tableau de bord',
    'dashboardHeader.welcome': 'Aperçu des performances de votre entreprise',
    'userGreeting.welcome': 'Bienvenue',
    'userGreeting.signIn': 'Se connecter',
    'userGreeting.hello': 'Bonjour, {{name}} !',
    'userGreeting.profile': 'Profil',
    'userGreeting.signOut': 'Se déconnecter',
    'userGreeting.signingOut': 'Déconnexion...',
    'notes.noNotesYet': 'Aucune note pour le moment',
    'notes.noNotesFound': 'Aucune note trouvée',
    'notes.noNotesYetMessage': 'Créez votre première note pour commencer à organiser vos pensées et idées.',
    'notes.noNotesFoundMessage': 'Essayez d\'ajuster vos critères de recherche ou de filtre.',
    'notes.createFirstTip': 'Cliquez sur le bouton + pour créer votre première note'
  },
  'zh': {
    dashboard: '仪表板',
    customers: '客户',
    projects: '项目',
    invoices: '发票',
    payments: '付款',
    settings: '设置',
    'dashboardHeader.title': '仪表板',
    'dashboardHeader.welcome': '您的业务绩效概览',
    'userGreeting.welcome': '欢迎',
    'userGreeting.signIn': '登录',
    'userGreeting.hello': '你好，{{name}}！',
    'userGreeting.profile': '个人资料',
    'userGreeting.signOut': '登出',
    'userGreeting.signingOut': '正在登出...',
    'notes.noNotesYet': '还没有笔记',
    'notes.noNotesFound': '未找到笔记',
    'notes.noNotesYetMessage': '创建您的第一个笔记，开始整理您的想法和创意。',
    'notes.noNotesFoundMessage': '尝试调整您的搜索或筛选条件。',
    'notes.createFirstTip': '点击 + 按钮创建您的第一个笔记'
  }
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en-US')

  const t = (key: string, params?: Record<string, any>): string => {
    let translation = translations[language][key as keyof typeof translations['en-US']] || key
    
    // Handle parameter substitution
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{{${param}}}`, params[param])
      })
    }
    
    return translation
  }

  const value = {
    language,
    currentLanguage: language, // Provide both for compatibility
    setLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
