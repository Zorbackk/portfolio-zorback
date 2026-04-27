/**
 * Plugin pour persister la langue sélectionnée par l'utilisateur dans le navigateur.
 *
 * @description Restaure la langue sauvegardée lors du chargement de la page et sauvegarde automatiquement la langue sélectionnée dans localStorage.
 *
 * @requires @nuxtjs/i18n
 */
export default defineNuxtPlugin((nuxtApp) => {
  // useI18n() ne peut pas être appelé dans un plugin (hors contexte setup) — on passe par nuxtApp.$i18n
  const i18n = nuxtApp.$i18n as { locale: Ref<string>; setLocale: (locale: string) => Promise<void> }

  const savedLocale = localStorage.getItem('preferred-locale')
  if (savedLocale && savedLocale !== i18n.locale.value) {
    i18n.setLocale(savedLocale)
  }

  watch(i18n.locale, (newLocale: string) => {
    localStorage.setItem('preferred-locale', newLocale)
  })
})

