import React, { useState, ReactNode } from "react";
import { IntlProvider } from "react-intl";
import esMessages from "../../locales/es.json";
import enMessages from "../../locales/en.json";
import { LanguageContext } from "./languageContext";

const messages: { [key: string]: Record<string, string> } = {
  es: esMessages,
  en: enMessages,
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const savedLocale = localStorage.getItem("language") || "es";
  const [locale, setLocale] = useState(savedLocale);

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem("language", newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: changeLanguage }}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};