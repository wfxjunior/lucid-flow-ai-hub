
import { useState } from "react"
import { QuickActionsSearchBar } from "@/components/QuickActionsSearchBar"
import { LimitedQuickActionsGrid } from "@/components/LimitedQuickActionsGrid"
import { limitedQuickActions } from "@/components/quick-actions/limitedQuickActions"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"
import { sidebarMenuData } from "@/components/sidebar/SidebarMenuData"
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

  const filteredActions = limitedQuickActions.filter(action =>
    action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleActionClick = (actionId: string) => {
    console.log('LimitedQuickActions: Action clicked:', actionId)
    console.log('Available actions:', limitedQuickActions.map(a => a.id))
    
    if (typeof onActionClick === 'function') {
      onActionClick(actionId)
    } else {
      console.error('onActionClick is not a function:', onActionClick)
    }
  }

  // Combine all sidebar items for voice recognition
  const allSidebarItems = [
    ...coreBusinessTools,
    ...financialTools,
    ...operationsTools,
    ...documentsTools,
    ...productivityTools,
    // Extract items from sidebarMenuData sections
    ...(sidebarMenuData.flatMap(section => section.items || []).map(item => ({
      title: item.title,
      view: item.url?.replace('/', '') || item.title.toLowerCase().replace(/\s+/g, '-')
    })))
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

          // Match voice command to quick actions first
          const matchedQuickAction = limitedQuickActions.find(action => 
            transcript.includes(action.title.toLowerCase()) ||
            transcript.includes(action.id.toLowerCase())
          )
          
          if (matchedQuickAction) {
            console.log('Voice matched quick action:', matchedQuickAction.id)
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
            console.log('Voice matched sidebar item:', matchedSidebarItem.view)
            handleActionClick(matchedSidebarItem.view)
            setIsListening(false)
            return
          }

          // Set search term if no direct match
          setSearchTerm(transcript)
          setIsListening(false)
        }
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
          if (event.error === 'not-allowed') {
            alert('Microphone access denied. Please allow microphone access and try again.')
          }
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
    <div className="space-y-6">
      {/* Voice Command Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-4">
          <Button
            onClick={handleVoiceCommand}
            variant={isListening ? "default" : "outline"}
            size="sm"
            className={`flex items-center gap-2 ${isListening ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' : 'border-blue-300 hover:bg-blue-50'}`}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {isListening ? 'Listening...' : 'Voice Command'}
          </Button>
          <span className="text-sm text-muted-foreground hidden sm:block">
            Use voice commands to navigate quickly
          </span>
        </div>
        <div className="text-sm text-muted-foreground font-medium">
          {filteredActions.length} actions available
        </div>
      </div>
      
      {/* Search Bar */}
      <QuickActionsSearchBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      
      {/* Actions Grid */}
      <LimitedQuickActionsGrid 
        actions={filteredActions}
        onActionClick={handleActionClick}
        searchTerm={searchTerm}
      />
    </div>
  )
}
