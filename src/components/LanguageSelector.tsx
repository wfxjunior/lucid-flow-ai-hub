
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLanguage } from "@/contexts/LanguageContext"

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

  return (
    <Select value={currentLanguage} onValueChange={setLanguage}>
      <SelectTrigger className="w-full h-6">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center gap-2">
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
