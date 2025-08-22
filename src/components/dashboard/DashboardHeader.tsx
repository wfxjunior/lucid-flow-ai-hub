
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function DashboardHeader() {
  const { t } = useLanguage();
  
  return (
    <div className="p-4 border-b">
      <h1 className="text-2xl font-semibold">{t('dashboard')}</h1>
      <p className="text-sm text-muted-foreground">{t('welcome')}</p>
    </div>
  );
}
