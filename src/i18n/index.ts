import en from "@/i18n/locales/en";

export const translations = { en } as const;
export type Locale = keyof typeof translations;
export type SiteCopy = (typeof translations)[Locale];

export const defaultLocale: Locale = "en";

export function getTranslations(locale: string = defaultLocale): SiteCopy {
	return translations[locale as Locale] ?? translations[defaultLocale];
}
