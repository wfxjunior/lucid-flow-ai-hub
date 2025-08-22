
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AppSidebarProps {
  setActiveView: (view: string) => void;
  activeView: string;
}

export function AppSidebar({ setActiveView, activeView }: AppSidebarProps) {
  const { currentLanguage } = useLanguage();
  
  return (
    <div className="w-64 bg-background border-r">
      <div className="p-4">
        <h2 className="text-lg font-semibold">App Sidebar</h2>
        <p className="text-sm text-muted-foreground">Active: {activeView}</p>
        <p className="text-sm text-muted-foreground">Language: {currentLanguage}</p>
      </div>
    </div>
  );
}
