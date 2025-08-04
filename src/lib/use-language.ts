import { useContext } from 'react';
import { LanguageContext, LanguageContextType } from './language-context';

/**
 * Custom hook to use language context
 * 
 * @returns Language context with language, setLanguage, and t (translate) function
 * @throws Error if used outside of LanguageProvider
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};
