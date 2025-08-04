// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const heroSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  buttons: z.array(z.object({
    text: z.string(),
    to: z.string(),
    variant: z.enum(['solid', 'outline', 'ghost', 'link'])
  }))
})

const technologySchema = z.object({
  name: z.string(),
  icon: z.string(),
  category: z.string()
})

const technologiesSchema = z.object({
  title: z.string(),
  items: z.array(technologySchema)
})

const seoSchema = z.object({
  title: z.string(),
  description: z.string()
})

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: 'index.yml',
      schema: z.object({
        hero: heroSchema,
        technologies: technologiesSchema,
        seo: seoSchema
      })
    })
  }
})
