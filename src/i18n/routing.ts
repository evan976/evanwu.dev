import languine from 'languine.json'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: [...languine.locale.targets, languine.locale.source],
  defaultLocale: languine.locale.source,
  localePrefix: 'as-needed',
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365, // 1 year
  },
})
