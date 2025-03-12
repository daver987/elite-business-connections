import { MockCMSAdapter, imageUrlBuilder } from '../utils/cms/mockCmsAdapter'
import type { SpotlightItem } from '../data/spotlightsData'
import type { CMSContent } from '../utils/cms/types'

export function useCms() {
  const spotlightAdapter: CMSContent<SpotlightItem> = new MockCMSAdapter()

  return {
    spotlight: spotlightAdapter,
    urlFor: imageUrlBuilder,
  }
}
