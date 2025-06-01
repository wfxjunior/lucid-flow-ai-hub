
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
  const { currentLanguage, setLanguage, t } = useLanguage()

  return (
    <Select value={currentLanguage} onValueChange={setLanguage}>
      <SelectTrigger className="w-full h-8 bg-transparent border-gray-700 text-gray-400 text-xs hover:bg-gray-800/50 focus:ring-1 focus:ring-gray-600">
        <SelectValue placeholder={t("language.selectPlaceholder")} />
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
