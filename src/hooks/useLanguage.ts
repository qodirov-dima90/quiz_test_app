import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageProvider'


export const useLanguage = () => {
  const { language, translations } = useContext(LanguageContext);

  function t(key: string) {
    return translations[language][key];
  }

  return { t };
};