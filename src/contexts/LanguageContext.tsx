
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  'blog.title': 'Blog',
  'blog.subtitle': 'Business strategies & tips for small businesses.',
  'blog.manageblog': 'Manage Blog',
  'blog.searchPlaceholder': 'Search articles...',
  'blog.newest': 'Newest',
  'blog.mostLiked': 'Most Liked',
  'blog.all': 'All',
  'blog.noPostsYet': 'No posts published yet.',
  'blog.noPostsFound': 'No posts found.',
  'blog.noPostsFoundMessage': 'Try adjusting your search or filters.',
  'blog.createFirstPost': 'Create First Post',
  'blog.loadMore': 'Load More'
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[key as keyof typeof translations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
