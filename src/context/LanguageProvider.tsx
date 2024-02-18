import React, { createContext, useContext, useState } from 'react';
import lng from './lng'

// Create a Language Context

export type ILanguage = 'ru' | 'uz';

export interface ILanguageContext {
  language: ILanguage;
  translations: any;
  changeLanguage: (lang: ILanguage) => void;
}

export const LanguageContext = createContext<ILanguageContext>(null!);

// Language Provider Component

interface ILanguageProvider {
  children: React.ReactElement;
}


export const LanguageProvider: React.FC<ILanguageProvider> = ({ children }) => {
  const [language, setLanguage] = useState<ILanguage>('uz');
  const [translations, setTranslations] = useState(lng);

  // Function to change language
  const changeLanguage = (lang: ILanguage) => {
    setLanguage(lang);
    // Load translations for the new language
    // You can fetch this data from an external source or import it
  };

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
