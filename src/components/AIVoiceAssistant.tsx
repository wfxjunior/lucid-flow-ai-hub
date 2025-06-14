
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

  const generateAIResponse = async (text: string): Promise<string> => {
    const lowerText = text.toLowerCase()
    
    // Get localized responses based on current language
    const responses = getLocalizedResponses()
    
    for (const [key, response] of Object.entries(responses)) {
      if (lowerText.includes(key)) {
        return response
      }
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
      'pt-BR': {
        'olá': 'Olá! Como posso ajudar você com seus negócios hoje?',
        'oi': 'Oi! Como posso ajudar você com seus negócios hoje?',
        'ajuda': 'Posso ajudar você a criar faturas, agendar compromissos, gerenciar projetos e muito mais. O que você gostaria de fazer?',
        'fatura': 'Posso ajudar você a criar uma fatura. Por favor, me diga o nome do cliente e o valor.',
        'compromisso': 'Posso agendar um compromisso para você. Que data e horário você prefere?',
        'projeto': 'Posso ajudar você a gerenciar seus projetos. Gostaria de criar um novo projeto ou ver os existentes?',
        'clientes': 'Posso mostrar seus clientes ou ajudar a adicionar um novo cliente.',
        'relatório': 'Posso gerar relatórios sobre suas vendas, projetos ou clientes.'
      }
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
        defaultResponse: `I heard you say: "${params?.text}". I'm here to help with your business needs. You can ask me about invoices, appointments, projects or other business tasks.`
      },
      'de': {
        listening: 'Ich höre zu... Sprechen Sie jetzt!',
        error: 'Spracherkennungsfehler',
        startError: 'Fehler beim Starten der Spracherkennung',
        processError: 'Fehler beim Verarbeiten des Sprachbefehls',
        defaultResponse: `Ich habe gehört, dass Sie sagten: "${params?.text}". Ich bin hier, um bei Ihren Geschäftsanforderungen zu helfen. Sie können mich nach Rechnungen, Terminen, Projekten oder anderen Geschäftsaufgaben fragen.`
      },
      'fr': {
        listening: 'J\'écoute... Parlez maintenant!',
        error: 'Erreur de reconnaissance vocale',
        startError: 'Erreur lors du démarrage de la reconnaissance vocale',
        processError: 'Erreur lors du traitement de la commande vocale',
        defaultResponse: `J'ai entendu que vous avez dit: "${params?.text}". Je suis ici pour vous aider avec vos besoins commerciaux. Vous pouvez me demander des factures, des rendez-vous, des projets ou d'autres tâches commerciales.`
      },
      'es': {
        listening: '¡Escuchando... Habla ahora!',
        error: 'Error de reconocimiento de voz',
        startError: 'Error al iniciar reconocimiento de voz',
        processError: 'Error al procesar comando de voz',
        defaultResponse: `Te escuché decir: "${params?.text}". Estoy aquí para ayudar con tus necesidades de negocio. Puedes preguntarme sobre facturas, citas, proyectos u otras tareas comerciales.`
      },
      'zh': {
        listening: '正在听... 现在说话！',
        error: '语音识别错误',
        startError: '启动语音识别时出错',
        processError: '处理语音命令时出错',
        defaultResponse: `我听到您说："${params?.text}"。我在这里帮助您处理业务需求。您可以询问我有关发票、约会、项目或其他业务任务的信息。`
      },
      'pt-BR': {
        listening: 'Ouvindo... Fale agora!',
        error: 'Erro no reconhecimento de voz',
        startError: 'Erro ao iniciar reconhecimento de voz',
        processError: 'Erro ao processar comando de voz',
        defaultResponse: `Ouvi você dizer: "${params?.text}". Estou aqui para ajudar com suas necessidades de negócios. Você pode me perguntar sobre faturas, compromissos, projetos ou outras tarefas comerciais.`
      }
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
      'pt-BR': {
        title: 'Assistente de Voz IA',
        subtitle: 'Fale com seu assistente de negócios IA',
        voiceControls: 'Controles de Voz',
        description: 'Clique no microfone para começar a falar, depois clique em parar quando terminar',
        processing: 'Processando...',
        listening: 'Ouvindo',
        start: 'Começar a Ouvir',
        stop: 'Parar',
        stopSpeaking: 'Parar de Falar',
        youSaid: 'Você disse:',
        aiResponse: 'Resposta da IA:',
        voiceCommands: 'Comandos de Voz',
        general: 'Geral:',
        businessTasks: 'Tarefas de Negócio:'
      }
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
                <li>• "Hello/Hola/Bonjour/Hallo/你好/Olá"</li>
                <li>• "Help/Ayuda/Aide/Hilfe/帮助/Ajuda"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">{labels.businessTasks}</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• "Invoice/Factura/Facture/Rechnung/发票/Fatura"</li>
                <li>• "Appointment/Cita/Rendez-vous/Termin/约会/Compromisso"</li>
                <li>• "Project/Proyecto/Projet/Projekt/项目/Projeto"</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
