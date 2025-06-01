
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Sparkles, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

interface Message {
  id: string
  question: string
  answer: string
  timestamp: string
}

export function AIFAQAssistant() {
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      toast.error("Please enter a question")
      return
    }

    setIsLoading(true)
    const questionText = question
    setQuestion("")

    try {
      const { data, error } = await supabase.functions.invoke('ai-faq-assistant', {
        body: { question: questionText }
      })

      if (error) throw error

      const newMessage: Message = {
        id: Date.now().toString(),
        question: questionText,
        answer: data.answer,
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [newMessage, ...prev])
      toast.success("Question answered!")
    } catch (error) {
      console.error('Error asking AI assistant:', error)
      toast.error("Failed to get answer. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAskQuestion()
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          AI FAQ Assistant
          <Badge variant="secondary" className="ml-2">Premium</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask any business-related question..."
            disabled={isLoading}
          />
          <Button 
            onClick={handleAskQuestion} 
            disabled={isLoading || !question.trim()}
            size="icon"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        {messages.length > 0 && (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div className="flex items-start gap-2">
                  <MessageCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium text-blue-900">{message.question}</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{message.answer}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="border-b border-gray-100" />
              </div>
            ))}
          </div>
        )}

        {messages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Sparkles className="h-8 w-8 mx-auto mb-2 text-purple-400" />
            <p>Ask me anything about business management!</p>
            <p className="text-sm mt-1">I can help with contracts, invoicing, estimates, and more.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
