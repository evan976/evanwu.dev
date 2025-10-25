import languine from 'languine.json'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: [...languine.locale.targets, languine.locale.source],
  defaultLocale: languine.locale.source,
  localePrefix: 'as-needed',
})
