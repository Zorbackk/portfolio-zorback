// /plugins/i18n-persistence.client.ts
export default defineNuxtPlugin(() => {
  const { locale, setLocale } = useI18n()
  
  // 🚀 Restaurer la langue sauvegardée
  const savedLocale = localStorage.getItem('preferred-locale')
  if (savedLocale && savedLocale !== locale.value) {
    setLocale(savedLocale as 'fr' | 'en')
  }
  
  // 💾 Sauvegarder automatiquement
  watch(locale, (newLocale) => {
    localStorage.setItem('preferred-locale', newLocale)
  })
})
