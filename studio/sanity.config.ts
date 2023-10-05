import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {openaiImageAsset} from 'sanity-plugin-asset-source-openai'

export default defineConfig({
  name: 'default',
  title: 'ebc-website',

  projectId: '1bmrd0be',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool(),
    unsplashImageAsset(),
    openaiImageAsset({
      API_KEY: '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',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
