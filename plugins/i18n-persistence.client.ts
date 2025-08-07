/**
 * Plugin pour persister la langue sélectionnée par l'utilisateur dans le navigateur.
 *
 * @description Restaure la langue sauvegardée lors du chargement de la page et sauvegarde automatiquement la langue sélectionnée dans localStorage.
 *
 * @requires @nuxtjs/i18n
 */
export default defineNuxtPlugin(() => {
  const { locale, setLocale } = useI18n()
  
  /**
   * Restaure la langue sauvegardée dans localStorage.
   */
  const savedLocale = localStorage.getItem('preferred-locale')
  if (savedLocale && savedLocale !== locale.value) {
    setLocale(savedLocale as 'fr' | 'en')
  }
  
  /**
   * Sauvegarde automatiquement la langue sélectionnée dans localStorage lorsqu'elle est modifiée.
   */
  watch(locale, (newLocale) => {
    localStorage.setItem('preferred-locale', newLocale)
  })
})

