import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {media} from 'sanity-plugin-media'
import {IconManager} from 'sanity-plugin-icon-manager'

export default defineConfig({
  name: 'default',
  title: 'ebc-website',

  projectId: '1bmrd0be',
  dataset: 'production',

  plugins: [deskTool(), visionTool(), media(), unsplashImageAsset(), IconManager()],

  schema: {
    types: schemaTypes,
  },
})
