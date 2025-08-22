
import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Volume2, VolumeX, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useLanguage } from "@/contexts/LanguageContext"

export function AIVoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const recognitionRef = useRef<any>(null)
  const { currentLanguage, t } = useLanguage()

  // Language mapping for speech recognition
  const getLanguageCode = (lang: string) => {
    const languageMap: Record<string, string> = {
      'en-US': 'en-US',
      'de': 'de-DE',
      'fr': 'fr-FR',
      'es': 'es-ES',
      'zh': 'zh-CN',
      'pt-BR': 'pt-BR'
    }
    return languageMap[lang] || 'en-US'
  }

  const startListening = async () => {
    try {
      // Check if browser supports speech recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      
      if (!SpeechRecognition) {
        toast.error('Speech recognition not supported in this browser')
        return
      }

      const recognition = new SpeechRecognition()
      recognitionRef.current = recognition

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = getLanguageCode(currentLanguage)

      recognition.onstart = () => {
        setIsListening(true)
        toast.success(getLocalizedMessage('listening'))
      }

      recognition.onresult = (event: any) => {
        const transcriptText = event.results[0][0].transcript
        setTranscript(transcriptText)
        processVoiceCommand(transcriptText)
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        toast.error(getLocalizedMessage('error'))
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } catch (error) {
      console.error('Error starting speech recognition:', error)
      toast.error(getLocalizedMessage('startError'))
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const processVoiceCommand = async (text: string) => {
    setIsProcessing(true)
    
    try {
      console.log('Processing voice command:', text)
      
      // First check for navigation commands
      const navigationResult = processNavigationCommand(text)
      if (navigationResult) {
        setResponse(navigationResult.response)
        speakText(navigationResult.response)
        
        // Navigate after a short delay to allow user to hear the response
        setTimeout(() => {
          if (navigationResult.action && window.location.pathname === '/') {
            // Trigger navigation in the main app
            const event = new CustomEvent('voice-navigation', { 
              detail: { view: navigationResult.action } 
            })
            window.dispatchEvent(event)
          }
        }, 2000)
        return
      }
      
      // Then try AI-powered response
      const aiResponse = await generateAIResponse(text)
      setResponse(aiResponse)
      speakText(aiResponse)
    } catch (error) {
      console.error('Error processing voice command:', error)
      toast.error(getLocalizedMessage('processError'))
    } finally {
      setIsProcessing(false)
    }
  }

  const processNavigationCommand = (text: string) => {
    const lowerText = text.toLowerCase()
    
    // Enhanced command patterns
    const commands = {
      // Invoice related
      invoice: {
        patterns: ['invoice', 'invoices', 'bill', 'billing', 'factura', 'facturas', 'facture', 'rechnung', '发票', 'fatura'],
        action: 'invoices',
        responses: {
          'en-US': 'Opening your invoices section. You can create and manage invoices here.',
          'es': 'Abriendo la sección de facturas. Puedes crear y gestionar facturas aquí.',
          'fr': 'Ouverture de votre section factures. Vous pouvez créer et gérer des factures ici.',
          'de': 'Öffne den Rechnungsbereich. Hier können Sie Rechnungen erstellen und verwalten.',
          'zh': '正在打开发票部分。您可以在这里创建和管理发票。'
        }
      },
      // Customer/Client related
      customer: {
        patterns: ['customer', 'customers', 'client', 'clients', 'cliente', 'clientes', 'kunde', 'kunden', '客户', '顾客'],
        action: 'customers',
        responses: {
          'en-US': 'Opening your customers section. You can manage client information here.',
          'es': 'Abriendo la sección de clientes. Puedes gestionar la información de clientes aquí.',
          'fr': 'Ouverture de votre section clients. Vous pouvez gérer les informations clients ici.',
          'de': 'Öffne den Kundenbereich. Hier können Sie Kundeninformationen verwalten.',
          'zh': '正在打开客户部分。您可以在这里管理客户信息。'
        }
      },
      // Project related
      project: {
        patterns: ['project', 'projects', 'proyecto', 'proyectos', 'projet', 'projets', 'projekt', 'projekte', '项目', '工程'],
        action: 'projects',
        responses: {
          'en-US': 'Opening your projects section. You can manage all your projects here.',
          'es': 'Abriendo la sección de proyectos. Puedes gestionar todos tus proyectos aquí.',
          'fr': 'Ouverture de votre section projets. Vous pouvez gérer tous vos projets ici.',
          'de': 'Öffne den Projektbereich. Hier können Sie alle Ihre Projekte verwalten.',
          'zh': '正在打开项目部分。您可以在这里管理所有项目。'
        }
      },
      // Appointment/Meeting related
      appointment: {
        patterns: ['appointment', 'appointments', 'meeting', 'meetings', 'schedule', 'cita', 'citas', 'reunión', 'reuniones', 'rendez-vous', 'réunion', 'termin', 'termine', 'besprechung', '预约', '会议', '约会'],
        action: 'appointments',
        responses: {
          'en-US': 'Opening your appointments section. You can schedule and manage meetings here.',
          'es': 'Abriendo la sección de citas. Puedes programar y gestionar reuniones aquí.',
          'fr': 'Ouverture de votre section rendez-vous. Vous pouvez programmer et gérer des réunions ici.',
          'de': 'Öffne den Terminbereich. Hier können Sie Besprechungen planen und verwalten.',
          'zh': '正在打开预约部分。您可以在这里安排和管理会议。'
        }
      },
      // Analytics/Dashboard related
      analytics: {
        patterns: ['analytics', 'dashboard', 'reports', 'report', 'stats', 'statistics', 'analíticas', 'análisis', 'informe', 'informes', 'analytique', 'rapport', 'analytik', 'berichte', 'statistik', '分析', '报告', '统计'],
        action: 'analytics',
        responses: {
          'en-US': 'Opening your analytics dashboard. You can view business insights and reports here.',
          'es': 'Abriendo tu panel de análisis. Puedes ver información empresarial e informes aquí.',
          'fr': 'Ouverture de votre tableau de bord analytique. Vous pouvez voir les informations commerciales et les rapports ici.',
          'de': 'Öffne das Analytics-Dashboard. Hier können Sie Geschäftseinblicke und Berichte anzeigen.',
          'zh': '正在打开分析仪表板。您可以在这里查看业务洞察和报告。'
        }
      },
      // Estimates related
      estimate: {
        patterns: ['estimate', 'estimates', 'quote', 'quotes', 'presupuesto', 'presupuestos', 'cotización', 'devis', 'kostenvoranschlag', 'angebot', '估算', '报价'],
        action: 'estimates',
        responses: {
          'en-US': 'Opening your estimates section. You can create and manage quotes here.',
          'es': 'Abriendo la sección de presupuestos. Puedes crear y gestionar cotizaciones aquí.',
          'fr': 'Ouverture de votre section devis. Vous pouvez créer et gérer des devis ici.',
          'de': 'Öffne den Kostenvoranschläge-Bereich. Hier können Sie Angebote erstellen und verwalten.',
          'zh': '正在打开估算部分。您可以在这里创建和管理报价。'
        }
      }
    }

    // Check each command
    for (const [commandKey, command] of Object.entries(commands)) {
      if (command.patterns.some(pattern => lowerText.includes(pattern))) {
        const response = command.responses[currentLanguage] || command.responses['en-US']
        return {
          action: command.action,
          response: response
        }
      }
    }

    return null
  }

  const generateAIResponse = async (text: string): Promise<string> => {
    const lowerText = text.toLowerCase()
    
    // Get localized responses based on current language
    const responses = getLocalizedResponses()
    
    for (const [key, response] of Object.entries(responses)) {
      if (lowerText.includes(key)) {
        return response
      }
    }
    
    // If no predefined response, try to be helpful
    if (lowerText.includes('help') || lowerText.includes('ajuda') || lowerText.includes('aide') || lowerText.includes('hilfe') || lowerText.includes('帮助')) {
      return getLocalizedMessage('helpResponse')
    }
    
    return getLocalizedMessage('defaultResponse', { text })
  }

  const getLocalizedResponses = () => {
    const responses: Record<string, Record<string, string>> = {
      'en-US': {
        'hello': 'Hello! How can I help you with your business today?',
        'hi': 'Hi! How can I help you with your business today?',
        'help': 'I can help you create invoices, schedule appointments, manage projects and much more. What would you like to do?',
        'invoice': 'I can help you create an invoice. Please tell me the client name and amount.',
        'appointment': 'I can schedule an appointment for you. What date and time would you prefer?',
        'project': 'I can help you manage your projects. Would you like to create a new project or view existing ones?',
        'clients': 'I can show your clients or help add a new client.',
        'report': 'I can generate reports about your sales, projects or clients.'
      },
      'de': {
        'hallo': 'Hallo! Wie kann ich Ihnen heute bei Ihrem Geschäft helfen?',
        'hi': 'Hi! Wie kann ich Ihnen heute bei Ihrem Geschäft helfen?',
        'hilfe': 'Ich kann Ihnen beim Erstellen von Rechnungen, Terminplanung, Projektverwaltung und vielem mehr helfen. Was möchten Sie tun?',
        'rechnung': 'Ich kann Ihnen beim Erstellen einer Rechnung helfen. Bitte nennen Sie mir den Kundennamen und den Betrag.',
        'termin': 'Ich kann einen Termin für Sie vereinbaren. Welches Datum und welche Uhrzeit bevorzugen Sie?',
        'projekt': 'Ich kann Ihnen bei der Verwaltung Ihrer Projekte helfen. Möchten Sie ein neues Projekt erstellen oder bestehende anzeigen?',
        'kunden': 'Ich kann Ihre Kunden anzeigen oder beim Hinzufügen eines neuen Kunden helfen.',
        'bericht': 'Ich kann Berichte über Ihre Verkäufe, Projekte oder Kunden erstellen.'
      },
      'fr': {
        'bonjour': 'Bonjour! Comment puis-je vous aider avec votre entreprise aujourd\'hui?',
        'salut': 'Salut! Comment puis-je vous aider avec votre entreprise aujourd\'hui?',
        'aide': 'Je peux vous aider à créer des factures, planifier des rendez-vous, gérer des projets et bien plus. Que souhaitez-vous faire?',
        'facture': 'Je peux vous aider à créer une facture. Veuillez me donner le nom du client et le montant.',
        'rendez-vous': 'Je peux programmer un rendez-vous pour vous. Quelle date et heure préférez-vous?',
        'projet': 'Je peux vous aider à gérer vos projets. Souhaitez-vous créer un nouveau projet ou voir les existants?',
        'clients': 'Je peux afficher vos clients ou aider à ajouter un nouveau client.',
        'rapport': 'Je peux générer des rapports sur vos ventes, projets ou clients.'
      },
      'es': {
        'hola': '¡Hola! ¿Cómo puedo ayudarte con tu negocio hoy?',
        'ayuda': 'Puedo ayudarte a crear facturas, programar citas, gestionar proyectos y mucho más. ¿Qué te gustaría hacer?',
        'factura': 'Puedo ayudarte a crear una factura. Por favor, dime el nombre del cliente y el monto.',
        'cita': 'Puedo programar una cita para ti. ¿Qué fecha y hora prefieres?',
        'proyecto': 'Puedo ayudarte a gestionar tus proyectos. ¿Te gustaría crear un nuevo proyecto o ver los existentes?',
        'clientes': 'Puedo mostrar tus clientes o ayudar a agregar un nuevo cliente.',
        'reporte': 'Puedo generar reportes sobre tus ventas, proyectos o clientes.'
      },
      'zh': {
        '你好': '你好！我今天可以如何帮助您处理业务？',
        '帮助': '我可以帮助您创建发票、安排约会、管理项目等等。您想做什么？',
        '发票': '我可以帮助您创建发票。请告诉我客户姓名和金额。',
        '约会': '我可以为您安排约会。您希望什么日期和时间？',
        '项目': '我可以帮助您管理项目。您想创建新项目还是查看现有项目？',
        '客户': '我可以显示您的客户或帮助添加新客户。',
        '报告': '我可以生成关于您的销售、项目或客户的报告。'
      },
    }
    
    return responses[currentLanguage] || responses['en-US']
  }

  const getLocalizedMessage = (key: string, params?: any) => {
    const messages: Record<string, Record<string, string>> = {
      'en-US': {
        listening: 'Listening... Speak now!',
        error: 'Speech recognition error',
        startError: 'Error starting speech recognition',
        processError: 'Error processing voice command',
        helpResponse: 'I can help you navigate to different sections of your business platform. Try saying commands like "show invoices", "open customers", "view projects", "schedule appointment", or "open analytics". You can also ask me questions about your business operations.',
        defaultResponse: `I heard you say: "${params?.text}". I'm here to help with your business needs. Try saying commands like "invoices", "customers", "projects", "appointments", or "analytics" to navigate to different sections.`
      },
      'de': {
        listening: 'Ich höre zu... Sprechen Sie jetzt!',
        error: 'Spracherkennungsfehler',
        startError: 'Fehler beim Starten der Spracherkennung',
        processError: 'Fehler beim Verarbeiten des Sprachbefehls',
        helpResponse: 'Ich kann Ihnen helfen, zu verschiedenen Bereichen Ihrer Geschäftsplattform zu navigieren. Versuchen Sie Befehle wie "Rechnungen zeigen", "Kunden öffnen", "Projekte anzeigen", "Termin planen" oder "Analytics öffnen". Sie können mir auch Fragen zu Ihren Geschäftsabläufen stellen.',
        defaultResponse: `Ich habe gehört, dass Sie sagten: "${params?.text}". Ich bin hier, um bei Ihren Geschäftsanforderungen zu helfen. Versuchen Sie Befehle wie "Rechnungen", "Kunden", "Projekte", "Termine" oder "Analytics", um zu verschiedenen Bereichen zu navigieren.`
      },
      'fr': {
        listening: 'J\'écoute... Parlez maintenant!',
        error: 'Erreur de reconnaissance vocale',
        startError: 'Erreur lors du démarrage de la reconnaissance vocale',
        processError: 'Erreur lors du traitement de la commande vocale',
        helpResponse: 'Je peux vous aider à naviguer vers différentes sections de votre plateforme commerciale. Essayez des commandes comme "montrer factures", "ouvrir clients", "voir projets", "programmer rendez-vous", ou "ouvrir analytique". Vous pouvez aussi me poser des questions sur vos opérations commerciales.',
        defaultResponse: `J'ai entendu que vous avez dit: "${params?.text}". Je suis ici pour vous aider avec vos besoins commerciaux. Essayez des commandes comme "factures", "clients", "projets", "rendez-vous", ou "analytique" pour naviguer vers différentes sections.`
      },
      'es': {
        listening: '¡Escuchando... Habla ahora!',
        error: 'Error de reconocimiento de voz',
        startError: 'Error al iniciar reconocimiento de voz',
        processError: 'Error al procesar comando de voz',
        helpResponse: 'Puedo ayudarte a navegar a diferentes secciones de tu plataforma de negocios. Prueba comandos como "mostrar facturas", "abrir clientes", "ver proyectos", "programar cita", o "abrir análisis". También puedes hacerme preguntas sobre tus operaciones comerciales.',
        defaultResponse: `Te escuché decir: "${params?.text}". Estoy aquí para ayudar con tus necesidades de negocio. Prueba comandos como "facturas", "clientes", "proyectos", "citas", o "análisis" para navegar a diferentes secciones.`
      },
      'zh': {
        listening: '正在听... 现在说话！',
        error: '语音识别错误',
        startError: '启动语音识别时出错',
        processError: '处理语音命令时出错',
        helpResponse: '我可以帮助您导航到业务平台的不同部分。尝试说"显示发票"、"打开客户"、"查看项目"、"安排预约"或"打开分析"等命令。您也可以询问我有关业务运营的问题。',
        defaultResponse: `我听到您说："${params?.text}"。我在这里帮助您处理业务需求。尝试说"发票"、"客户"、"项目"、"预约"或"分析"等命令来导航到不同部分。`
      },
    }
    
    return messages[currentLanguage]?.[key] || messages['en-US'][key] || key
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = getLanguageCode(currentLanguage)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const getLocalizedLabels = () => {
    const labels: Record<string, Record<string, string>> = {
      'en-US': {
        title: 'AI Voice Assistant',
        subtitle: 'Talk to your AI business assistant',
        voiceControls: 'Voice Controls',
        description: 'Click the microphone to start speaking, then click stop when finished',
        processing: 'Processing...',
        listening: 'Listening',
        start: 'Start Listening',
        stop: 'Stop',
        stopSpeaking: 'Stop Speaking',
        youSaid: 'You said:',
        aiResponse: 'AI Response:',
        voiceCommands: 'Voice Commands',
        general: 'General:',
        businessTasks: 'Business Tasks:'
      },
      'de': {
        title: 'KI Sprachassistent',
        subtitle: 'Sprechen Sie mit Ihrem KI-Geschäftsassistenten',
        voiceControls: 'Sprachsteuerung',
        description: 'Klicken Sie auf das Mikrofon, um zu sprechen, dann klicken Sie auf Stopp, wenn Sie fertig sind',
        processing: 'Verarbeitung...',
        listening: 'Hört zu',
        start: 'Zuhören starten',
        stop: 'Stopp',
        stopSpeaking: 'Sprechen stoppen',
        youSaid: 'Sie sagten:',
        aiResponse: 'KI-Antwort:',
        voiceCommands: 'Sprachbefehle',
        general: 'Allgemein:',
        businessTasks: 'Geschäftsaufgaben:'
      },
      'fr': {
        title: 'Assistant Vocal IA',
        subtitle: 'Parlez à votre assistant commercial IA',
        voiceControls: 'Contrôles Vocaux',
        description: 'Cliquez sur le microphone pour commencer à parler, puis cliquez sur arrêter quand vous avez terminé',
        processing: 'Traitement...',
        listening: 'Écoute',
        start: 'Commencer à Écouter',
        stop: 'Arrêter',
        stopSpeaking: 'Arrêter de Parler',
        youSaid: 'Vous avez dit:',
        aiResponse: 'Réponse IA:',
        voiceCommands: 'Commandes Vocales',
        general: 'Général:',
        businessTasks: 'Tâches Commerciales:'
      },
      'es': {
        title: 'Asistente de Voz IA',
        subtitle: 'Habla con tu asistente de negocios IA',
        voiceControls: 'Controles de Voz',
        description: 'Haz clic en el micrófono para empezar a hablar, luego haz clic en parar cuando termines',
        processing: 'Procesando...',
        listening: 'Escuchando',
        start: 'Empezar a Escuchar',
        stop: 'Parar',
        stopSpeaking: 'Parar de Hablar',
        youSaid: 'Dijiste:',
        aiResponse: 'Respuesta IA:',
        voiceCommands: 'Comandos de Voz',
        general: 'General:',
        businessTasks: 'Tareas de Negocio:'
      },
      'zh': {
        title: 'AI语音助手',
        subtitle: '与您的AI商务助手对话',
        voiceControls: '语音控制',
        description: '点击麦克风开始说话，完成后点击停止',
        processing: '处理中...',
        listening: '正在听',
        start: '开始听',
        stop: '停止',
        stopSpeaking: '停止说话',
        youSaid: '您说:',
        aiResponse: 'AI回复:',
        voiceCommands: '语音命令',
        general: '常规:',
        businessTasks: '业务任务:'
      },
    }
    
    return labels[currentLanguage] || labels['en-US']
  }

  const labels = getLocalizedLabels()

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{labels.title}</h1>
        <p className="text-muted-foreground mt-2">{labels.subtitle}</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            {labels.voiceControls}
          </CardTitle>
          <CardDescription>
            {labels.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center gap-4">
            <Button
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing}
              size="lg"
              variant={isListening ? "destructive" : "default"}
              className="min-w-32"
            >
              {isProcessing ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : isListening ? (
                <MicOff className="h-5 w-5 mr-2" />
              ) : (
                <Mic className="h-5 w-5 mr-2" />
              )}
              {isProcessing ? labels.processing : isListening ? labels.stop : labels.start}
            </Button>

            {isSpeaking && (
              <Button
                onClick={stopSpeaking}
                variant="outline"
                size="lg"
              >
                <VolumeX className="h-5 w-5 mr-2" />
                {labels.stopSpeaking}
              </Button>
            )}
          </div>

          {transcript && (
            <div className="space-y-2">
              <h3 className="font-semibold">{labels.youSaid}</h3>
              <p className="p-3 bg-muted rounded-lg">{transcript}</p>
            </div>
          )}

          {response && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{labels.aiResponse}</h3>
                {isSpeaking && <Volume2 className="h-4 w-4 animate-pulse text-blue-500" />}
              </div>
              <p className="p-3 bg-blue-50 rounded-lg border border-blue-200">{response}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{labels.voiceCommands}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">{labels.general}</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• "Hello/Hi/Hey/Hola/Bonjour/Hallo/你好"</li>
                <li>• "Help/Ayuda/Aide/Hilfe/帮助"</li>
                <li>• "Show dashboard/analytics"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">{labels.businessTasks}</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• "Open invoices/Show bills/Facturas"</li>
                <li>• "View customers/Show clients/Clientes"</li>
                <li>• "Open projects/Show proyectos/項目"</li>
                <li>• "Schedule appointment/Meeting/Cita"</li>
                <li>• "Show estimates/Quotes/Presupuestos"</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
