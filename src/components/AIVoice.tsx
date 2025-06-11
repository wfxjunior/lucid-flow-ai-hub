
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Volume2, Zap } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function AIVoice() {
  const [isListening, setIsListening] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [transcript, setTranscript] = useState("")
  const { toast } = useToast()

  const handleVoiceToggle = () => {
    if (!isListening) {
      // Start listening
      setIsListening(true)
      setTranscript("Listening...")
      toast({
        title: "Voice Recognition Started",
        description: "Start speaking your command..."
      })
      
      // Simulate listening for 3 seconds
      setTimeout(() => {
        setIsListening(false)
        setTranscript("Command received: 'Show my customers'")
        toast({
          title: "Command Processed",
          description: "Voice command has been processed successfully!"
        })
      }, 3000)
    } else {
      // Stop listening
      setIsListening(false)
      setTranscript("")
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2">
          <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
          AI Voice Assistant
        </h1>
        <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Use voice commands to manage your business operations hands-free
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Voice Commands</CardTitle>
          <CardDescription>
            Click to start listening or speak your commands
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="flex justify-center">
            <Button
              size="lg"
              variant={isListening ? "destructive" : "default"}
              onClick={handleVoiceToggle}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full"
            >
              {isListening ? (
                <MicOff className="h-8 w-8 sm:h-12 sm:w-12" />
              ) : (
                <Mic className="h-8 w-8 sm:h-12 sm:w-12" />
              )}
            </Button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {isListening ? "Listening..." : "Click to start voice recognition"}
            </p>
            {transcript && (
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm font-medium">{transcript}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm sm:text-base">Available Commands:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs sm:text-sm text-muted-foreground">"Create new invoice"</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs sm:text-sm text-muted-foreground">"Show my customers"</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs sm:text-sm text-muted-foreground">"Open analytics"</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs sm:text-sm text-muted-foreground">"What's my revenue this month?"</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Voice Response</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={!transcript || isListening}
              >
                <Volume2 className="h-4 w-4 mr-2" />
                {isPlaying ? "Stop" : "Play Response"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
