
import { Globe } from "lucide-react"
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
    <div className="px-3 py-2">
      <div className="flex items-center gap-2 mb-2">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">{t('language.title')}</span>
      </div>
      <Select value={currentLanguage} onValueChange={setLanguage}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t('language.selectPlaceholder')} />
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
    </div>
  )
}
