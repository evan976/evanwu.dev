import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('home')
  return (
    <div className="w-full h-dvh flex flex-col items-center gap-4 justify-center">
      <h1 className="text-3xl font-bold underline text-blue-500">
        {t('title')}
      </h1>
      <p className="font-inter">{t('description')}</p>
    </div>
  )
}
