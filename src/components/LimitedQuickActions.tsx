
import { useState } from "react"
import { QuickActionsSearchBar } from "@/components/QuickActionsSearchBar"
import { ActionGrid } from "@/components/ActionGrid"
import { limitedQuickActions } from "@/components/quick-actions/limitedQuickActions"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"
import { useSidebarMenuData } from "@/components/sidebar/SidebarMenuData"
import { 
  coreBusinessTools, 
  financialTools, 
  operationsTools, 
  documentsTools, 
  productivityTools 
} from "@/components/sidebar/businessToolsData"

// Declare speech recognition types
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface LimitedQuickActionsProps {
  onActionClick: (actionId: string) => void
}

export function LimitedQuickActions({ onActionClick }: LimitedQuickActionsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isListening, setIsListening] = useState(false)
  const { mainFeatures, communication, analytics, integrations, systemTools } = useSidebarMenuData()

  const filteredActions = limitedQuickActions.filter(action =>
    action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleActionClick = (actionId: string) => {
    console.log('LimitedQuickActions: Action clicked:', actionId)
    onActionClick(actionId)
  }

  // Combine all sidebar items for voice recognition
  const allSidebarItems = [
    ...mainFeatures,
    ...coreBusinessTools,
    ...financialTools,
    ...operationsTools,
    ...documentsTools,
    ...productivityTools,
    ...communication,
    ...analytics,
    ...integrations,
    ...systemTools
  ]

  const handleVoiceCommand = () => {
    if (!isListening) {
      // Start voice recognition
      if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
        const recognition = new SpeechRecognition()
        
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = 'en-US'
        
        recognition.onstart = () => {
          setIsListening(true)
        }
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript.toLowerCase()
          console.log('Voice command:', transcript)
          
          // Check for theme commands
          if (transcript.includes('dark mode') || transcript.includes('activate dark mode') || transcript.includes('trigger dark mode')) {
            const root = window.document.documentElement
            root.classList.remove('light')
            root.classList.add('dark')
            root.setAttribute('data-theme', 'dark')
            localStorage.setItem('theme', 'dark')
            setIsListening(false)
            return
          }
          
          if (transcript.includes('light mode') || transcript.includes('activate light mode')) {
            const root = window.document.documentElement
            root.classList.remove('dark')
            root.classList.add('light')
            root.setAttribute('data-theme', 'light')
            localStorage.setItem('theme', 'light')
            setIsListening(false)
            return
          }

          // Check for language commands
          const languageCommands: { [key: string]: string } = {
            'portuguese': 'pt',
            'chinese': 'zh',
            'german': 'de',
            'french': 'fr',
            'spanish': 'es'
          }

          for (const [language, code] of Object.entries(languageCommands)) {
            if (transcript.includes(`change language to ${language}`) || transcript.includes(language)) {
              // This would need to integrate with your language context
              console.log(`Changing language to ${language} (${code})`)
              setIsListening(false)
              return
            }
          }
          
          // Match voice command to quick actions first
          const matchedQuickAction = limitedQuickActions.find(action => 
            transcript.includes(action.title.toLowerCase()) ||
            transcript.includes(action.id.toLowerCase())
          )
          
          if (matchedQuickAction) {
            handleActionClick(matchedQuickAction.id)
            setIsListening(false)
            return
          }

          // Match voice command to sidebar items
          const matchedSidebarItem = allSidebarItems.find(item => 
            transcript.includes(item.title.toLowerCase()) ||
            transcript.includes(item.view.toLowerCase())
          )
          
          if (matchedSidebarItem) {
            handleActionClick(matchedSidebarItem.view)
            setIsListening(false)
            return
          }

          // Set search term if no direct match
          setSearchTerm(transcript)
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
