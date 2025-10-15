import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
//import {googleMapsInput} from '@sanity/google-maps-input'
import { schemaTypes } from './schemas/index.js'

export default defineConfig({
  name: 'default',
  title: 'junviglund',

  projectId: 'uy0ayswl',
  dataset: process.env.SANITY_DATASET || 'stage',

  plugins: [
    deskTool(),
    visionTool(),
    //googleMapsInput(),
  ],

  schema: {
    types: schemaTypes,
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
            // Remove host check by not validating the Host header
            next()
          })
        },
      },
    ],
  }),
})
