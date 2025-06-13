
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLanguage } from "@/contexts/LanguageContext"
import { ChevronUp } from "lucide-react"

const languages = [
  { code: "en-US", name: "English (US)", flag: "🇺🇸" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "pt-BR", name: "Português (Brasil)", flag: "🇧🇷" },
]

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage()
  
  const currentFlag = languages.find(lang => lang.code === currentLanguage)?.flag || "🇺🇸"

  return (
    <Select value={currentLanguage} onValueChange={setLanguage}>
      <SelectTrigger className="w-auto h-8 bg-transparent border-none text-gray-400 text-xs hover:bg-gray-800/50 focus:ring-1 focus:ring-gray-600 px-2">
        <div className="flex items-center gap-1">
          <span className="text-base">{currentFlag}</span>
          <ChevronUp className="h-3 w-3" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center gap-2">
              <span className="text-xs">{language.flag}</span>
              <span className="text-xs">{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
