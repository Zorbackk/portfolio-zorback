<script setup lang="ts">
import { computed } from 'vue'

const { locale } = useI18n()

interface LegalItem {
  label: string
  value: string
}

interface ProcessedSection {
  title: string
  description: string
  items: LegalItem[]
}

const { data: page, refresh } = await useAsyncData(
  `legal-${locale.value}`,
  () => queryContent(`/${locale.value}/legal`).findOne()
)

watch(locale, async () => {
  await refresh()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found'
  })
}

const sectionsWithItems = computed<ProcessedSection[]>(() => {
  if (!page.value?.sections) return []

  return page.value.sections.map((section: Record<string, any>) => {
    const items: LegalItem[] = []
    const processedKeys = new Set<string>()

    for (const key in section) {
      if (key === 'title' || key === 'description') continue
      if (processedKeys.has(key)) continue

      if (key.endsWith('_detail')) {
        const labelKey = key.replace('_detail', '')
        if (section[labelKey]) {
          items.push({
            label: section[labelKey],
            value: section[key]
          })
          processedKeys.add(key)
          processedKeys.add(labelKey)
        }
      }
    }

    for (const key in section) {
      if (key === 'title' || key === 'description') continue
      if (processedKeys.has(key)) continue
      if (!key.endsWith('_detail') && !section[key + '_detail']) {
        items.push({
          label: section[key],
          value: ''
        })
      }
    }

    return {
      title: section.title,
      description: section.description,
      items
    }
  })
})

useSeoMeta({
  title: page.value.title || 'Mentions Légales',
  description: page.value.description || 'Mentions légales du site'
})
</script>

<template>
  <div class="legal-page container mx-auto py-8 px-6 prose max-w-none dark:prose-invert">
    <h1 class="text-4xl font-bold mb-4">{{ page?.title }}</h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 mb-12">{{ page?.description }}</p>

    <section v-for="(section, index) in sectionsWithItems" :key="index" class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">{{ section.title }}</h2>
      <p class="mb-6 text-gray-700 dark:text-gray-300">{{ section.description }}</p>

      <ul class="space-y-3">
        <li v-for="(item, itemIndex) in section.items" :key="itemIndex" class="flex flex-col sm:flex-row sm:gap-2">
          <strong class="font-semibold text-gray-900 dark:text-white">{{ item.label }}</strong>
          <span v-if="item.value" class="text-gray-700 dark:text-gray-300">{{ item.value }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.legal-page ul li strong {
  transition: color 0.3s ease;
}

.legal-page ul li strong:hover {
  color: #4f46e5;
}
</style>