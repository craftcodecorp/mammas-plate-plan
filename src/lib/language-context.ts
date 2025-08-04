import { createContext } from 'react';
import { Language } from './language-utils';

// Define language context type
export type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create context with default values
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
