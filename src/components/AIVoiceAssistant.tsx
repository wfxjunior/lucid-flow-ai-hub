
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Brain, MessageSquare, Send, FileText, Calendar, Users, BarChart3 } from "lucide-react"

export function AIVoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [inputMessage, setInputMessage] = useState("")
  const [responses, setResponses] = useState<Array<{type: 'user' | 'ai', message: string}>>([
    { type: 'ai', message: 'Hello! I\'m your AI assistant. I can help you create invoices, schedule appointments, manage customers, and much more. How can I assist you today?' }
  ])

  const toggleListening = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        const voiceMessage = "Create an invoice for John Smith"
        setResponses(prev => [...prev, 
          { type: 'user', message: voiceMessage },
          { type: 'ai', message: 'I\'ll help you create an invoice for John Smith. Let me gather the necessary information and prepare the invoice template for you.' }
        ])
        setIsListening(false)
      }, 3000)
    }
  }

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setResponses(prev => [...prev, 
        { type: 'user', message: inputMessage },
        { type: 'ai', message: 'I understand your request. Let me help you with that. I\'ll process your request and provide the best assistance possible.' }
      ])
      setInputMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Main AI Voice Assistant Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-3 text-2xl">
            <Brain className="h-8 w-8 text-blue-600" />
            AI Voice Assistant
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
            Speak naturally or type your requests. I can help with invoices, appointments, customer management, and more.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Voice Command Button */}
          <div className="flex justify-center">
            <Button
              onClick={toggleListening}
              variant={isListening ? "destructive" : "default"}
              size="lg"
              className="px-8 py-4 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isListening ? <MicOff className="h-5 w-5 mr-2" /> : <Mic className="h-5 w-5 mr-2" />}
              {isListening ? "Stop Listening" : "Start Voice Command"}
            </Button>
          </div>

          {isListening && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              Listening...
            </div>
          )}

          {/* Message Input Bar */}
          <div className="flex gap-3 items-center bg-white rounded-full border-2 border-gray-200 p-2 shadow-sm">
            <Input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your request here..."
              className="flex-1 border-0 bg-transparent text-base placeholder:text-gray-500 focus-visible:ring-0"
              onKeyPress={handleKeyPress}
            />
            <Button 
              onClick={sendMessage} 
              size="icon"
              className="rounded-full bg-blue-600 hover:bg-blue-700 h-10 w-10"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Conversation Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Conversation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {responses.map((response, index) => (
              <div key={index} className={`flex ${response.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  response.type === 'user' 
                    ? 'bg-blue-600 text-white ml-4' 
                    : 'bg-gray-100 text-gray-800 mr-4'
                }`}>
                  <p className="text-sm leading-relaxed">{response.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick AI Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick AI Actions</CardTitle>
          <CardDescription>Click on any action to get started quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-blue-50 hover:border-blue-200"
              onClick={() => setInputMessage("Create a new invoice")}
            >
              <FileText className="h-6 w-6 text-blue-600" />
              <span className="text-sm">Create Invoice</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-green-50 hover:border-green-200"
              onClick={() => setInputMessage("Schedule a meeting")}
            >
              <Calendar className="h-6 w-6 text-green-600" />
              <span className="text-sm">Schedule Meeting</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-purple-50 hover:border-purple-200"
              onClick={() => setInputMessage("Add a new customer")}
            >
              <Users className="h-6 w-6 text-purple-600" />
              <span className="text-sm">Add Customer</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-orange-50 hover:border-orange-200"
              onClick={() => setInputMessage("Generate analytics report")}
            >
              <BarChart3 className="h-6 w-6 text-orange-600" />
              <span className="text-sm">Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
