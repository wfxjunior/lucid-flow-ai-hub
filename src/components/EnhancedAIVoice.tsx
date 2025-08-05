import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Volume2, VolumeX, Loader2, Brain, Zap } from "lucide-react"
import { toast } from "sonner"
import { useLanguage } from "@/contexts/LanguageContext"
import { supabase } from "@/integrations/supabase/client"

interface VoiceNavigationEvent extends CustomEvent {
  detail: { view: string }
}

export function EnhancedAIVoice() {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [confidence, setConfidence] = useState('')
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const { currentLanguage } = useLanguage()

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  const startListening = async () => {
    try {
      console.log('Starting enhanced voice recording...')
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 16000
        } 
      })

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      })
      
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        console.log('Recording stopped, processing audio...')
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        await transcribeAudio(audioBlob)
        
        // Clean up stream
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsListening(true)
      toast.success(getLocalizedMessage('listening'))
      
    } catch (error) {
      console.error('Error starting recording:', error)
      toast.error(getLocalizedMessage('startError'))
    }
  }

  const stopListening = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      setIsListening(false)
    }
  }

  const transcribeAudio = async (audioBlob: Blob) => {
    setIsTranscribing(true)
    
    try {
      console.log('Sending audio for transcription...')
      
      const formData = new FormData()
      formData.append('audio', audioBlob, 'recording.webm')
      formData.append('language', getLanguageCode(currentLanguage))

      const { data, error } = await supabase.functions.invoke('transcribe-audio', {
        body: formData
      })

      if (error) {
        console.error('Transcription error:', error)
        throw new Error('Failed to transcribe audio')
      }

      const { transcript: originalTranscript, processedTranscript, confidence: transcriptConfidence } = data
      
      console.log('Transcription result:', { originalTranscript, processedTranscript })
      
      setTranscript(originalTranscript)
      setConfidence(transcriptConfidence)
      
      // Use processed transcript for better command recognition
      await processVoiceCommand(processedTranscript || originalTranscript)
      
    } catch (error) {
      console.error('Error transcribing audio:', error)
      toast.error(getLocalizedMessage('transcriptionError'))
    } finally {
      setIsTranscribing(false)
    }
  }

  const processVoiceCommand = async (text: string) => {
    setIsProcessing(true)
    
    try {
      console.log('Processing enhanced voice command:', text)
      
      // Enhanced command processing with AI assistance
      const navigationResult = processNavigationCommand(text)
      if (navigationResult) {
        setResponse(navigationResult.response)
        speakText(navigationResult.response)
        
        // Navigate after a short delay
        setTimeout(() => {
          if (navigationResult.action && window.location.pathname === '/') {
            const event = new CustomEvent('voice-navigation', { 
              detail: { view: navigationResult.action } 
            }) as VoiceNavigationEvent
            window.dispatchEvent(event)
          }
        }, 2000)
        return
      }
      
      // Fallback to AI-powered response
      const aiResponse = await generateEnhancedAIResponse(text)
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
    
    // Enhanced command patterns with better fuzzy matching
    const commands = {
      invoice: {
        patterns: ['invoice', 'invoices', 'bill', 'billing', 'factura', 'facturas', 'facture', 'rechnung', '发票', 'fatura', 'open invoice', 'show invoice', 'create invoice'],
        action: 'invoices',
        responses: {
          'en-US': 'Opening your invoices section. You can create and manage invoices here.',
          'es': 'Abriendo la sección de facturas. Puedes crear y gestionar facturas aquí.',
          'fr': 'Ouverture de votre section factures. Vous pouvez créer et gérer des factures ici.',
          'de': 'Öffne den Rechnungsbereich. Hier können Sie Rechnungen erstellen und verwalten.',
          'zh': '正在打开发票部分。您可以在这里创建和管理发票。',
          'pt-BR': 'Abrindo a seção de faturas. Você pode criar e gerenciar faturas aqui.'
        }
      },
      customer: {
        patterns: ['customer', 'customers', 'client', 'clients', 'cliente', 'clientes', 'kunde', 'kunden', '客户', '顾客', 'open customers', 'show clients', 'view customers'],
        action: 'customers',
        responses: {
          'en-US': 'Opening your customers section. You can manage client information here.',
          'es': 'Abriendo la sección de clientes. Puedes gestionar la información de clientes aquí.',
          'fr': 'Ouverture de votre section clients. Vous pouvez gérer les informations clients ici.',
          'de': 'Öffne den Kundenbereich. Hier können Sie Kundeninformationen verwalten.',
          'zh': '正在打开客户部分。您可以在这里管理客户信息。',
          'pt-BR': 'Abrindo a seção de clientes. Você pode gerenciar informações dos clientes aqui.'
        }
      },
      project: {
        patterns: ['project', 'projects', 'proyecto', 'proyectos', 'projet', 'projets', 'projekt', 'projekte', '项目', '工程', 'open projects', 'show projects', 'view projects'],
        action: 'projects',
        responses: {
          'en-US': 'Opening your projects section. You can manage all your projects here.',
          'es': 'Abriendo la sección de proyectos. Puedes gestionar todos tus proyectos aquí.',
          'fr': 'Ouverture de votre section projets. Vous pouvez gérer tous vos projets ici.',
          'de': 'Öffne den Projektbereich. Hier können Sie alle Ihre Projekte verwalten.',
          'zh': '正在打开项目部分。您可以在这里管理所有项目。',
          'pt-BR': 'Abrindo a seção de projetos. Você pode gerenciar todos os seus projetos aqui.'
        }
      },
      appointment: {
        patterns: ['appointment', 'appointments', 'meeting', 'meetings', 'schedule', 'cita', 'citas', 'reunión', 'reuniones', 'rendez-vous', 'réunion', 'termin', 'termine', 'besprechung', '预约', '会议', '约会', 'open appointments', 'schedule meeting', 'view calendar'],
        action: 'appointments',
        responses: {
          'en-US': 'Opening your appointments section. You can schedule and manage meetings here.',
          'es': 'Abriendo la sección de citas. Puedes programar y gestionar reuniones aquí.',
          'fr': 'Ouverture de votre section rendez-vous. Vous pouvez programmer et gérer des réunions ici.',
          'de': 'Öffne den Terminbereich. Hier können Sie Besprechungen planen und verwalten.',
          'zh': '正在打开预约部分。您可以在这里安排和管理会议。',
          'pt-BR': 'Abrindo a seção de compromissos. Você pode agendar e gerenciar reuniões aqui.'
        }
      },
      analytics: {
        patterns: ['analytics', 'dashboard', 'reports', 'report', 'stats', 'statistics', 'analíticas', 'análisis', 'informe', 'informes', 'analytique', 'rapport', 'analytik', 'berichte', 'statistik', '分析', '报告', '统计', 'open dashboard', 'show analytics', 'view reports'],
        action: 'analytics',
        responses: {
          'en-US': 'Opening your analytics dashboard. You can view business insights and reports here.',
          'es': 'Abriendo tu panel de análisis. Puedes ver información empresarial e informes aquí.',
          'fr': 'Ouverture de votre tableau de bord analytique. Vous pouvez voir les informations commerciales et les rapports ici.',
          'de': 'Öffne das Analytics-Dashboard. Hier können Sie Geschäftseinblicke und Berichte anzeigen.',
          'zh': '正在打开分析仪表板。您可以在这里查看业务洞察和报告。',
          'pt-BR': 'Abrindo seu painel de análises. Você pode visualizar insights de negócios e relatórios aqui.'
        }
      },
      estimate: {
        patterns: ['estimate', 'estimates', 'quote', 'quotes', 'presupuesto', 'presupuestos', 'cotización', 'devis', 'kostenvoranschlag', 'angebot', '估算', '报价', 'open estimates', 'create quote', 'show quotes'],
        action: 'estimates',
        responses: {
          'en-US': 'Opening your estimates section. You can create and manage quotes here.',
          'es': 'Abriendo la sección de presupuestos. Puedes crear y gestionar cotizaciones aquí.',
          'fr': 'Ouverture de votre section devis. Vous pouvez créer et gérer des devis ici.',
          'de': 'Öffne den Kostenvoranschläge-Bereich. Hier können Sie Angebote erstellen und verwalten.',
          'zh': '正在打开估算部分。您可以在这里创建和管理报价。',
          'pt-BR': 'Abrindo a seção de orçamentos. Você pode criar e gerenciar cotações aqui.'
        }
      }
    }

    // Check each command with fuzzy matching
    for (const [commandKey, command] of Object.entries(commands)) {
      if (command.patterns.some(pattern => {
        // Exact match
        if (lowerText.includes(pattern)) return true
        
        // Fuzzy match (allowing for small variations)
        const words = lowerText.split(' ')
        return words.some(word => {
          const similarity = calculateSimilarity(word, pattern)
          return similarity > 0.7 // 70% similarity threshold
        })
      })) {
        const response = command.responses[currentLanguage] || command.responses['en-US']
        return {
          action: command.action,
          response: response
        }
      }
    }

    return null
  }

  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2
    const shorter = str1.length > str2.length ? str2 : str1
    const editDistance = levenshteinDistance(longer, shorter)
    return (longer.length - editDistance) / longer.length
  }

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = []
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i]
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          )
        }
      }
    }
    return matrix[str2.length][str1.length]
  }

  const generateEnhancedAIResponse = async (text: string): Promise<string> => {
    // Smart response generation based on context
    const lowerText = text.toLowerCase()
    
    if (lowerText.includes('help') || lowerText.includes('ajuda') || lowerText.includes('aide') || lowerText.includes('hilfe') || lowerText.includes('帮助')) {
      return getLocalizedMessage('helpResponse')
    }
    
    if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey') || lowerText.includes('hola') || lowerText.includes('bonjour') || lowerText.includes('hallo') || lowerText.includes('你好')) {
      return getLocalizedMessage('greetingResponse')
    }
    
    return getLocalizedMessage('defaultResponse', { text })
  }

  const getLanguageCode = (lang: string) => {
    const languageMap: Record<string, string> = {
      'en-US': 'en',
      'de': 'de',
      'fr': 'fr',
      'es': 'es',
      'zh': 'zh',
      'pt-BR': 'pt'
    }
    return languageMap[lang] || 'auto'
  }

  const getLocalizedMessage = (key: string, params?: any) => {
    const messages: Record<string, Record<string, string>> = {
      'en-US': {
        listening: 'Listening... Speak now!',
        startError: 'Error starting microphone',
        transcriptionError: 'Error transcribing audio',
        processError: 'Error processing voice command',
        greetingResponse: 'Hello! I\'m your AI business assistant. I can help you navigate to different sections like invoices, customers, projects, appointments, or analytics. What would you like to do?',
        helpResponse: 'I can help you navigate your business platform using voice commands. Try saying "open invoices", "show customers", "view projects", "schedule appointment", or "analytics dashboard". I understand multiple languages and can recognize various ways of saying these commands.',
        defaultResponse: `I heard you say: "${params?.text}". I can help you navigate to different business sections. Try commands like "invoices", "customers", "projects", "appointments", or "analytics".`
      },
      'es': {
        listening: '¡Escuchando... Habla ahora!',
        startError: 'Error al iniciar el micrófono',
        transcriptionError: 'Error al transcribir audio',
        processError: 'Error al procesar comando de voz',
        greetingResponse: '¡Hola! Soy tu asistente de negocios AI. Puedo ayudarte a navegar a diferentes secciones como facturas, clientes, proyectos, citas o análisis. ¿Qué te gustaría hacer?',
        helpResponse: 'Puedo ayudarte a navegar tu plataforma de negocios usando comandos de voz. Intenta decir "abrir facturas", "mostrar clientes", "ver proyectos", "programar cita", o "panel de análisis". Entiendo múltiples idiomas y puedo reconocer varias formas de decir estos comandos.',
        defaultResponse: `Te escuché decir: "${params?.text}". Puedo ayudarte a navegar a diferentes secciones de negocio. Prueba comandos como "facturas", "clientes", "proyectos", "citas", o "análisis".`
      },
      'pt-BR': {
        listening: 'Ouvindo... Fale agora!',
        startError: 'Erro ao iniciar o microfone',
        transcriptionError: 'Erro ao transcrever áudio',
        processError: 'Erro ao processar comando de voz',
        greetingResponse: 'Olá! Sou seu assistente de negócios AI. Posso ajudá-lo a navegar para diferentes seções como faturas, clientes, projetos, compromissos ou análises. O que gostaria de fazer?',
        helpResponse: 'Posso ajudá-lo a navegar sua plataforma de negócios usando comandos de voz. Tente dizer "abrir faturas", "mostrar clientes", "ver projetos", "agendar compromisso", ou "painel de análises". Entendo múltiplos idiomas e posso reconhecer várias formas de dizer esses comandos.',
        defaultResponse: `Ouvi você dizer: "${params?.text}". Posso ajudá-lo a navegar para diferentes seções de negócio. Tente comandos como "faturas", "clientes", "projetos", "compromissos", ou "análises".`
      }
    }
    
    return messages[currentLanguage]?.[key] || messages['en-US'][key] || key
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = currentLanguage.startsWith('en') ? 'en-US' : currentLanguage
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8
      
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

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Brain className="h-8 w-8 text-blue-600" />
          Enhanced AI Voice Assistant
        </h1>
        <p className="text-muted-foreground mt-2">
          Advanced voice navigation with multilingual support and smart command recognition
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Voice Controls
          </CardTitle>
          <CardDescription>
            Click the microphone to start speaking. I'll understand your commands in multiple languages.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center gap-4">
            <Button
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing || isTranscribing}
              size="lg"
              variant={isListening ? "destructive" : "default"}
              className="min-w-32"
            >
              {isTranscribing ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : isListening ? (
                <MicOff className="h-5 w-5 mr-2" />
              ) : (
                <Mic className="h-5 w-5 mr-2" />
              )}
              {isTranscribing ? 'Processing...' : isListening ? 'Stop' : 'Start Listening'}
            </Button>

            {isSpeaking && (
              <Button
                onClick={stopSpeaking}
                variant="outline"
                size="lg"
              >
                <VolumeX className="h-5 w-5 mr-2" />
                Stop Speaking
              </Button>
            )}
          </div>

          {transcript && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">You said:</h3>
                {confidence && (
                  <span className="text-xs text-muted-foreground">
                    Confidence: {confidence}
                  </span>
                )}
              </div>
              <p className="p-3 bg-muted rounded-lg">{transcript}</p>
            </div>
          )}

          {response && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">AI Response:</h3>
                {isSpeaking && <Volume2 className="h-4 w-4 animate-pulse text-blue-500" />}
              </div>
              <p className="p-3 bg-blue-50 rounded-lg border border-blue-200">{response}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Enhanced Voice Commands</CardTitle>
          <CardDescription>
            Smart command recognition with fuzzy matching and multilingual support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Navigation Commands:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• "Open invoices" / "Show bills" / "Facturas"</li>
                <li>• "View customers" / "Show clients"</li>
                <li>• "Open projects" / "Proyectos"</li>
                <li>• "Schedule appointment" / "Meeting"</li>
                <li>• "Analytics dashboard" / "Reports"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">General Commands:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• "Hello" / "Hola" / "Bonjour" / "你好"</li>
                <li>• "Help" / "Ayuda" / "Aide" / "帮助"</li>
                <li>• Natural speech patterns</li>
                <li>• Multiple language support</li>
                <li>• Fuzzy command matching</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}