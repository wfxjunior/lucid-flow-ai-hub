
import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface UserGreetingProps {
  onNavigate: (view: string) => void
}

export function UserGreeting({ onNavigate }: UserGreetingProps) {
  const { t } = useLanguage()
  
  return (
    <div className="flex items-center justify-between w-full">
      <h1 className="text-lg font-semibold">
        {t("greeting.welcome", "Welcome to FeatherBiz")}
      </h1>
    </div>
  )
}
