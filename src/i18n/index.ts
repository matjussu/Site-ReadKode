import fr from './fr.json';
import en from './en.json';

export const translations = {
  fr,
  en,
} as const;

export type Locale = keyof typeof translations;
export type TranslationKeys = typeof fr;

export function getTranslations(locale: Locale = 'fr') {
  return translations[locale] || translations.fr;
}

export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: unknown = translations[locale] || translations.fr;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  return typeof value === 'string' ? value : key;
}

export const locales = ['fr', 'en'] as const;
export const defaultLocale = 'fr' as const;
