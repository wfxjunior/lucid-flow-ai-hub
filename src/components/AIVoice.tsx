
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Volume2, Brain } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useToast } from "@/components/ui/use-toast"

export function AIVoice() {
  const [isListening, setIsListening] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [responses, setResponses] = useState<Array<{type: 'user' | 'ai', message: string}>>([
    { type: 'ai', message: 'Hello! I\'m your AI voice assistant. I can help you with business operations, scheduling, invoicing, and more. Try saying "Create new invoice" or "Show my customers".' }
  ])
  const { toast } = useToast()
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check if speech recognition is available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onstart = () => {
        setIsListening(true)
        setTranscript("")
      }

      recognitionRef.current.onresult = (event: any) => {
        const result = event.results[0][0].transcript
        setTranscript(result)
        handleVoiceCommand(result)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
        toast({
          title: "Voice Recognition Error",
          description: "Please check your microphone permissions and try again.",
          variant: "destructive"
        })
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error('Error starting speech recognition:', error)
        toast({
          title: "Error",
          description: "Could not start voice recognition. Please check your microphone.",
          variant: "destructive"
        })
      }
    } else {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive"
      })
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command received:', command)
    
    // Add user message to responses
    setResponses(prev => [...prev, { type: 'user', message: command }])

    // Process the command
    let response = "I heard your command. "
    
    const lowerCommand = command.toLowerCase()
    
    if (lowerCommand.includes('invoice')) {
      response += "I'll help you create a new invoice. You can navigate to the Invoice Creator from the sidebar."
    } else if (lowerCommand.includes('customer') || lowerCommand.includes('client')) {
      response += "I'll show you the customer management section. You can find it in the sidebar under Customer Management."
    } else if (lowerCommand.includes('schedule') || lowerCommand.includes('appointment')) {
      response += "I'll help you with scheduling. You can access the Smart Schedule feature from the sidebar."
    } else if (lowerCommand.includes('analytics') || lowerCommand.includes('report')) {
      response += "I'll show you the analytics dashboard where you can view your business reports and insights."
    } else if (lowerCommand.includes('revenue') || lowerCommand.includes('earnings')) {
      response += "Let me show you the revenue analytics. You can find detailed financial reports in the Analytics section."
    } else {
      response += "I understand you want help with: " + command + ". I can assist you with invoicing, scheduling, customer management, and analytics. Please try a more specific command."
    }

    // Add AI response
    setTimeout(() => {
      setResponses(prev => [...prev, { type: 'ai', message: response }])
      
      // Text-to-speech response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(response)
        utterance.onstart = () => setIsPlaying(true)
        utterance.onend = () => setIsPlaying(false)
        speechSynthesis.speak(utterance)
      }
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
          <Brain className="h-8 w-8 text-blue-600" />
          AI Voice Assistant
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Use voice commands to manage your business operations hands-free. Click the microphone to start.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Voice Commands</CardTitle>
          <CardDescription>
            Click to start listening or speak your commands naturally
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Voice Command Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              variant={isListening ? "destructive" : "default"}
              onClick={isListening ? stopListening : startListening}
              className="w-32 h-32 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isListening ? (
                <MicOff className="h-12 w-12" />
              ) : (
                <Mic className="h-12 w-12" />
              )}
            </Button>
          </div>

          {/* Status Display */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {isListening ? "Listening... Speak now" : "Click to start voice recognition"}
            </p>
            {isPlaying && (
              <div className="flex items-center justify-center gap-2">
                <Volume2 className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-600">Playing response...</span>
              </div>
            )}
            {transcript && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">Last heard: "{transcript}"</p>
              </div>
            )}
          </div>

          {/* Available Commands */}
          <div className="space-y-4">
            <h3 className="font-semibold">Available Commands:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• "Create new invoice"</li>
              <li>• "Show my customers"</li>
              <li>• "Open analytics"</li>
              <li>• "Schedule an appointment"</li>
              <li>• "What's my revenue this month?"</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Conversation History */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {responses.map((response, index) => (
              <div key={index} className={`flex ${response.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  response.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{response.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
