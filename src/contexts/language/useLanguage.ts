import { useContext } from "react";
import { LanguageContext, LanguageContextProps } from "./languageContext";

export const useLanguage = (): LanguageContextProps => {
  return useContext(LanguageContext);
};