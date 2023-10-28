import { ref } from 'vue'
import {
  createDirectus,
  type DirectusClient,
  type RestClient,
  readItem,
  readItems,
  readSingleton,
  rest,
  createItem,
  updateItem,
  staticToken,
  withToken,
  type StaticTokenClient,
} from '@directus/sdk'
import type { Schema } from '~/types/schema'
import { useRuntimeConfig } from '#imports'

type Config = {
  directusUrl: string
  accessToken: string
}

type DirectusCompositeType = DirectusClient<Schema> &
  RestClient<Schema> &
  StaticTokenClient<Schema>

function getConfig(): Config {
  const runtimeConfig = useRuntimeConfig()
  return {
    directusUrl: runtimeConfig.DIRECTUS_URL as string,
    accessToken: runtimeConfig.DIRECTUS_SERVER_TOKEN as string,
  }
}

export function useDirectusServer() {
  const directusServer = ref<DirectusCompositeType | null>(null)

  const initDirectus = () => {
    const { directusUrl, accessToken } = getConfig()
    directusServer.value = createDirectus<Schema>(directusUrl)
      .with(rest())
      .with(staticToken(accessToken))
  }

  // Initialize Directus on composable usage
  initDirectus()

  return {
    directusServer: directusServer.value,
    readItem,
    readItems,
    readSingleton,
    createItem,
    updateItem,
    withToken,
  }
}
