
import { SidebarFooter as UISidebarFooter } from "@/components/ui/sidebar"
import { LanguageSelector } from "@/components/LanguageSelector"
import { ThemeToggle } from "@/components/ThemeToggle"

export function SidebarFooter() {
  return (
    <UISidebarFooter className="p-4 border-t">
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">Language</p>
          <LanguageSelector />
        </div>
        <ThemeToggle />
      </div>
    </UISidebarFooter>
  )
}
