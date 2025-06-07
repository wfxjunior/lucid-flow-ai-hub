
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bot, Mic, X, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function CharlieAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)
  const [message, setMessage] = useState("")
  const [isListening, setIsListening] = useState(false)

  // Blinking animation every 6-8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 300)
    }, Math.random() * 2000 + 6000) // 6-8 seconds

    return () => clearInterval(interval)
  }, [])

  const handleVoiceCommand = () => {
    setIsListening(!isListening)
    // Here you would integrate with voice recognition API
    console.log("Voice command toggle:", !isListening)
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message)
      setMessage("")
      // Here you would integrate with AI assistant API
    }
  }

  return (
    <>
      {/* Floating Charlie Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative group">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-300 ${
              isBlinking ? 'scale-95' : 'scale-100'
            } hover:scale-105`}
          >
            <Bot className="h-8 w-8" />
          </Button>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
              Need help? I'm Charlie – your AI assistant!
            </div>
          </div>
        </div>
      </div>

      {/* Charlie Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)]">
          <Card className="shadow-2xl border-2 border-blue-200">
            <CardHeader className="bg-blue-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-6 w-6" />
                  <div>
                    <CardTitle className="text-lg">Charlie AI Assistant</CardTitle>
                    <p className="text-blue-100 text-sm">Online • Multilingual</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-blue-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-4">
              {/* Chat Messages Area */}
              <div className="h-32 bg-gray-50 rounded-lg p-3 mb-4 overflow-y-auto">
                <div className="flex items-start gap-2">
                  <Bot className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <p className="text-sm text-gray-700">
                      Hi! I'm Charlie, your AI assistant. I can help you with scheduling, invoicing, and more. 
                      Try saying "Schedule a meeting" or "Create an invoice"!
                    </p>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type or speak your request..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button
                  onClick={handleVoiceCommand}
                  variant={isListening ? "destructive" : "secondary"}
                  className="w-full"
                  size="sm"
                >
                  <Mic className={`h-4 w-4 mr-2 ${isListening ? 'animate-pulse' : ''}`} />
                  {isListening ? 'Stop Listening' : 'Voice Command'}
                </Button>
              </div>

              {/* Language Support Info */}
              <div className="mt-3 text-xs text-gray-500 text-center">
                Supports: English, Español, Português, Deutsch, 中文, Français
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
