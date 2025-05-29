import React, { createContext, useContext, useState, useEffect } from 'react'

interface LanguageContextType {
  currentLanguage: string
  setLanguage: (language: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  'en-US': {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.ai-voice': 'AI Voice Assistant',
    'nav.create-invoice': 'Create Invoice',
    'nav.appointments': 'Appointments',
    'nav.payments': 'Payments',
    'nav.e-signatures': 'E-Signatures',
    'nav.customers': 'Customers',
    'nav.projects': 'Projects',
    'nav.quotes': 'Quotes',
    'nav.receipts': 'Receipts & Accounting',
    'nav.sales-orders': 'Sales Orders',
    'nav.service-orders': 'Service Orders',
    'nav.proposals': 'Business Proposals',
    'nav.bids': 'Bids',
    'nav.email': 'Email Center',
    'nav.messages': 'Messages',
    'nav.communication': 'Communication Hub',
    'nav.analytics': 'Analytics',
    'nav.family-savings': 'My Family Savings',
    'nav.faq': 'FAQ & Help',
    'nav.pricing': 'Pricing Plans',
    'nav.settings': 'Settings',
    
    // Quick Actions
    'quickActions.title': 'Quick Actions',
    'quickActions.description': 'Fast access to all business tools and AI features',
    'quickActions.aiVoice': 'AI Voice Command',
    'quickActions.aiVoiceDesc': 'Speak to create tasks',
    'quickActions.createInvoice': 'Create Invoice',
    'quickActions.createInvoiceDesc': 'AI-powered invoicing',
    'quickActions.sendMessage': 'Send Message',
    'quickActions.sendMessageDesc': 'SMS or WhatsApp',
    'quickActions.addClient': 'Add Client',
    'quickActions.addClientDesc': 'Register new client',
    'quickActions.scheduleMeeting': 'Schedule Meeting',
    'quickActions.scheduleMeetingDesc': 'Book appointments',
    'quickActions.createQuote': 'Create Quote',
    'quickActions.createQuoteDesc': 'Generate estimates',
    'quickActions.processPayment': 'Process Payment',
    'quickActions.processPaymentDesc': 'Handle transactions',
    'quickActions.eSignature': 'E-Signature',
    'quickActions.eSignatureDesc': 'Sign documents',
    'quickActions.emailCampaign': 'Email Campaign',
    'quickActions.emailCampaignDesc': 'Start new campaign',
    'quickActions.familySavings': 'Family Savings',
    'quickActions.familySavingsDesc': 'View savings plan',
    'quickActions.aiAssistant': 'AI Assistant',
    'quickActions.aiAssistantDesc': 'Get AI help',
    'quickActions.newProject': 'New Project',
    'quickActions.newProjectDesc': 'Create new project',
    
    // Language Selector
    'language.title': 'Language',
    'language.selectPlaceholder': 'Select language',
    
    // Common
    'common.search': 'Search',
    'common.welcome': 'Welcome to',
    'common.subtitle': 'AI-Powered Business Platform'
  },
  'es': {
    // Navigation
    'nav.dashboard': 'Panel de Control',
    'nav.ai-voice': 'Asistente de Voz IA',
    'nav.create-invoice': 'Crear Factura',
    'nav.appointments': 'Citas',
    'nav.payments': 'Pagos',
    'nav.e-signatures': 'Firmas Electrónicas',
    'nav.customers': 'Clientes',
    'nav.projects': 'Proyectos',
    'nav.quotes': 'Cotizaciones',
    'nav.receipts': 'Recibos y Contabilidad',
    'nav.sales-orders': 'Órdenes de Venta',
    'nav.service-orders': 'Órdenes de Servicio',
    'nav.proposals': 'Propuestas Comerciales',
    'nav.bids': 'Ofertas',
    'nav.email': 'Centro de Email',
    'nav.messages': 'Mensajes',
    'nav.communication': 'Centro de Comunicación',
    'nav.analytics': 'Análisis',
    'nav.family-savings': 'Ahorros Familiares',
    'nav.faq': 'FAQ y Ayuda',
    'nav.pricing': 'Planes de Precios',
    'nav.settings': 'Configuración',
    
    // Quick Actions
    'quickActions.title': 'Acciones Rápidas',
    'quickActions.description': 'Acceso rápido a todas las herramientas comerciales y funciones de IA',
    'quickActions.aiVoice': 'Comando de Voz IA',
    'quickActions.aiVoiceDesc': 'Habla para crear tareas',
    'quickActions.createInvoice': 'Crear Factura',
    'quickActions.createInvoiceDesc': 'Facturación con IA',
    'quickActions.sendMessage': 'Enviar Mensaje',
    'quickActions.sendMessageDesc': 'SMS o WhatsApp',
    'quickActions.addClient': 'Agregar Cliente',
    'quickActions.addClientDesc': 'Registrar nuevo cliente',
    'quickActions.scheduleMeeting': 'Programar Reunión',
    'quickActions.scheduleMeetingDesc': 'Reservar citas',
    'quickActions.createQuote': 'Crear Cotización',
    'quickActions.createQuoteDesc': 'Generar estimaciones',
    'quickActions.processPayment': 'Procesar Pago',
    'quickActions.processPaymentDesc': 'Manejar transacciones',
    'quickActions.eSignature': 'Firma Electrónica',
    'quickActions.eSignatureDesc': 'Firmar documentos',
    'quickActions.emailCampaign': 'Campaña de Email',
    'quickActions.emailCampaignDesc': 'Iniciar nueva campaña',
    'quickActions.familySavings': 'Ahorros Familiares',
    'quickActions.familySavingsDesc': 'Ver plan de ahorros',
    'quickActions.aiAssistant': 'Asistente IA',
    'quickActions.aiAssistantDesc': 'Obtener ayuda de IA',
    'quickActions.newProject': 'Nuevo Proyecto',
    'quickActions.newProjectDesc': 'Crear nuevo proyecto',
    
    // Language Selector
    'language.title': 'Idioma',
    'language.selectPlaceholder': 'Seleccionar idioma',
    
    // Common
    'common.search': 'Buscar',
    'common.welcome': 'Bienvenido a',
    'common.subtitle': 'AI-Powered Business Platform'
  },
  'fr': {
    // Navigation
    'nav.dashboard': 'Tableau de Bord',
    'nav.ai-voice': 'Assistant Vocal IA',
    'nav.create-invoice': 'Créer Facture',
    'nav.appointments': 'Rendez-vous',
    'nav.payments': 'Paiements',
    'nav.e-signatures': 'Signatures Électroniques',
    'nav.customers': 'Clients',
    'nav.projects': 'Projets',
    'nav.quotes': 'Devis',
    'nav.receipts': 'Reçus et Comptabilité',
    'nav.sales-orders': 'Commandes de Vente',
    'nav.service-orders': 'Commandes de Service',
    'nav.proposals': 'Propositions Commerciales',
    'nav.bids': 'Offres',
    'nav.email': 'Centre Email',
    'nav.messages': 'Messages',
    'nav.communication': 'Centre de Communication',
    'nav.analytics': 'Analyses',
    'nav.family-savings': 'Épargne Familiale',
    'nav.faq': 'FAQ et Aide',
    'nav.pricing': 'Plans Tarifaires',
    'nav.settings': 'Paramètres',
    
    // Quick Actions
    'quickActions.title': 'Actions Rapides',
    'quickActions.description': 'Accès rapide à tous les outils commerciaux et fonctionnalités IA',
    'quickActions.aiVoice': 'Commande Vocale IA',
    'quickActions.aiVoiceDesc': 'Parlez pour créer des tâches',
    'quickActions.createInvoice': 'Créer Facture',
    'quickActions.createInvoiceDesc': 'Facturation alimentée par IA',
    'quickActions.sendMessage': 'Envoyer Message',
    'quickActions.sendMessageDesc': 'SMS ou WhatsApp',
    'quickActions.addClient': 'Ajouter Client',
    'quickActions.addClientDesc': 'Enregistrer nouveau client',
    'quickActions.scheduleMeeting': 'Programmer Réunion',
    'quickActions.scheduleMeetingDesc': 'Réserver rendez-vous',
    'quickActions.createQuote': 'Créer Devis',
    'quickActions.createQuoteDesc': 'Générer estimations',
    'quickActions.processPayment': 'Traiter Paiement',
    'quickActions.processPaymentDesc': 'Gérer transactions',
    'quickActions.eSignature': 'Signature Électronique',
    'quickActions.eSignatureDesc': 'Signer documents',
    'quickActions.emailCampaign': 'Campagne Email',
    'quickActions.emailCampaignDesc': 'Démarrer nouvelle campagne',
    'quickActions.familySavings': 'Épargne Familiale',
    'quickActions.familySavingsDesc': 'Voir plan épargne',
    'quickActions.aiAssistant': 'Assistant IA',
    'quickActions.aiAssistantDesc': 'Obtenir aide IA',
    'quickActions.newProject': 'Nouveau Projet',
    'quickActions.newProjectDesc': 'Créer nouveau projet',
    
    // Language Selector
    'language.title': 'Langue',
    'language.selectPlaceholder': 'Sélectionner langue',
    
    // Common
    'common.search': 'Rechercher',
    'common.welcome': 'Bienvenue à',
    'common.subtitle': 'AI-Powered Business Platform'
  },
  'de': {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.ai-voice': 'KI-Sprachassistent',
    'nav.create-invoice': 'Rechnung Erstellen',
    'nav.appointments': 'Termine',
    'nav.payments': 'Zahlungen',
    'nav.e-signatures': 'E-Signaturen',
    'nav.customers': 'Kunden',
    'nav.projects': 'Projekte',
    'nav.quotes': 'Angebote',
    'nav.receipts': 'Belege & Buchhaltung',
    'nav.sales-orders': 'Verkaufsaufträge',
    'nav.service-orders': 'Serviceaufträge',
    'nav.proposals': 'Geschäftsvorschläge',
    'nav.bids': 'Gebote',
    'nav.email': 'E-Mail-Center',
    'nav.messages': 'Nachrichten',
    'nav.communication': 'Kommunikationszentrum',
    'nav.analytics': 'Analysen',
    'nav.family-savings': 'Familienersparnisse',
    'nav.faq': 'FAQ & Hilfe',
    'nav.pricing': 'Preispläne',
    'nav.settings': 'Einstellungen',
    
    // Quick Actions
    'quickActions.title': 'Schnellaktionen',
    'quickActions.description': 'Schneller Zugang zu allen Geschäftstools und KI-Funktionen',
    'quickActions.aiVoice': 'KI-Sprachbefehl',
    'quickActions.aiVoiceDesc': 'Sprechen Sie, um Aufgaben zu erstellen',
    'quickActions.createInvoice': 'Rechnung Erstellen',
    'quickActions.createInvoiceDesc': 'KI-gestützte Rechnungsstellung',
    'quickActions.sendMessage': 'Nachricht Senden',
    'quickActions.sendMessageDesc': 'SMS oder WhatsApp',
    'quickActions.addClient': 'Kunde Hinzufügen',
    'quickActions.addClientDesc': 'Neuen Kunden registrieren',
    'quickActions.scheduleMeeting': 'Meeting Planen',
    'quickActions.scheduleMeetingDesc': 'Termine buchen',
    'quickActions.createQuote': 'Angebot Erstellen',
    'quickActions.createQuoteDesc': 'Schätzungen generieren',
    'quickActions.processPayment': 'Zahlung Verarbeiten',
    'quickActions.processPaymentDesc': 'Transaktionen abwickeln',
    'quickActions.eSignature': 'E-Signatur',
    'quickActions.eSignatureDesc': 'Dokumente signieren',
    'quickActions.emailCampaign': 'E-Mail-Kampagne',
    'quickActions.emailCampaignDesc': 'Neue Kampagne starten',
    'quickActions.familySavings': 'Familienersparnisse',
    'quickActions.familySavingsDesc': 'Sparplan anzeigen',
    'quickActions.aiAssistant': 'KI-Assistent',
    'quickActions.aiAssistantDesc': 'KI-Hilfe erhalten',
    'quickActions.newProject': 'Neues Projekt',
    'quickActions.newProjectDesc': 'Neues Projekt erstellen',
    
    // Language Selector
    'language.title': 'Sprache',
    'language.selectPlaceholder': 'Sprache auswählen',
    
    // Common
    'common.search': 'Suchen',
    'common.welcome': 'Willkommen bei',
    'common.subtitle': 'AI-Powered Business Platform'
  },
  'zh': {
    // Navigation
    'nav.dashboard': '仪表板',
    'nav.ai-voice': 'AI语音助手',
    'nav.create-invoice': '创建发票',
    'nav.appointments': '预约',
    'nav.payments': '付款',
    'nav.e-signatures': '电子签名',
    'nav.customers': '客户',
    'nav.projects': '项目',
    'nav.quotes': '报价',
    'nav.receipts': '收据和会计',
    'nav.sales-orders': '销售订单',
    'nav.service-orders': '服务订单',
    'nav.proposals': '商业提案',
    'nav.bids': '投标',
    'nav.email': '邮件中心',
    'nav.messages': '消息',
    'nav.communication': '通信中心',
    'nav.analytics': '分析',
    'nav.family-savings': '家庭储蓄',
    'nav.faq': '常见问题和帮助',
    'nav.pricing': '价格计划',
    'nav.settings': '设置',
    
    // Quick Actions
    'quickActions.title': '快速操作',
    'quickActions.description': '快速访问所有商业工具和AI功能',
    'quickActions.aiVoice': 'AI语音命令',
    'quickActions.aiVoiceDesc': '说话创建任务',
    'quickActions.createInvoice': '创建发票',
    'quickActions.createInvoiceDesc': 'AI驱动的发票',
    'quickActions.sendMessage': '发送消息',
    'quickActions.sendMessageDesc': 'SMS或WhatsApp',
    'quickActions.addClient': '添加客户',
    'quickActions.addClientDesc': '注册新客户',
    'quickActions.scheduleMeeting': '安排会议',
    'quickActions.scheduleMeetingDesc': '预订约会',
    'quickActions.createQuote': '创建报价',
    'quickActions.createQuoteDesc': '生成估算',
    'quickActions.processPayment': '处理付款',
    'quickActions.processPaymentDesc': '处理交易',
    'quickActions.eSignature': '电子签名',
    'quickActions.eSignatureDesc': '签署文件',
    'quickActions.emailCampaign': '邮件活动',
    'quickActions.emailCampaignDesc': '开始新活动',
    'quickActions.familySavings': '家庭储蓄',
    'quickActions.familySavingsDesc': '查看储蓄计划',
    'quickActions.aiAssistant': 'AI助手',
    'quickActions.aiAssistantDesc': '获得AI帮助',
    'quickActions.newProject': '新项目',
    'quickActions.newProjectDesc': '创建新项目',
    
    // Language Selector
    'language.title': '语言',
    'language.selectPlaceholder': '选择语言',
    
    // Common
    'common.search': '搜索',
    'common.welcome': '欢迎来到',
    'common.subtitle': 'AI-Powered Business Platform'
  },
  'pt-BR': {
    // Navigation
    'nav.dashboard': 'Painel',
    'nav.ai-voice': 'Assistente de Voz IA',
    'nav.create-invoice': 'Criar Fatura',
    'nav.appointments': 'Agendamentos',
    'nav.payments': 'Pagamentos',
    'nav.e-signatures': 'Assinaturas Eletrônicas',
    'nav.customers': 'Clientes',
    'nav.projects': 'Projetos',
    'nav.quotes': 'Orçamentos',
    'nav.receipts': 'Recibos e Contabilidade',
    'nav.sales-orders': 'Pedidos de Venda',
    'nav.service-orders': 'Ordens de Serviço',
    'nav.proposals': 'Propostas Comerciais',
    'nav.bids': 'Licitações',
    'nav.email': 'Centro de Email',
    'nav.messages': 'Mensagens',
    'nav.communication': 'Centro de Comunicação',
    'nav.analytics': 'Análises',
    'nav.family-savings': 'Poupança Familiar',
    'nav.faq': 'FAQ e Ajuda',
    'nav.pricing': 'Planos de Preços',
    'nav.settings': 'Configurações',
    
    // Quick Actions
    'quickActions.title': 'Ações Rápidas',
    'quickActions.description': 'Acesso rápido a todas as ferramentas de negócios e recursos de IA',
    'quickActions.aiVoice': 'Comando de Voz IA',
    'quickActions.aiVoiceDesc': 'Fale para criar tarefas',
    'quickActions.createInvoice': 'Criar Fatura',
    'quickActions.createInvoiceDesc': 'Faturamento com IA',
    'quickActions.sendMessage': 'Enviar Mensagem',
    'quickActions.sendMessageDesc': 'SMS ou WhatsApp',
    'quickActions.addClient': 'Adicionar Cliente',
    'quickActions.addClientDesc': 'Registrar novo cliente',
    'quickActions.scheduleMeeting': 'Agendar Reunião',
    'quickActions.scheduleMeetingDesc': 'Marcar compromissos',
    'quickActions.createQuote': 'Criar Orçamento',
    'quickActions.createQuoteDesc': 'Gerar estimativas',
    'quickActions.processPayment': 'Processar Pagamento',
    'quickActions.processPaymentDesc': 'Gerenciar transações',
    'quickActions.eSignature': 'Assinatura Eletrônica',
    'quickActions.eSignatureDesc': 'Assinar documentos',
    'quickActions.emailCampaign': 'Campanha de Email',
    'quickActions.emailCampaignDesc': 'Iniciar nova campanha',
    'quickActions.familySavings': 'Poupança Familiar',
    'quickActions.familySavingsDesc': 'Ver plano de poupança',
    'quickActions.aiAssistant': 'Assistente IA',
    'quickActions.aiAssistantDesc': 'Obter ajuda da IA',
    'quickActions.newProject': 'Novo Projeto',
    'quickActions.newProjectDesc': 'Criar novo projeto',
    
    // Language Selector
    'language.title': 'Idioma',
    'language.selectPlaceholder': 'Selecionar idioma',
    
    // Common
    'common.search': 'Pesquisar',
    'common.welcome': 'Bem-vindo ao',
    'common.subtitle': 'AI-Powered Business Platform'
  }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem("selectedLanguage") || "en-US"
  })

  const setLanguage = (language: string) => {
    setCurrentLanguage(language)
    localStorage.setItem("selectedLanguage", language)
    console.log("Language changed to:", language)
  }

  const t = (key: string): string => {
    const translation = translations[currentLanguage as keyof typeof translations]
    return translation?.[key as keyof typeof translation] || key
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
