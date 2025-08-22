
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function UserGreeting() {
  const { t } = useLanguage();
  
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">User Greeting</h2>
      <p className="text-sm text-muted-foreground">{t('welcome')}</p>
    </div>
  );
}
