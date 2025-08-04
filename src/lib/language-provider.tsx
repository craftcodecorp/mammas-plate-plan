import React, { useState, useEffect, ReactNode } from 'react';
import { Language, translations } from './language-utils';
import { LanguageContext } from './language-context';

// Language provider props
interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

// Language provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  defaultLanguage = 'pt-BR' 
}) => {
  // Get language from localStorage or use default
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('cardapio-facil-language');
      return (savedLanguage as Language) || defaultLanguage;
    }
    return defaultLanguage;
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('cardapio-facil-language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Context value
  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
