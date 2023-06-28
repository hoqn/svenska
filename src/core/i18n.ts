import { changeLanguage } from 'i18next';
import { detectLocaleFromPath } from 'astro-i18next';

export function staticI18n(pathname: string): string {
  const locale = detectLocaleFromPath(pathname);
  changeLanguage(locale);
  
  return locale;
}
