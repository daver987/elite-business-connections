import imageUrlBuilder from '@sanity/image-url'
import type { SanityClientLike } from '@sanity/image-url/lib/types/types'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'

export default defineNuxtPlugin(() => {
  const builder = imageUrlBuilder(
    useSanity().config as unknown as SanityClientLike
  )
  function urlFor(source: ImageUrlBuilder) {
    return builder.image(source).auto('format')
  }
  return {
    provide: { urlFor },
  }
})
