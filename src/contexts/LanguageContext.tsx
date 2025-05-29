
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
      completed: "Completed",
      description: "Description",
      status: "Status",
      votes: "Votes",
      sortBy: "Sort by",
      newest: "Newest",
      mostVoted: "Most Voted",
      addFeature: "Add Feature Request",
      featureTitle: "Feature Title",
      featureDescription: "Feature Description",
      cancel: "Cancel",
      submit: "Submit"
    },
    files: {
      title: "File Manager",
      subtitle: "Organize your documents in folders",
      newFolder: "New Folder",
      uploadFile: "Upload File",
      searchPlaceholder: "Search files...",
      folders: "Folders",
      allFiles: "All Files",
      noFilesFound: "No files found",
      noFilesMessage: "You haven't uploaded any files yet.",
      noFilesInFolder: "This folder doesn't contain any files yet.",
      uploadFirstFile: "Upload First File",
      createNewFolder: "Create New Folder",
      createFolderDescription: "Create a new folder to organize your documents.",
      folderName: "Folder Name",
      folderNamePlaceholder: "Ex: Contracts 2025",
      folderDescription: "Description (optional)",
      folderDescriptionPlaceholder: "Folder description...",
      uploadFileTitle: "Upload File",
      uploadFileDescription: "Select a file to upload to the selected folder.",
      file: "File",
      uploadingTo: "File will be uploaded to:",
      view: "View",
      download: "Download",
      addToFavorites: "Add to Favorites",
      removeFromFavorites: "Remove from Favorites",
      delete: "Delete",
      success: "Success",
      error: "Error",
      folderCreated: "Folder created successfully!",
      fileUploaded: "File uploaded successfully!",
      addedToFavorites: "Added to favorites",
      removedFromFavorites: "Removed from favorites",
      fileDeleted: "File deleted successfully!",
      errorLoadingFolders: "Could not load folders.",
      errorLoadingFiles: "Could not load files.",
      errorCreatingFolder: "Could not create folder.",
      errorUploadingFile: "Could not upload file.",
      errorFavoriteStatus: "Could not change favorite status.",
      errorDeletingFile: "Could not delete file."
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
      completed: "Abgeschlossen",
      description: "Beschreibung",
      status: "Status",
      votes: "Stimmen",
      sortBy: "Sortieren nach",
      newest: "Neueste",
      mostVoted: "Meist gewählt",
      addFeature: "Feature-Anfrage hinzufügen",
      featureTitle: "Feature-Titel",
      featureDescription: "Feature-Beschreibung",
      cancel: "Abbrechen",
      submit: "Einreichen"
    },
    files: {
      title: "Datei-Manager",
      subtitle: "Organisieren Sie Ihre Dokumente in Ordnern",
      newFolder: "Neuer Ordner",
      uploadFile: "Datei hochladen",
      searchPlaceholder: "Dateien suchen...",
      folders: "Ordner",
      allFiles: "Alle Dateien",
      noFilesFound: "Keine Dateien gefunden",
      noFilesMessage: "Sie haben noch keine Dateien hochgeladen.",
      noFilesInFolder: "Dieser Ordner enthält noch keine Dateien.",
      uploadFirstFile: "Erste Datei hochladen",
      createNewFolder: "Neuen Ordner erstellen",
      createFolderDescription: "Erstellen Sie einen neuen Ordner zur Organisation Ihrer Dokumente.",
      folderName: "Ordnername",
      folderNamePlaceholder: "Z.B.: Verträge 2025",
      folderDescription: "Beschreibung (optional)",
      folderDescriptionPlaceholder: "Ordnerbeschreibung...",
      uploadFileTitle: "Datei hochladen",
      uploadFileDescription: "Wählen Sie eine Datei zum Hochladen in den ausgewählten Ordner.",
      file: "Datei",
      uploadingTo: "Datei wird hochgeladen nach:",
      view: "Anzeigen",
      download: "Herunterladen",
      addToFavorites: "Zu Favoriten hinzufügen",
      removeFromFavorites: "Aus Favoriten entfernen",
      delete: "Löschen",
      success: "Erfolg",
      error: "Fehler",
      folderCreated: "Ordner erfolgreich erstellt!",
      fileUploaded: "Datei erfolgreich hochgeladen!",
      addedToFavorites: "Zu Favoriten hinzugefügt",
      removedFromFavorites: "Aus Favoriten entfernt",
      fileDeleted: "Datei erfolgreich gelöscht!",
      errorLoadingFolders: "Ordner konnten nicht geladen werden.",
      errorLoadingFiles: "Dateien konnten nicht geladen werden.",
      errorCreatingFolder: "Ordner konnte nicht erstellt werden.",
      errorUploadingFile: "Datei konnte nicht hochgeladen werden.",
      errorFavoriteStatus: "Favoritenstatus konnte nicht geändert werden.",
      errorDeletingFile: "Datei konnte nicht gelöscht werden."
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
      completed: "Terminé",
      description: "Description",
      status: "Statut",
      votes: "Votes",
      sortBy: "Trier par",
      newest: "Plus récent",
      mostVoted: "Plus voté",
      addFeature: "Ajouter une demande de fonctionnalité",
      featureTitle: "Titre de la fonctionnalité",
      featureDescription: "Description de la fonctionnalité",
      cancel: "Annuler",
      submit: "Soumettre"
    },
    files: {
      title: "Gestionnaire de fichiers",
      subtitle: "Organisez vos documents dans des dossiers",
      newFolder: "Nouveau dossier",
      uploadFile: "Télécharger un fichier",
      searchPlaceholder: "Rechercher des fichiers...",
      folders: "Dossiers",
      allFiles: "Tous les fichiers",
      noFilesFound: "Aucun fichier trouvé",
      noFilesMessage: "Vous n'avez pas encore téléchargé de fichiers.",
      noFilesInFolder: "Ce dossier ne contient pas encore de fichiers.",
      uploadFirstFile: "Télécharger le premier fichier",
      createNewFolder: "Créer un nouveau dossier",
      createFolderDescription: "Créez un nouveau dossier pour organiser vos documents.",
      folderName: "Nom du dossier",
      folderNamePlaceholder: "Ex : Contrats 2025",
      folderDescription: "Description (optionnel)",
      folderDescriptionPlaceholder: "Description du dossier...",
      uploadFileTitle: "Télécharger un fichier",
      uploadFileDescription: "Sélectionnez un fichier à télécharger dans le dossier sélectionné.",
      file: "Fichier",
      uploadingTo: "Le fichier sera téléchargé vers :",
      view: "Voir",
      download: "Télécharger",
      addToFavorites: "Ajouter aux favoris",
      removeFromFavorites: "Retirer des favoris",
      delete: "Supprimer",
      success: "Succès",
      error: "Erreur",
      folderCreated: "Dossier créé avec succès !",
      fileUploaded: "Fichier téléchargé avec succès !",
      addedToFavorites: "Ajouté aux favoris",
      removedFromFavorites: "Retiré des favoris",
      fileDeleted: "Fichier supprimé avec succès !",
      errorLoadingFolders: "Impossible de charger les dossiers.",
      errorLoadingFiles: "Impossible de charger les fichiers.",
      errorCreatingFolder: "Impossible de créer le dossier.",
      errorUploadingFile: "Impossible de télécharger le fichier.",
      errorFavoriteStatus: "Impossible de modifier le statut favori.",
      errorDeletingFile: "Impossible de supprimer le fichier."
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
      completed: "Completado",
      description: "Descripción",
      status: "Estado",
      votes: "Votos",
      sortBy: "Ordenar por",
      newest: "Más nuevo",
      mostVoted: "Más votado",
      addFeature: "Agregar solicitud de característica",
      featureTitle: "Título de la característica",
      featureDescription: "Descripción de la característica",
      cancel: "Cancelar",
      submit: "Enviar"
    },
    files: {
      title: "Gestor de archivos",
      subtitle: "Organiza tus documentos en carpetas",
      newFolder: "Nueva carpeta",
      uploadFile: "Subir archivo",
      searchPlaceholder: "Buscar archivos...",
      folders: "Carpetas",
      allFiles: "Todos los archivos",
      noFilesFound: "No se encontraron archivos",
      noFilesMessage: "Aún no has subido ningún archivo.",
      noFilesInFolder: "Esta carpeta no contiene archivos aún.",
      uploadFirstFile: "Subir primer archivo",
      createNewFolder: "Crear nueva carpeta",
      createFolderDescription: "Crea una nueva carpeta para organizar tus documentos.",
      folderName: "Nombre de la carpeta",
      folderNamePlaceholder: "Ej: Contratos 2025",
      folderDescription: "Descripción (opcional)",
      folderDescriptionPlaceholder: "Descripción de la carpeta...",
      uploadFileTitle: "Subir archivo",
      uploadFileDescription: "Selecciona un archivo para subir a la carpeta seleccionada.",
      file: "Archivo",
      uploadingTo: "El archivo se subirá a:",
      view: "Ver",
      download: "Descargar",
      addToFavorites: "Agregar a favoritos",
      removeFromFavorites: "Quitar de favoritos",
      delete: "Eliminar",
      success: "Éxito",
      error: "Error",
      folderCreated: "¡Carpeta creada con éxito!",
      fileUploaded: "¡Archivo subido con éxito!",
      addedToFavorites: "Agregado a favoritos",
      removedFromFavorites: "Quitado de favoritos",
      fileDeleted: "¡Archivo eliminado con éxito!",
      errorLoadingFolders: "No se pudieron cargar las carpetas.",
      errorLoadingFiles: "No se pudieron cargar los archivos.",
      errorCreatingFolder: "No se pudo crear la carpeta.",
      errorUploadingFile: "No se pudo subir el archivo.",
      errorFavoriteStatus: "No se pudo cambiar el estado de favorito.",
      errorDeletingFile: "No se pudo eliminar el archivo."
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
      completed: "已完成",
      description: "描述",
      status: "状态",
      votes: "票数",
      sortBy: "排序",
      newest: "最新",
      mostVoted: "最多票",
      addFeature: "添加功能请求",
      featureTitle: "功能标题",
      featureDescription: "功能描述",
      cancel: "取消",
      submit: "提交"
    },
    files: {
      title: "文件管理器",
      subtitle: "在文件夹中整理您的文档",
      newFolder: "新建文件夹",
      uploadFile: "上传文件",
      searchPlaceholder: "搜索文件...",
      folders: "文件夹",
      allFiles: "所有文件",
      noFilesFound: "未找到文件",
      noFilesMessage: "您还没有上传任何文件。",
      noFilesInFolder: "此文件夹还没有文件。",
      uploadFirstFile: "上传第一个文件",
      createNewFolder: "创建新文件夹",
      createFolderDescription: "创建一个新文件夹来整理您的文档。",
      folderName: "文件夹名称",
      folderNamePlaceholder: "例如：合同 2025",
      folderDescription: "描述（可选）",
      folderDescriptionPlaceholder: "文件夹描述...",
      uploadFileTitle: "上传文件",
      uploadFileDescription: "选择要上传到所选文件夹的文件。",
      file: "文件",
      uploadingTo: "文件将上传到：",
      view: "查看",
      download: "下载",
      addToFavorites: "添加到收藏夹",
      removeFromFavorites: "从收藏夹移除",
      delete: "删除",
      success: "成功",
      error: "错误",
      folderCreated: "文件夹创建成功！",
      fileUploaded: "文件上传成功！",
      addedToFavorites: "已添加到收藏夹",
      removedFromFavorites: "已从收藏夹移除",
      fileDeleted: "文件删除成功！",
      errorLoadingFolders: "无法加载文件夹。",
      errorLoadingFiles: "无法加载文件。",
      errorCreatingFolder: "无法创建文件夹。",
      errorUploadingFile: "无法上传文件。",
      errorFavoriteStatus: "无法更改收藏状态。",
      errorDeletingFile: "无法删除文件。"
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
      completed: "Concluído",
      description: "Descrição",
      status: "Status",
      votes: "Votos",
      sortBy: "Ordenar por",
      newest: "Mais recente",
      mostVoted: "Mais votado",
      addFeature: "Adicionar solicitação de recurso",
      featureTitle: "Título do recurso",
      featureDescription: "Descrição do recurso",
      cancel: "Cancelar",
      submit: "Enviar"
    },
    files: {
      title: "Gerenciador de Arquivos",
      subtitle: "Organize seus documentos em pastas",
      newFolder: "Nova Pasta",
      uploadFile: "Enviar Arquivo",
      searchPlaceholder: "Buscar arquivos...",
      folders: "Pastas",
      allFiles: "Todos os Arquivos",
      noFilesFound: "Nenhum arquivo encontrado",
      noFilesMessage: "Você ainda não enviou nenhum arquivo.",
      noFilesInFolder: "Esta pasta não contém arquivos ainda.",
      uploadFirstFile: "Enviar Primeiro Arquivo",
      createNewFolder: "Criar Nova Pasta",
      createFolderDescription: "Crie uma nova pasta para organizar seus documentos.",
      folderName: "Nome da Pasta",
      folderNamePlaceholder: "Ex: Contratos 2025",
      folderDescription: "Descrição (opcional)",
      folderDescriptionPlaceholder: "Descrição da pasta...",
      uploadFileTitle: "Enviar Arquivo",
      uploadFileDescription: "Selecione um arquivo para enviar para a pasta selecionada.",
      file: "Arquivo",
      uploadingTo: "Arquivo será enviado para:",
      view: "Visualizar",
      download: "Download",
      addToFavorites: "Adicionar aos Favoritos",
      removeFromFavorites: "Remover dos Favoritos",
      delete: "Excluir",
      success: "Sucesso",
      error: "Erro",
      folderCreated: "Pasta criada com sucesso!",
      fileUploaded: "Arquivo enviado com sucesso!",
      addedToFavorites: "Adicionado aos favoritos",
      removedFromFavorites: "Removido dos favoritos",
      fileDeleted: "Arquivo excluído com sucesso!",
      errorLoadingFolders: "Não foi possível carregar as pastas.",
      errorLoadingFiles: "Não foi possível carregar os arquivos.",
      errorCreatingFolder: "Não foi possível criar a pasta.",
      errorUploadingFile: "Não foi possível enviar o arquivo.",
      errorFavoriteStatus: "Não foi possível alterar o status de favorito.",
      errorDeletingFile: "Não foi possível excluir o arquivo."
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
  const [currentLanguage, setCurrentLanguage] = useState(i18next.language || "en-US")

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
