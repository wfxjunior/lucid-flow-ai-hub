
import { useState } from "react"
import { QuickActionsSearchBar } from "@/components/QuickActionsSearchBar"
import { ActionGrid } from "@/components/ActionGrid"
import { limitedQuickActions } from "@/components/quick-actions/limitedQuickActions"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"

interface LimitedQuickActionsProps {
  onActionClick: (actionId: string) => void
}

export function LimitedQuickActions({ onActionClick }: LimitedQuickActionsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isListening, setIsListening] = useState(false)

  const filteredActions = limitedQuickActions.filter(action =>
    action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleActionClick = (actionId: string) => {
    console.log('LimitedQuickActions: Action clicked:', actionId)
    onActionClick(actionId)
  }

  const handleVoiceCommand = () => {
    if (!isListening) {
      // Start voice recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
        const recognition = new SpeechRecognition()
        
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = 'en-US'
        
        recognition.onstart = () => {
          setIsListening(true)
        }
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript.toLowerCase()
          console.log('Voice command:', transcript)
          
          // Match voice command to actions
          const matchedAction = limitedQuickActions.find(action => 
            transcript.includes(action.title.toLowerCase()) ||
            transcript.includes(action.id.toLowerCase())
          )
          
          if (matchedAction) {
            handleActionClick(matchedAction.id)
          } else {
            // Set search term if no direct match
            setSearchTerm(transcript)
          }
          
          setIsListening(false)
        }
        
        recognition.onerror = () => {
          setIsListening(false)
        }
        
        recognition.onend = () => {
          setIsListening(false)
        }
        
        recognition.start()
      } else {
        alert('Voice recognition not supported in this browser')
      }
    } else {
      // Stop listening (this would need additional implementation)
      setIsListening(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <Button
          onClick={handleVoiceCommand}
          variant={isListening ? "default" : "outline"}
          size="sm"
          className={`flex items-center gap-2 ${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          {isListening ? 'Listening...' : 'Voice Command'}
        </Button>
      </div>
      
      <QuickActionsSearchBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      
      <ActionGrid 
        actions={filteredActions}
        onActionClick={handleActionClick}
        searchTerm={searchTerm}
      />
    </div>
  )
}
