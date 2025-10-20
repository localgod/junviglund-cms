import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas/index.js'

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
      if (document._type === 'post' && document.slug?.current) {
        return `${process.env.SANITY_STUDIO_PREVIEW_URL || 'https://junviglund.com'}/posts/${document.slug.current}`
      }
      return prev
    },
  },

  vite: (prevConfig) => ({
    ...prevConfig,
    server: {
      ...prevConfig.server,
      host: '0.0.0.0',
      hmr: {
        clientPort: 3333,
      },
    },
    plugins: [
      ...(prevConfig.plugins || []),
      {
        name: 'allow-all-hosts',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            next()
          })
        },
      },
    ],
  }),
})
