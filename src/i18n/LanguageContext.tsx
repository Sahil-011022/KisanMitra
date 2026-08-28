import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { Language, LanguageOption, SUPPORTED_LANGUAGES } from "./types";
import { en } from "./translations/en";
import { mr } from "./translations/mr";
import { hi } from "./translations/hi";

type TranslationDictionary = typeof en;

const translations: Record<Language, Record<string, string>> = {
  en,
  mr,
  hi,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  supportedLanguages: LanguageOption[];
  currentLanguageOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = "kisanmitra_language";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "mr" || saved === "hi") {
        return saved;
      }
    } catch (e) {
      console.error("Failed to read language from localStorage", e);
    }
    return "en";
  });

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch (e) {
      console.error("Failed to save language to localStorage", e);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const currentDict = translations[language] || translations.en;
      let text = currentDict[key];

      // Fallback to English if not found in selected language
      if (text === undefined) {
        text = translations.en[key];
      }

      // If still not found, return the key as a readable string
      if (text === undefined) {
        return key;
      }

      // Variable interpolation {name}, {amount}, {orderId}
      if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          text = text.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(paramValue));
        });
      }

      return text;
    },
    [language]
  );

  const currentLanguageOption = useMemo(() => {
    return SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        supportedLanguages: SUPPORTED_LANGUAGES,
        currentLanguageOption,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
};
