
import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Volume2, VolumeX, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { supabase } from '@/integrations/supabase/client'

export function AIVoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        await processAudio(audioBlob)
      }

      mediaRecorder.start()
      setIsListening(true)
      toast.success('Listening... Speak now!')
    } catch (error) {
      console.error('Error accessing microphone:', error)
      toast.error('Could not access microphone')
    }
  }

  const stopListening = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop()
      setIsListening(false)
      setIsProcessing(true)
      
      // Stop all tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
    }
  }

  const processAudio = async (audioBlob: Blob) => {
    try {
      const formData = new FormData()
      formData.append('audio', audioBlob, 'recording.wav')

      const { data, error } = await supabase.functions.invoke('transcribe-audio', {
        body: formData
      })

      if (error) throw error

      const transcribedText = data.transcript || 'No speech detected'
      setTranscript(transcribedText)
      
      // Generate AI response
      const aiResponse = await generateAIResponse(transcribedText)
      setResponse(aiResponse)
      
      // Speak the response
      speakText(aiResponse)
      
    } catch (error) {
      console.error('Error processing audio:', error)
      toast.error('Failed to process audio')
    } finally {
      setIsProcessing(false)
    }
  }

  const generateAIResponse = async (text: string): Promise<string> => {
    // Simple AI response logic - in production, you'd use a proper AI service
    const responses = {
      'hello': 'Hello! How can I help you with your business today?',
      'help': 'I can assist you with creating invoices, managing appointments, tracking projects, and more. What would you like to do?',
      'invoice': 'I can help you create an invoice. Please tell me the client name and amount.',
      'appointment': 'I can schedule an appointment for you. What date and time would you prefer?',
      'project': 'I can help you manage your projects. Would you like to create a new project or view existing ones?'
    }
    
    const lowerText = text.toLowerCase()
    for (const [key, response] of Object.entries(responses)) {
      if (lowerText.includes(key)) {
        return response
      }
    }
    
    return `I heard you say: "${text}". I'm here to help with your business needs. You can ask me about invoices, appointments, projects, or other business tasks.`
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
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
        <h1 className="text-3xl font-bold">AI Voice Assistant</h1>
        <p className="text-muted-foreground mt-2">Speak with your AI business assistant</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Voice Controls
          </CardTitle>
          <CardDescription>
            Click the microphone to start speaking, then click stop when you're done
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
              {isProcessing ? 'Processing...' : isListening ? 'Stop' : 'Start Listening'}
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
              <h3 className="font-semibold">You said:</h3>
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
          <CardTitle>Voice Commands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">General:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• "Hello" - Greeting</li>
                <li>• "Help" - Get assistance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Business Tasks:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• "Invoice" - Create invoice</li>
                <li>• "Appointment" - Schedule meeting</li>
                <li>• "Project" - Manage projects</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
