import { defineRouting } from 'next-intl/routing'
import { availableLocaleCodes, defaultLocale } from './config'

export const routing = defineRouting({
  locales: availableLocaleCodes,
  defaultLocale: defaultLocale?.code,
  localePrefix: 'as-needed',
  alternateLinks: false,
})
