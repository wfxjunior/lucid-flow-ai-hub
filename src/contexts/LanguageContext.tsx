
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
      mainFeatures: "Main Features",
      coreBusiness: "Core Business",
      financialTools: "Financial Tools",
      operations: "Operations",
      documentsAndForms: "Documents & Forms",
      productivity: "Productivity",
      communication: "Communication",
      analytics: "Analytics",
      integrations: "Integrations",
      system: "System",
      aiVoice: "AI Voice",
      createInvoice: "Create Invoice",
      esignatures: "E-Signatures",
      customers: "Customers",
      projects: "Projects",
      projectTimeline: "Project Timeline",
      salesPipeline: "Sales Pipeline",
      featherBudget: "FeatherBudget AI",
      featherTax: "FeatherTax",
      easyCalc: "EasyCalc",
      accounting: "Accounting",
      quotes: "Quotes",
      estimates: "Estimates"
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
      createFirstTip: "💡 Tip: Use the + button to create a new note",
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
    }
  },
  de: {
    dashboard: {
      title: "Dashboard",
      welcome: "Willkommen zurück",
      totalCustomers: "Gesamtkunden",
      activeProjects: "Aktive Projekte",
      monthlyRevenue: "Monatlicher Umsatz",
      conversionRate: "Konversionsrate",
      fromLastMonth: "vom letzten Monat"
    },
    sidebar: {
      mainFeatures: "Hauptfunktionen",
      coreBusiness: "Kerngeschäft",
      financialTools: "Finanztools",
      operations: "Betrieb",
      documentsAndForms: "Dokumente & Formulare",
      productivity: "Produktivität",
      communication: "Kommunikation",
      analytics: "Analytics",
      integrations: "Integrationen",
      system: "System",
      aiVoice: "KI Stimme",
      createInvoice: "Rechnung erstellen",
      esignatures: "E-Signaturen",
      customers: "Kunden",
      projects: "Projekte",
      projectTimeline: "Projektzeitplan",
      salesPipeline: "Verkaufspipeline",
      featherBudget: "FeatherBudget KI",
      featherTax: "FeatherTax",
      easyCalc: "EasyCalc",
      accounting: "Buchhaltung",
      quotes: "Angebote",
      estimates: "Kostenvoranschläge"
    },
    notes: {
      title: "Notizen",
      noteCount: {
        single: "Notiz",
        plural: "Notizen"
      },
      loading: "Notizen werden geladen...",
      authRequired: "Authentifizierung erforderlich",
      authRequiredMessage: "Bitte melden Sie sich an, um auf Ihre Notizen zuzugreifen.",
      noNotesYet: "Noch keine Notizen",
      noNotesFound: "Keine Notizen gefunden",
      noNotesYetMessage: "Erstellen Sie Ihre erste Notiz und organisieren Sie Ihre Ideen",
      noNotesFoundMessage: "Versuchen Sie, Ihre Suche oder Filter anzupassen, um Ihre Notizen zu finden",
      createFirstTip: "💡 Tipp: Verwenden Sie die + Schaltfläche, um eine neue Notiz zu erstellen",
      searchPlaceholder: "Notizen suchen...",
      allClients: "Alle Kunden",
      allProjects: "Alle Projekte",
      newest: "Neueste",
      oldest: "Älteste",
      newNote: "Neue Notiz",
      editNote: "Notiz bearbeiten",
      titlePlaceholder: "Titel",
      content: "Inhalt",
      contentPlaceholder: "Schreiben Sie los...",
      client: "Kunde",
      selectClient: "Kunde auswählen",
      project: "Projekt",
      selectProject: "Projekt auswählen",
      none: "Keine",
      tags: "Tags",
      tagsPlaceholder: "Tags durch Komma getrennt hinzufügen",
      cancel: "Abbrechen",
      saving: "Speichern...",
      createNote: "Notiz erstellen",
      saveChanges: "Änderungen speichern",
      success: "Erfolg",
      error: "Fehler",
      noteCreated: "Notiz erfolgreich erstellt",
      noteUpdated: "Notiz erfolgreich aktualisiert",
      saveError: "Notiz konnte nicht gespeichert werden",
      noAdditionalContent: "Kein zusätzlicher Inhalt"
    }
  },
  fr: {
    dashboard: {
      title: "Tableau de bord",
      welcome: "Bon retour",
      totalCustomers: "Total des clients",
      activeProjects: "Projets actifs",
      monthlyRevenue: "Revenus mensuels",
      conversionRate: "Taux de conversion",
      fromLastMonth: "du mois dernier"
    },
    sidebar: {
      mainFeatures: "Fonctionnalités principales",
      coreBusiness: "Cœur de métier",
      financialTools: "Outils financiers",
      operations: "Opérations",
      documentsAndForms: "Documents et formulaires",
      productivity: "Productivité",
      communication: "Communication",
      analytics: "Analyses",
      integrations: "Intégrations",
      system: "Système",
      aiVoice: "Voix IA",
      createInvoice: "Créer une facture",
      esignatures: "Signatures électroniques",
      customers: "Clients",
      projects: "Projets",
      projectTimeline: "Chronologie du projet",
      salesPipeline: "Pipeline de vente",
      featherBudget: "FeatherBudget IA",
      featherTax: "FeatherTax",
      easyCalc: "EasyCalc",
      accounting: "Comptabilité",
      quotes: "Devis",
      estimates: "Estimations"
    },
    notes: {
      title: "Notes",
      noteCount: {
        single: "note",
        plural: "notes"
      },
      loading: "Chargement des notes...",
      authRequired: "Authentification requise",
      authRequiredMessage: "Veuillez vous connecter pour accéder à vos notes.",
      noNotesYet: "Aucune note pour le moment",
      noNotesFound: "Aucune note trouvée",
      noNotesYetMessage: "Commencez à créer votre première note et organisez vos idées",
      noNotesFoundMessage: "Essayez d'ajuster votre recherche ou vos filtres pour trouver vos notes",
      createFirstTip: "💡 Astuce: Utilisez le bouton + pour créer une nouvelle note",
      searchPlaceholder: "Rechercher des notes...",
      allClients: "Tous les clients",
      allProjects: "Tous les projets",
      newest: "Plus récent",
      oldest: "Plus ancien",
      newNote: "Nouvelle note",
      editNote: "Modifier la note",
      titlePlaceholder: "Titre",
      content: "Contenu",
      contentPlaceholder: "Commencez à écrire...",
      client: "Client",
      selectClient: "Sélectionner un client",
      project: "Projet",
      selectProject: "Sélectionner un projet",
      none: "Aucun",
      tags: "Tags",
      tagsPlaceholder: "Ajouter des tags séparés par des virgules",
      cancel: "Annuler",
      saving: "Enregistrement...",
      createNote: "Créer une note",
      saveChanges: "Enregistrer les modifications",
      success: "Succès",
      error: "Erreur",
      noteCreated: "Note créée avec succès",
      noteUpdated: "Note mise à jour avec succès",
      saveError: "Échec de l'enregistrement de la note",
      noAdditionalContent: "Aucun contenu supplémentaire"
    }
  },
  es: {
    dashboard: {
      title: "Panel de control",
      welcome: "Bienvenido de vuelta",
      totalCustomers: "Total de clientes",
      activeProjects: "Proyectos activos",
      monthlyRevenue: "Ingresos mensuales",
      conversionRate: "Tasa de conversión",
      fromLastMonth: "del mes pasado"
    },
    sidebar: {
      mainFeatures: "Características principales",
      coreBusiness: "Negocio principal",
      financialTools: "Herramientas financieras",
      operations: "Operaciones",
      documentsAndForms: "Documentos y formularios",
      productivity: "Productividad",
      communication: "Comunicación",
      analytics: "Analíticas",
      integrations: "Integraciones",
      system: "Sistema",
      aiVoice: "Voz IA",
      createInvoice: "Crear factura",
      esignatures: "Firmas electrónicas",
      customers: "Clientes",
      projects: "Proyectos",
      projectTimeline: "Cronología del proyecto",
      salesPipeline: "Pipeline de ventas",
      featherBudget: "FeatherBudget IA",
      featherTax: "FeatherTax",
      easyCalc: "EasyCalc",
      accounting: "Contabilidad",
      quotes: "Cotizaciones",
      estimates: "Estimaciones"
    },
    notes: {
      title: "Notas",
      noteCount: {
        single: "nota",
        plural: "notas"
      },
      loading: "Cargando notas...",
      authRequired: "Autenticación requerida",
      authRequiredMessage: "Por favor inicia sesión para acceder a tus notas.",
      noNotesYet: "Aún no hay notas",
      noNotesFound: "No se encontraron notas",
      noNotesYetMessage: "Comienza creando tu primera nota y organiza tus ideas",
      noNotesFoundMessage: "Intenta ajustar tu búsqueda o filtros para encontrar tus notas",
      createFirstTip: "💡 Consejo: Usa el botón + para crear una nueva nota",
      searchPlaceholder: "Buscar notas...",
      allClients: "Todos los clientes",
      allProjects: "Todos los proyectos",
      newest: "Más reciente",
      oldest: "Más antiguo",
      newNote: "Nueva nota",
      editNote: "Editar nota",
      titlePlaceholder: "Título",
      content: "Contenido",
      contentPlaceholder: "Comienza a escribir...",
      client: "Cliente",
      selectClient: "Seleccionar cliente",
      project: "Proyecto",
      selectProject: "Seleccionar proyecto",
      none: "Ninguno",
      tags: "Etiquetas",
      tagsPlaceholder: "Agregar etiquetas separadas por comas",
      cancel: "Cancelar",
      saving: "Guardando...",
      createNote: "Crear nota",
      saveChanges: "Guardar cambios",
      success: "Éxito",
      error: "Error",
      noteCreated: "Nota creada exitosamente",
      noteUpdated: "Nota actualizada exitosamente",
      saveError: "Error al guardar la nota",
      noAdditionalContent: "Sin contenido adicional"
    }
  },
  zh: {
    dashboard: {
      title: "仪表板",
      welcome: "欢迎回来",
      totalCustomers: "客户总数",
      activeProjects: "活跃项目",
      monthlyRevenue: "月收入",
      conversionRate: "转化率",
      fromLastMonth: "与上月相比"
    },
    sidebar: {
      mainFeatures: "主要功能",
      coreBusiness: "核心业务",
      financialTools: "财务工具",
      operations: "运营",
      documentsAndForms: "文档和表单",
      productivity: "生产力",
      communication: "沟通",
      analytics: "分析",
      integrations: "集成",
      system: "系统",
      aiVoice: "AI语音",
      createInvoice: "创建发票",
      esignatures: "电子签名",
      customers: "客户",
      projects: "项目",
      projectTimeline: "项目时间表",
      salesPipeline: "销售管道",
      featherBudget: "FeatherBudget AI",
      featherTax: "FeatherTax",
      easyCalc: "EasyCalc",
      accounting: "会计",
      quotes: "报价",
      estimates: "估算"
    },
    notes: {
      title: "笔记",
      noteCount: {
        single: "条笔记",
        plural: "条笔记"
      },
      loading: "加载笔记中...",
      authRequired: "需要身份验证",
      authRequiredMessage: "请登录以访问您的笔记。",
      noNotesYet: "还没有笔记",
      noNotesFound: "未找到笔记",
      noNotesYetMessage: "开始创建您的第一条笔记并整理您的想法",
      noNotesFoundMessage: "尝试调整您的搜索或筛选器来找到您的笔记",
      createFirstTip: "💡 提示：使用 + 按钮创建新笔记",
      searchPlaceholder: "搜索笔记...",
      allClients: "所有客户",
      allProjects: "所有项目",
      newest: "最新",
      oldest: "最旧",
      newNote: "新笔记",
      editNote: "编辑笔记",
      titlePlaceholder: "标题",
      content: "内容",
      contentPlaceholder: "开始输入...",
      client: "客户",
      selectClient: "选择客户",
      project: "项目",
      selectProject: "选择项目",
      none: "无",
      tags: "标签",
      tagsPlaceholder: "添加用逗号分隔的标签",
      cancel: "取消",
      saving: "保存中...",
      createNote: "创建笔记",
      saveChanges: "保存更改",
      success: "成功",
      error: "错误",
      noteCreated: "笔记创建成功",
      noteUpdated: "笔记更新成功",
      saveError: "保存笔记失败",
      noAdditionalContent: "无其他内容"
    }
  },
  "pt-BR": {
    dashboard: {
      title: "Painel",
      welcome: "Bem-vindo de volta",
      totalCustomers: "Total de clientes",
      activeProjects: "Projetos ativos",
      monthlyRevenue: "Receita mensal",
      conversionRate: "Taxa de conversão",
      fromLastMonth: "do mês passado"
    },
    sidebar: {
      mainFeatures: "Recursos principais",
      coreBusiness: "Negócio principal",
      financialTools: "Ferramentas financeiras",
      operations: "Operações",
      documentsAndForms: "Documentos e formulários",
      productivity: "Produtividade",
      communication: "Comunicação",
      analytics: "Análises",
      integrations: "Integrações",
      system: "Sistema",
      aiVoice: "Voz IA",
      createInvoice: "Criar fatura",
      esignatures: "Assinaturas eletrônicas",
      customers: "Clientes",
      projects: "Projetos",
      projectTimeline: "Cronograma do projeto",
      salesPipeline: "Pipeline de vendas",
      featherBudget: "FeatherBudget IA",
      featherTax: "FeatherTax",
      easyCalc: "EasyCalc",
      accounting: "Contabilidade",
      quotes: "Cotações",
      estimates: "Orçamentos"
    },
    notes: {
      title: "Notas",
      noteCount: {
        single: "nota",
        plural: "notas"
      },
      loading: "Carregando notas...",
      authRequired: "Autenticação Necessária",
      authRequiredMessage: "Faça login para acessar suas notas.",
      noNotesYet: "Nenhuma nota ainda",
      noNotesFound: "Nenhuma nota encontrada",
      noNotesYetMessage: "Comece criando sua primeira nota e organize suas ideias",
      noNotesFoundMessage: "Tente ajustar sua pesquisa ou filtros para encontrar suas notas",
      createFirstTip: "💡 Dica: Use o botão + para criar uma nova nota",
      searchPlaceholder: "Pesquisar notas...",
      allClients: "Todos os clientes",
      allProjects: "Todos os projetos",
      newest: "Mais recentes",
      oldest: "Mais antigas",
      newNote: "Nova Nota",
      editNote: "Editar Nota",
      titlePlaceholder: "Título",
      content: "Conteúdo",
      contentPlaceholder: "Comece a escrever...",
      client: "Cliente",
      selectClient: "Selecionar cliente",
      project: "Projeto",
      selectProject: "Selecionar projeto",
      none: "Nenhum",
      tags: "Tags",
      tagsPlaceholder: "Adicione tags separadas por vírgula",
      cancel: "Cancelar",
      saving: "Salvando...",
      createNote: "Criar Nota",
      saveChanges: "Salvar Alterações",
      success: "Sucesso",
      error: "Erro",
      noteCreated: "Nota criada com sucesso",
      noteUpdated: "Nota atualizada com sucesso",
      saveError: "Falha ao salvar nota",
      noAdditionalContent: "Sem conteúdo adicional"
    }
  }
}

// Initialize i18next
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
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return i18next.language || "en-US"
  })

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng)
    }

    i18next.on("languageChanged", handleLanguageChange)

    return () => {
      i18next.off("languageChanged", handleLanguageChange)
    }
  }, [])

  const setLanguage = (lang: string) => {
    i18next.changeLanguage(lang)
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
