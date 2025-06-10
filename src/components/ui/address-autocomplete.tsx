
import React, { useState, useEffect, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, Loader2 } from 'lucide-react'
import { cn } from "@/lib/utils"

interface AddressSuggestion {
  display_name: string
  lat: string
  lon: string
  place_id: string
}

interface AddressAutocompleteProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  id?: string
}

export function AddressAutocomplete({ 
  value, 
  onChange, 
  placeholder = "Enter address...",
  className,
  id
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchTerm, setSearchTerm] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSearchTerm(value)
  }, [value])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.length >= 3) {
        searchAddresses(searchTerm)
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const searchAddresses = async (query: string) => {
    if (!query.trim()) return

    setIsLoading(true)
    try {
      // Using Nominatim OpenStreetMap API (free alternative to Google Places)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=us,ca,gb,au&addressdetails=1`
      )
      
      if (response.ok) {
        const data = await response.json()
        setSuggestions(data)
        setShowSuggestions(true)
      }
    } catch (error) {
      console.error('Error fetching address suggestions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchTerm(newValue)
    onChange(newValue)
  }

  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
    onChange(suggestion.display_name)
    setSearchTerm(suggestion.display_name)
    setShowSuggestions(false)
    setSuggestions([])
  }

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  return (
    <div className="relative">
      <div className="relative">
        <Input
          ref={inputRef}
          id={id}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className={cn("pr-8", className)}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          ) : (
            <MapPin className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <Button
              key={suggestion.place_id || index}
              variant="ghost"
              className="w-full justify-start text-left h-auto p-3 hover:bg-gray-50"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
              <span className="text-sm text-gray-900 truncate">
                {suggestion.display_name}
              </span>
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
