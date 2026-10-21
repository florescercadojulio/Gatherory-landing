import en from "@/i18n/locales/en";
import es from "@/i18n/locales/es";

export const translations = { en, es } as const;
export type Locale = keyof typeof translations;
type Localized<T> = T extends string ? string : T extends readonly (infer U)[] ? readonly Localized<U>[] : { [K in keyof T]: Localized<T[K]> };
export type SiteCopy = Localized<typeof en>;

export const defaultLocale: Locale = "en";

export function getTranslations(locale: string = defaultLocale): SiteCopy {
	return translations[locale as Locale] ?? translations[defaultLocale];
}
