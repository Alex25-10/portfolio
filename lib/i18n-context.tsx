"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { t, type Language, type TranslationSet } from "./i18n"

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  translations: TranslationSet
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "es",
  setLang: () => {},
  translations: t.es,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("es")

  useEffect(() => {
    document.documentElement.lang = lang === "es" ? "es-AR" : "en"
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, translations: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
