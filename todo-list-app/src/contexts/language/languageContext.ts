import { createContext } from "react";
import logger from "../../services/logging";

export interface LanguageContextProps
{
    locale: string;
    setLocale: (locale: string) => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
    locale: "es",
    setLocale: (locale: string) => logger.info(locale), // Función por defecto
});