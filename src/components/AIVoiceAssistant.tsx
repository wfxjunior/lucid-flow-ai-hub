
import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Volume2, VolumeX, Loader2 } from "lucide-react"
import { toast } from "sonner"

export function AIVoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const recognitionRef = useRef<any>(null)

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
      recognition.lang = 'pt-BR' // Português brasileiro

      recognition.onstart = () => {
        setIsListening(true)
        toast.success('Ouvindo... Fale agora!')
      }

      recognition.onresult = (event: any) => {
        const transcriptText = event.results[0][0].transcript
        setTranscript(transcriptText)
        processVoiceCommand(transcriptText)
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        toast.error('Erro no reconhecimento de voz')
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } catch (error) {
      console.error('Error starting speech recognition:', error)
      toast.error('Erro ao iniciar reconhecimento de voz')
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
      toast.error('Erro ao processar comando de voz')
    } finally {
      setIsProcessing(false)
    }
  }

  const generateAIResponse = async (text: string): Promise<string> => {
    // Respostas simples baseadas em palavras-chave
    const lowerText = text.toLowerCase()
    
    const responses = {
      'olá': 'Olá! Como posso ajudar você com seus negócios hoje?',
      'oi': 'Oi! Como posso ajudar você com seus negócios hoje?',
      'ajuda': 'Posso ajudar você a criar faturas, agendar compromissos, gerenciar projetos e muito mais. O que você gostaria de fazer?',
      'fatura': 'Posso ajudar você a criar uma fatura. Por favor, me diga o nome do cliente e o valor.',
      'invoice': 'Posso ajudar você a criar uma fatura. Por favor, me diga o nome do cliente e o valor.',
      'compromisso': 'Posso agendar um compromisso para você. Que data e horário você prefere?',
      'projeto': 'Posso ajudar você a gerenciar seus projetos. Gostaria de criar um novo projeto ou ver os existentes?',
      'clientes': 'Posso mostrar seus clientes ou ajudar a adicionar um novo cliente.',
      'relatório': 'Posso gerar relatórios sobre suas vendas, projetos ou clientes.'
    }
    
    for (const [key, response] of Object.entries(responses)) {
      if (lowerText.includes(key)) {
        return response
      }
    }
    
    return `Ouvi você dizer: "${text}". Estou aqui para ajudar com suas necessidades de negócios. Você pode me perguntar sobre faturas, compromissos, projetos ou outras tarefas comerciais.`
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'pt-BR'
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
        <h1 className="text-3xl font-bold">Assistente de Voz IA</h1>
        <p className="text-muted-foreground mt-2">Fale com seu assistente de negócios IA</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Controles de Voz
          </CardTitle>
          <CardDescription>
            Clique no microfone para começar a falar, depois clique em parar quando terminar
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
              {isProcessing ? 'Processando...' : isListening ? 'Parar' : 'Começar a Ouvir'}
            </Button>

            {isSpeaking && (
              <Button
                onClick={stopSpeaking}
                variant="outline"
                size="lg"
              >
                <VolumeX className="h-5 w-5 mr-2" />
                Parar de Falar
              </Button>
            )}
          </div>

          {transcript && (
            <div className="space-y-2">
              <h3 className="font-semibold">Você disse:</h3>
              <p className="p-3 bg-muted rounded-lg">{transcript}</p>
            </div>
          )}

          {response && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Resposta da IA:</h3>
                {isSpeaking && <Volume2 className="h-4 w-4 animate-pulse text-blue-500" />}
              </div>
              <p className="p-3 bg-blue-50 rounded-lg border border-blue-200">{response}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Comandos de Voz</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Geral:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• "Olá" - Saudação</li>
                <li>• "Ajuda" - Obter assistência</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Tarefas de Negócio:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• "Fatura" - Criar fatura</li>
                <li>• "Compromisso" - Agendar reunião</li>
                <li>• "Projeto" - Gerenciar projetos</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
