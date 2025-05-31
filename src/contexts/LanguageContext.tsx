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
      features: "Feature Requests",
      contracts: "Contracts",
      esignatures: "E-Signatures"
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
    contracts: {
      title: "Contracts",
      subtitle: "Create and manage your business contracts",
      newContract: "New Contract",
      searchPlaceholder: "Search contracts...",
      noContracts: "No contracts found",
      noContractsMessage: "You haven't created any contracts yet.",
      createFirst: "Create First Contract",
      draft: "Draft",
      active: "Active",
      expired: "Expired",
      archived: "Archived"
    },
    esignatures: {
      title: "E-Signatures",
      subtitle: "Send documents for electronic signature",
      sendForSignature: "Send for Signature",
      selectDocument: "Select Document",
      selectClient: "Select Client", 
      noDocuments: "No documents available",
      noClients: "No clients available",
      createDocument: "Create Document First",
      addClient: "Add Client First",
      pending: "Pending",
      signed: "Signed",
      declined: "Declined"
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
      features: "Feature-Anfragen",
      contracts: "Verträge",
      esignatures: "E-Signaturen"
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
    contracts: {
      title: "Verträge",
      subtitle: "Erstellen und verwalten Sie Ihre Geschäftsverträge",
      newContract: "Neuer Vertrag",
      searchPlaceholder: "Verträge suchen...",
      noContracts: "Keine Verträge gefunden",
      noContractsMessage: "Sie haben noch keine Verträge erstellt.",
      createFirst: "Ersten Vertrag erstellen",
      draft: "Entwurf",
      active: "Aktiv",
      expired: "Abgelaufen",
      archived: "Archiviert"
    },
    esignatures: {
      title: "E-Signaturen",
      subtitle: "Senden Sie Dokumente zur elektronischen Signatur",
      sendForSignature: "Zur Signatur senden",
      selectDocument: "Dokument auswählen",
      selectClient: "Kunden auswählen",
      noDocuments: "Keine Dokumente verfügbar",
      noClients: "Keine Kunden verfügbar",
      createDocument: "Zuerst Dokument erstellen",
      addClient: "Zuerst Kunden hinzufügen",
      pending: "Ausstehend",
      signed: "Signiert",
      declined: "Abgelehnt"
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
