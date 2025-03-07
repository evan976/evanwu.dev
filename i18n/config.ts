export const locales = [
  {
    code: 'en',
    displayName: 'English',
    localeName: 'English',
    hrefLang: 'en-US',
    langDir: 'ltr',
    enabled: true,
    default: true,
  },
  {
    code: 'zh-CN',
    localeName: 'Simplified Chinese',
    displayName: '简体中文',
    hrefLang: 'zh-Hans',
    langDir: 'ltr',
    enabled: true,
    default: false,
  },
] as const

export type Locale = (typeof locales)[number]['code']

export const defaultLocale = locales.find((locale) => locale.default)!

export const availableLocales = locales.filter((locale) => locale.enabled)

export const availableLocaleCodes = availableLocales.map(
  (locale) => locale.code,
)
