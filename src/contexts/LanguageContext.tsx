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
    },
    landing: {
      tagline: "AI-Powered Business Platform",
      title: "The Modern Way to",
      titleHighlight: "Run Your Business",
      subtitle: "FeatherBiz combines AI intelligence with powerful automation to help entrepreneurs streamline their workflow, manage customers, and grow their business faster than ever.",
      tryFree: "Try It Free",
      watchDemo: "Watch Demo",
      everythingTitle: "Everything You Need to Scale",
      everythingSubtitle: "Powerful features designed for modern entrepreneurs who want to focus on growth, not admin work.",
      lovedTitle: "Loved by Entrepreneurs",
      lovedSubtitle: "See what our users say about FeatherBiz",
      ctaTitle: "Ready to Transform Your Business?",
      ctaSubtitle: "Join thousands of entrepreneurs who trust FeatherBiz to power their success.",
      startTrial: "Start Free Trial",
      contactSales: "Contact Sales",
      ctaFooter: "No credit card required • 7-day free trial • Cancel anytime",
      features: {
        aiVoice: {
          title: "AI Voice Assistant",
          description: "Intelligent automation that learns from your business patterns and suggests optimizations."
        },
        smartInvoicing: {
          title: "Smart Invoicing", 
          description: "Create professional invoices with AI assistance and track when clients view them."
        },
        customerManagement: {
          title: "Customer Management",
          description: "Manage relationships and communications with your customers in one place."
        },
        analytics: {
          title: "Advanced Analytics",
          description: "Get insights into your business performance with detailed analytics and reporting."
        },
        security: {
          title: "Secure & Reliable",
          description: "Enterprise-grade security with 99.9% uptime guarantee and automatic backups."
        },
        automation: {
          title: "Workflow Automation",
          description: "Automate repetitive tasks and focus on growing your business."
        },
        receipts: {
          title: "Receipts",
          description: "Track and manage all your business receipts and expenses in one organized system."
        },
        appointments: {
          title: "Appointments",
          description: "Schedule and manage appointments with clients with automated reminders."
        },
        workOrders: {
          title: "Work Orders",
          description: "Create, track, and manage work orders with real-time status updates."
        }
      }
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
    },
    landing: {
      tagline: "KI-gestützte Business-Plattform",
      title: "Der moderne Weg,",
      titleHighlight: "Ihr Unternehmen zu führen",
      subtitle: "FeatherBiz kombiniert KI-Intelligenz mit leistungsstarker Automatisierung, um Unternehmern zu helfen, ihre Arbeitsabläufe zu optimieren, Kunden zu verwalten und ihr Geschäft schneller als je zuvor zu erweitern.",
      tryFree: "Kostenlos testen",
      watchDemo: "Demo ansehen",
      everythingTitle: "Alles was Sie zum Skalieren brauchen",
      everythingSubtitle: "Leistungsstarke Features für moderne Unternehmer, die sich auf Wachstum konzentrieren wollen, nicht auf Verwaltungsarbeit.",
      lovedTitle: "Geliebt von Unternehmern",
      lovedSubtitle: "Sehen Sie, was unsere Nutzer über FeatherBiz sagen",
      ctaTitle: "Bereit, Ihr Unternehmen zu transformieren?",
      ctaSubtitle: "Schließen Sie sich Tausenden von Unternehmern an, die FeatherBiz für ihren Erfolg vertrauen.",
      startTrial: "Kostenlose Testversion starten",
      contactSales: "Vertrieb kontaktieren",
      ctaFooter: "Keine Kreditkarte erforderlich • 7-tägige kostenlose Testversion • Jederzeit kündbar",
      features: {
        aiVoice: {
          title: "KI-Sprachassistent",
          description: "Intelligente Automatisierung, die aus Ihren Geschäftsmustern lernt und Optimierungen vorschlägt."
        },
        smartInvoicing: {
          title: "Intelligente Rechnungsstellung",
          description: "Erstellen Sie professionelle Rechnungen mit KI-Unterstützung und verfolgen Sie, wann Kunden sie anzeigen."
        },
        customerManagement: {
          title: "Kundenverwaltung",
          description: "Verwalten Sie Beziehungen und Kommunikation mit Ihren Kunden an einem Ort."
        },
        analytics: {
          title: "Erweiterte Analysen",
          description: "Erhalten Sie Einblicke in Ihre Geschäftsleistung mit detaillierten Analysen und Berichten."
        },
        security: {
          title: "Sicher & Zuverlässig",
          description: "Unternehmenssicherheit mit 99,9% Verfügbarkeitsgarantie und automatischen Backups."
        },
        automation: {
          title: "Workflow-Automatisierung",
          description: "Automatisieren Sie wiederkehrende Aufgaben und konzentrieren Sie sich auf das Wachstum Ihres Unternehmens."
        },
        receipts: {
          title: "Belege",
          description: "Verfolgen und verwalten Sie alle Ihre Geschäftsbelege und -ausgaben in einem organisierten System."
        },
        appointments: {
          title: "Termine",
          description: "Planen und verwalten Sie Termine mit Kunden mit automatischen Erinnerungen."
        },
        workOrders: {
          title: "Arbeitsaufträge",
          description: "Erstellen, verfolgen und verwalten Sie Arbeitsaufträge mit Echtzeit-Statusupdates."
        }
      }
    }
  },
  fr: {
    sidebar: {
      dashboard: "Tableau de bord",
      aiVoice: "Voix IA",
      createInvoice: "Créer une facture",
      customers: "Clients",
      analytics: "Analyses",
      features: "Demandes de fonctionnalités",
      contracts: "Contrats",
      esignatures: "Signatures électroniques"
    },
    language: {
      title: "Langue",
      selectPlaceholder: "Sélectionner la langue"
    },
    features: {
      title: "Demandes de fonctionnalités",
      subtitle: "Aidez-nous à construire l'avenir de FeatherBiz !",
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
    contracts: {
      title: "Contrats",
      subtitle: "Créez et gérez vos contrats commerciaux",
      newContract: "Nouveau contrat",
      searchPlaceholder: "Rechercher des contrats...",
      noContracts: "Aucun contrat trouvé",
      noContractsMessage: "Vous n'avez pas encore créé de contrats.",
      createFirst: "Créer le premier contrat",
      draft: "Brouillon",
      active: "Actif",
      expired: "Expiré",
      archived: "Archivé"
    },
    esignatures: {
      title: "Signatures électroniques",
      subtitle: "Envoyez des documents pour signature électronique",
      sendForSignature: "Envoyer pour signature",
      selectDocument: "Sélectionner un document",
      selectClient: "Sélectionner un client",
      noDocuments: "Aucun document disponible",
      noClients: "Aucun client disponible",
      createDocument: "Créer d'abord un document",
      addClient: "Ajouter d'abord un client",
      pending: "En attente",
      signed: "Signé",
      declined: "Refusé"
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
      folderNamePlaceholder: "Ex: Contrats 2025",
      folderDescription: "Description (optionnelle)",
      folderDescriptionPlaceholder: "Description du dossier...",
      uploadFileTitle: "Télécharger un fichier",
      uploadFileDescription: "Sélectionnez un fichier à télécharger dans le dossier sélectionné.",
      file: "Fichier",
      uploadingTo: "Le fichier sera téléchargé vers:",
      view: "Voir",
      download: "Télécharger",
      addToFavorites: "Ajouter aux favoris",
      removeFromFavorites: "Supprimer des favoris",
      delete: "Supprimer",
      success: "Succès",
      error: "Erreur",
      folderCreated: "Dossier créé avec succès !",
      fileUploaded: "Fichier téléchargé avec succès !",
      addedToFavorites: "Ajouté aux favoris",
      removedFromFavorites: "Supprimé des favoris",
      fileDeleted: "Fichier supprimé avec succès !",
      errorLoadingFolders: "Impossible de charger les dossiers.",
      errorLoadingFiles: "Impossible de charger les fichiers.",
      errorCreatingFolder: "Impossible de créer le dossier.",
      errorUploadingFile: "Impossible de télécharger le fichier.",
      errorFavoriteStatus: "Impossible de changer le statut de favori.",
      errorDeletingFile: "Impossible de supprimer le fichier."
    },
    landing: {
      tagline: "Plateforme d'entreprise alimentée par l'IA",
      title: "La façon moderne de",
      titleHighlight: "Gérer votre entreprise",
      subtitle: "FeatherBiz combine l'intelligence IA avec une automatisation puissante pour aider les entrepreneurs à rationaliser leur flux de travail, gérer les clients et développer leur entreprise plus rapidement que jamais.",
      tryFree: "Essayer gratuitement",
      watchDemo: "Voir la démo",
      everythingTitle: "Tout ce dont vous avez besoin pour évoluer",
      everythingSubtitle: "Des fonctionnalités puissantes conçues pour les entrepreneurs modernes qui veulent se concentrer sur la croissance, pas sur le travail administratif.",
      lovedTitle: "Aimé par les entrepreneurs",
      lovedSubtitle: "Découvrez ce que nos utilisateurs disent de FeatherBiz",
      ctaTitle: "Prêt à transformer votre entreprise ?",
      ctaSubtitle: "Rejoignez des milliers d'entrepreneurs qui font confiance à FeatherBiz pour leur succès.",
      startTrial: "Commencer l'essai gratuit",
      contactSales: "Contacter les ventes",
      ctaFooter: "Aucune carte de crédit requise • Essai gratuit de 7 jours • Annulez à tout moment",
      features: {
        aiVoice: {
          title: "Assistant vocal IA",
          description: "Automatisation intelligente qui apprend de vos modèles d'entreprise et suggère des optimisations."
        },
        smartInvoicing: {
          title: "Facturation intelligente",
          description: "Créez des factures professionnelles avec l'assistance IA et suivez quand les clients les consultent."
        },
        customerManagement: {
          title: "Gestion des clients",
          description: "Gérez les relations et communications avec vos clients en un seul endroit."
        },
        analytics: {
          title: "Analyses avancées",
          description: "Obtenez des insights sur les performances de votre entreprise avec des analyses et rapports détaillés."
        },
        security: {
          title: "Sécurisé et fiable",
          description: "Sécurité de niveau entreprise avec une garantie de disponibilité de 99,9% et des sauvegardes automatiques."
        },
        automation: {
          title: "Automatisation des flux de travail",
          description: "Automatisez les tâches répétitives et concentrez-vous sur la croissance de votre entreprise."
        },
        receipts: {
          title: "Reçus",
          description: "Suivez et gérez tous vos reçus et dépenses d'entreprise dans un système organisé."
        },
        appointments: {
          title: "Rendez-vous",
          description: "Planifiez et gérez les rendez-vous avec les clients avec des rappels automatiques."
        },
        workOrders: {
          title: "Bons de travail",
          description: "Créez, suivez et gérez les bons de travail avec des mises à jour de statut en temps réel."
        }
      }
    }
  },
  es: {
    sidebar: {
      dashboard: "Panel de control",
      aiVoice: "Voz IA",
      createInvoice: "Crear factura",
      customers: "Clientes",
      analytics: "Análisis",
      features: "Solicitudes de funciones",
      contracts: "Contratos",
      esignatures: "Firmas electrónicas"
    },
    language: {
      title: "Idioma",
      selectPlaceholder: "Seleccionar idioma"
    },
    features: {
      title: "Solicitudes de funciones",
      subtitle: "¡Ayúdanos a construir el futuro de FeatherBiz!",
      suggest: "Sugerir una función",
      vote: "Votar",
      pending: "Pendiente",
      inProgress: "En progreso",
      completed: "Completado",
      description: "Descripción",
      status: "Estado",
      votes: "Votos",
      sortBy: "Ordenar por",
      newest: "Más reciente",
      mostVoted: "Más votado",
      addFeature: "Agregar solicitud de función",
      featureTitle: "Título de la función",
      featureDescription: "Descripción de la función",
      cancel: "Cancelar",
      submit: "Enviar"
    },
    contracts: {
      title: "Contratos",
      subtitle: "Crea y gestiona tus contratos comerciales",
      newContract: "Nuevo contrato",
      searchPlaceholder: "Buscar contratos...",
      noContracts: "No se encontraron contratos",
      noContractsMessage: "Aún no has creado ningún contrato.",
      createFirst: "Crear primer contrato",
      draft: "Borrador",
      active: "Activo",
      expired: "Expirado",
      archived: "Archivado"
    },
    esignatures: {
      title: "Firmas electrónicas",
      subtitle: "Envía documentos para firma electrónica",
      sendForSignature: "Enviar para firma",
      selectDocument: "Seleccionar documento",
      selectClient: "Seleccionar cliente",
      noDocuments: "No hay documentos disponibles",
      noClients: "No hay clientes disponibles",
      createDocument: "Crear documento primero",
      addClient: "Agregar cliente primero",
      pending: "Pendiente",
      signed: "Firmado",
      declined: "Rechazado"
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
      noFilesInFolder: "Esta carpeta aún no contiene archivos.",
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
      folderCreated: "¡Carpeta creada exitosamente!",
      fileUploaded: "¡Archivo subido exitosamente!",
      addedToFavorites: "Agregado a favoritos",
      removedFromFavorites: "Quitado de favoritos",
      fileDeleted: "¡Archivo eliminado exitosamente!",
      errorLoadingFolders: "No se pudieron cargar las carpetas.",
      errorLoadingFiles: "No se pudieron cargar los archivos.",
      errorCreatingFolder: "No se pudo crear la carpeta.",
      errorUploadingFile: "No se pudo subir el archivo.",
      errorFavoriteStatus: "No se pudo cambiar el estado de favorito.",
      errorDeletingFile: "No se pudo eliminar el archivo."
    },
    landing: {
      tagline: "Plataforma empresarial impulsada por IA",
      title: "La forma moderna de",
      titleHighlight: "Dirigir tu negocio",
      subtitle: "FeatherBiz combina inteligencia IA con automatización potente para ayudar a emprendedores a optimizar su flujo de trabajo, gestionar clientes y hacer crecer su negocio más rápido que nunca.",
      tryFree: "Pruébalo gratis",
      watchDemo: "Ver demo",
      everythingTitle: "Todo lo que necesitas para escalar",
      everythingSubtitle: "Funciones potentes diseñadas para emprendedores modernos que quieren enfocarse en el crecimiento, no en el trabajo administrativo.",
      lovedTitle: "Amado por emprendedores",
      lovedSubtitle: "Ve lo que nuestros usuarios dicen sobre FeatherBiz",
      ctaTitle: "¿Listo para transformar tu negocio?",
      ctaSubtitle: "Únete a miles de emprendedores que confían en FeatherBiz para su éxito.",
      startTrial: "Iniciar prueba gratuita",
      contactSales: "Contactar ventas",
      ctaFooter: "No se requiere tarjeta de crédito • Prueba gratuita de 7 días • Cancela en cualquier momento",
      features: {
        aiVoice: {
          title: "Asistente de voz IA",
          description: "Automatización inteligente que aprende de tus patrones de negocio y sugiere optimizaciones."
        },
        smartInvoicing: {
          title: "Facturación inteligente",
          description: "Crea facturas profesionales con asistencia IA y rastrea cuándo los clientes las ven."
        },
        customerManagement: {
          title: "Gestión de clientes",
          description: "Gestiona relaciones y comunicaciones con tus clientes en un solo lugar."
        },
        analytics: {
          title: "Análisis avanzados",
          description: "Obtén insights sobre el rendimiento de tu negocio con análisis e informes detallados."
        },
        security: {
          title: "Seguro y confiable",
          description: "Seguridad de nivel empresarial con garantía de disponibilidad del 99.9% y copias de seguridad automáticas."
        },
        automation: {
          title: "Automatización de flujos de trabajo",
          description: "Automatiza tareas repetitivas y enfócate en hacer crecer tu negocio."
        },
        receipts: {
          title: "Recibos",
          description: "Rastrea y gestiona todos tus recibos y gastos de negocio en un sistema organizado."
        },
        appointments: {
          title: "Citas",
          description: "Programa y gestiona citas con clientes con recordatorios automatizados."
        },
        workOrders: {
          title: "Órdenes de trabajo",
          description: "Crea, rastrea y gestiona órdenes de trabajo con actualizaciones de estado en tiempo real."
        }
      }
    }
  },
  zh: {
    sidebar: {
      dashboard: "仪表板",
      aiVoice: "AI语音",
      createInvoice: "创建发票",
      customers: "客户",
      analytics: "分析",
      features: "功能请求",
      contracts: "合同",
      esignatures: "电子签名"
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
      votes: "投票",
      sortBy: "排序",
      newest: "最新",
      mostVoted: "最多投票",
      addFeature: "添加功能请求",
      featureTitle: "功能标题",
      featureDescription: "功能描述",
      cancel: "取消",
      submit: "提交"
    },
    contracts: {
      title: "合同",
      subtitle: "创建和管理您的商业合同",
      newContract: "新合同",
      searchPlaceholder: "搜索合同...",
      noContracts: "未找到合同",
      noContractsMessage: "您还没有创建任何合同。",
      createFirst: "创建第一个合同",
      draft: "草稿",
      active: "活跃",
      expired: "已过期",
      archived: "已归档"
    },
    esignatures: {
      title: "电子签名",
      subtitle: "发送文档进行电子签名",
      sendForSignature: "发送签名",
      selectDocument: "选择文档",
      selectClient: "选择客户",
      noDocuments: "没有可用文档",
      noClients: "没有可用客户",
      createDocument: "先创建文档",
      addClient: "先添加客户",
      pending: "待处理",
      signed: "已签名",
      declined: "已拒绝"
    },
    files: {
      title: "文件管理器",
      subtitle: "在文件夹中整理您的文档",
      newFolder: "新文件夹",
      uploadFile: "上传文件",
      searchPlaceholder: "搜索文件...",
      folders: "文件夹",
      allFiles: "所有文件",
      noFilesFound: "未找到文件",
      noFilesMessage: "您还没有上传任何文件。",
      noFilesInFolder: "此文件夹还没有任何文件。",
      uploadFirstFile: "上传第一个文件",
      createNewFolder: "创建新文件夹",
      createFolderDescription: "创建一个新文件夹来整理您的文档。",
      folderName: "文件夹名称",
      folderNamePlaceholder: "例如：合同2025",
      folderDescription: "描述（可选）",
      folderDescriptionPlaceholder: "文件夹描述...",
      uploadFileTitle: "上传文件",
      uploadFileDescription: "选择一个文件上传到选定的文件夹。",
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
    },
    landing: {
      tagline: "AI驱动的商业平台",
      title: "现代化的方式",
      titleHighlight: "经营您的业务",
      subtitle: "FeatherBiz将AI智能与强大的自动化相结合，帮助企业家简化工作流程、管理客户，并比以往更快地发展业务。",
      tryFree: "免费试用",
      watchDemo: "观看演示",
      everythingTitle: "扩展所需的一切",
      everythingSubtitle: "为希望专注于增长而非管理工作的现代企业家设计的强大功能。",
      lovedTitle: "深受企业家喜爱",
      lovedSubtitle: "看看我们的用户对FeatherBiz的评价",
      ctaTitle: "准备好转变您的业务了吗？",
      ctaSubtitle: "加入数千名信任FeatherBiz助力成功的企业家。",
      startTrial: "开始免费试用",
      contactSales: "联系销售",
      ctaFooter: "无需信用卡 • 7天免费试用 • 随时取消",
      features: {
        aiVoice: {
          title: "AI语音助手",
          description: "智能自动化，学习您的业务模式并建议优化。"
        },
        smartInvoicing: {
          title: "智能发票",
          description: "在AI辅助下创建专业发票，并跟踪客户何时查看。"
        },
        customerManagement: {
          title: "客户管理",
          description: "在一个地方管理与客户的关系和沟通。"
        },
        analytics: {
          title: "高级分析",
          description: "通过详细的分析和报告获得业务绩效洞察。"
        },
        security: {
          title: "安全可靠",
          description: "企业级安全，99.9%正常运行时间保证和自动备份。"
        },
        automation: {
          title: "工作流自动化",
          description: "自动化重复任务，专注于发展您的业务。"
        },
        receipts: {
          title: "收据",
          description: "在一个有组织的系统中跟踪和管理所有业务收据和费用。"
        },
        appointments: {
          title: "预约",
          description: "安排和管理与客户的预约，带有自动提醒。"
        },
        workOrders: {
          title: "工单",
          description: "创建、跟踪和管理工单，提供实时状态更新。"
        }
      }
    }
  },
  "pt-BR": {
    sidebar: {
      dashboard: "Painel",
      aiVoice: "Voz IA",
      createInvoice: "Criar fatura",
      customers: "Clientes",
      analytics: "Análises",
      features: "Solicitações de recursos",
      contracts: "Contratos",
      esignatures: "Assinaturas eletrônicas"
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
    contracts: {
      title: "Contratos",
      subtitle: "Crie e gerencie seus contratos comerciais",
      newContract: "Novo contrato",
      searchPlaceholder: "Buscar contratos...",
      noContracts: "Nenhum contrato encontrado",
      noContractsMessage: "Você ainda não criou nenhum contrato.",
      createFirst: "Criar primeiro contrato",
      draft: "Rascunho",
      active: "Ativo",
      expired: "Expirado",
      archived: "Arquivado"
    },
    esignatures: {
      title: "Assinaturas eletrônicas",
      subtitle: "Envie documentos para assinatura eletrônica",
      sendForSignature: "Enviar para assinatura",
      selectDocument: "Selecionar documento",
      selectClient: "Selecionar cliente",
      noDocuments: "Nenhum documento disponível",
      noClients: "Nenhum cliente disponível",
      createDocument: "Criar documento primeiro",
      addClient: "Adicionar cliente primeiro",
      pending: "Pendente",
      signed: "Assinado",
      declined: "Recusado"
    },
    files: {
      title: "Gerenciador de arquivos",
      subtitle: "Organize seus documentos em pastas",
      newFolder: "Nova pasta",
      uploadFile: "Enviar arquivo",
      searchPlaceholder: "Buscar arquivos...",
      folders: "Pastas",
      allFiles: "Todos os arquivos",
      noFilesFound: "Nenhum arquivo encontrado",
      noFilesMessage: "Você ainda não enviou nenhum arquivo.",
      noFilesInFolder: "Esta pasta ainda não contém arquivos.",
      uploadFirstFile: "Enviar primeiro arquivo",
      createNewFolder: "Criar nova pasta",
      createFolderDescription: "Crie uma nova pasta para organizar seus documentos.",
      folderName: "Nome da pasta",
      folderNamePlaceholder: "Ex: Contratos 2025",
      folderDescription: "Descrição (opcional)",
      folderDescriptionPlaceholder: "Descrição da pasta...",
      uploadFileTitle: "Enviar arquivo",
      uploadFileDescription: "Selecione um arquivo para enviar para a pasta selecionada.",
      file: "Arquivo",
      uploadingTo: "O arquivo será enviado para:",
      view: "Visualizar",
      download: "Baixar",
      addToFavorites: "Adicionar aos favoritos",
      removeFromFavorites: "Remover dos favoritos",
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
    },
    landing: {
      tagline: "Plataforma empresarial alimentada por IA",
      title: "A maneira moderna de",
      titleHighlight: "Administrar seu negócio",
      subtitle: "FeatherBiz combina inteligência IA com automação poderosa para ajudar empreendedores a otimizar seu fluxo de trabalho, gerenciar clientes e fazer crescer seus negócios mais rápido do que nunca.",
      tryFree: "Experimente grátis",
      watchDemo: "Ver demonstração",
      everythingTitle: "Tudo que você precisa para escalar",
      everythingSubtitle: "Recursos poderosos projetados para empreendedores modernos que querem focar no crescimento, não no trabalho administrativo.",
      lovedTitle: "Amado por empreendedores",
      lovedSubtitle: "Veja o que nossos usuários dizem sobre o FeatherBiz",
      ctaTitle: "Pronto para transformar seu negócio?",
      ctaSubtitle: "Junte-se a milhares de empreendedores que confiam no FeatherBiz para seu sucesso.",
      startTrial: "Iniciar teste gratuito",
      contactSales: "Contatar vendas",
      ctaFooter: "Cartão de crédito não necessário • Teste gratuito de 7 dias • Cancele a qualquer momento",
      features: {
        aiVoice: {
          title: "Assistente de voz IA",
          description: "Automação inteligente que aprende com seus padrões de negócio e sugere otimizações."
        },
        smartInvoicing: {
          title: "Faturamento inteligente",
          description: "Crie faturas profissionais com assistência IA e rastreie quando os clientes as visualizam."
        },
        customerManagement: {
          title: "Gestão de clientes",
          description: "Gerencie relacionamentos e comunicações com seus clientes em um só lugar."
        },
        analytics: {
          title: "Análises avançadas",
          description: "Obtenha insights sobre o desempenho do seu negócio com análises e relatórios detalhados."
        },
        security: {
          title: "Seguro e confiável",
          description: "Segurança de nível empresarial com garantia de 99,9% de uptime e backups automáticos."
        },
        automation: {
          title: "Automação de fluxo de trabalho",
          description: "Automatize tarefas repetitivas e foque no crescimento do seu negócio."
        },
        receipts: {
          title: "Recibos",
          description: "Rastreie e gerencie todos os seus recibos e despesas comerciais em um sistema organizado."
        },
        appointments: {
          title: "Agendamentos",
          description: "Agende e gerencie compromissos com clientes com lembretes automatizados."
        },
        workOrders: {
          title: "Ordens de serviço",
          description: "Crie, rastreie e gerencie ordens de serviço com atualizações de status em tempo real."
        }
      }
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
