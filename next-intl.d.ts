import type en from './i18n/locales/en.json'

type Messages = typeof en

declare global {
  interface IntlMessages extends Messages {}
}
