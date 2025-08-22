
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traduções básicas
const translations = {
  pt: {
    'chat.placeholder': 'Digite sua mensagem...',
    'chat.send': 'Enviar',
    'chat.minimize': 'Minimizar',
    'chat.close': 'Fechar',
    'chat.greeting': 'Olá! Como posso ajudar você hoje?'
  },
  en: {
    'chat.placeholder': 'Type your message...',
    'chat.send': 'Send', 
    'chat.minimize': 'Minimize',
    'chat.close': 'Close',
    'chat.greeting': 'Hello! How can I help you today?'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
