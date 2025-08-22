
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function EnhancedAIVoice() {
  const { currentLanguage } = useLanguage();
  
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Enhanced AI Voice</h2>
      <p className="text-sm text-muted-foreground">Language: {currentLanguage}</p>
    </div>
  );
}
