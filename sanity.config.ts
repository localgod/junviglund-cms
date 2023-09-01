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
})
