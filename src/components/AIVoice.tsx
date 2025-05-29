
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Volume2 } from "lucide-react"
import { useState } from "react"

export function AIVoice() {
  const [isListening, setIsListening] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">AI Voice Assistant</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Use voice commands to manage your business operations hands-free
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Voice Commands</CardTitle>
          <CardDescription>
            Click to start listening or speak your commands
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Button
              size="lg"
              variant={isListening ? "destructive" : "default"}
              onClick={() => setIsListening(!isListening)}
              className="w-32 h-32 rounded-full"
            >
              {isListening ? (
                <MicOff className="h-12 w-12" />
              ) : (
                <Mic className="h-12 w-12" />
              )}
            </Button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {isListening ? "Listening..." : "Click to start voice recognition"}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Available Commands:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• "Create new invoice"</li>
              <li>• "Show my customers"</li>
              <li>• "Open analytics"</li>
              <li>• "What's my revenue this month?"</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
