import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import process from 'node:process'
import type {Plugin, UserConfig} from 'vite'
import {schemaTypes} from './schemas/index.js'

const allowAllHostsPlugin = {
  name: 'allow-all-hosts',
  configureServer(server) {
    server.middlewares.use((_request, _response, next) => next())
  },
} satisfies Plugin

export default defineConfig({
  name: 'default',
  title: 'Junviglund CMS',

  projectId: 'uy0ayswl',
  dataset: process.env.SANITY_DATASET || 'stage',

  plugins: [
    structureTool(),
    visionTool({
      defaultApiVersion: '2024-01-01',
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    productionUrl: async (prev, context) => {
      const {document} = context
      const slug = document._type === 'post' ? document.slug : undefined

      if (
        slug &&
        typeof slug === 'object' &&
        'current' in slug &&
        typeof slug.current === 'string'
      ) {
        return `${process.env.SANITY_STUDIO_PREVIEW_URL || 'https://junviglund.com'}/posts/${slug.current}`
      }
      return prev
    },
  },

  vite: (prevConfig: UserConfig) => ({
    ...prevConfig,
    server: {
      ...prevConfig.server,
      host: '0.0.0.0',
      hmr: {
        clientPort: 3333,
      },
    },
    plugins: [...(prevConfig.plugins || []), allowAllHostsPlugin],
  }),
})
