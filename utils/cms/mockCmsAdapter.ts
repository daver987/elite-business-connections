import type { CMSContent, CMSImageTransformer } from './types'
import { spotlightsData } from '../../data/spotlightsData'
import type { SpotlightItem } from '../../data/spotlightsData'

export class MockCMSAdapter implements CMSContent<SpotlightItem> {
  async fetch(): Promise<SpotlightItem[]> {
    return Promise.resolve(spotlightsData)
  }

  async fetchOne(id: string): Promise<SpotlightItem> {
    const item = spotlightsData.find((item) => item.id === id)
    if (!item) {
      throw new Error(`Item with id ${id} not found`)
    }
    return Promise.resolve(item)
  }

  async fetchBySlug(slug: string): Promise<SpotlightItem> {
    const item = spotlightsData.find(
      (item) => item.title.toLowerCase().replace(/\s+/g, '-') === slug
    )
    if (!item) {
      throw new Error(`Item with slug ${slug} not found`)
    }
    return Promise.resolve(item)
  }
}

export function imageUrlBuilder(src: string): CMSImageTransformer {
  let width = 0
  let height = 0

  return {
    width: (w: number) => {
      width = w
      return imageUrlBuilder(src)
    },
    height: (h: number) => {
      height = h
      return imageUrlBuilder(src)
    },
    url: () => {
      // In a real implementation, this would use a proper image service
      // For now, just return the original URL
      return src
    },
  }
}
