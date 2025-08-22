
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FeatherBotProps {
  isVisible?: boolean;
  theme?: string;
}

export function FeatherBot({ isVisible = true, theme = "default" }: FeatherBotProps) {
  const { currentLanguage } = useLanguage();
  
  if (!isVisible) return null;
  
  return (
    <div className={`fixed bottom-4 right-4 p-4 bg-background border rounded-lg shadow-lg ${theme === 'gray' ? 'bg-gray-100' : ''}`}>
      <h3 className="text-sm font-semibold">FeatherBot</h3>
      <p className="text-xs text-muted-foreground">Language: {currentLanguage}</p>
    </div>
  );
}
