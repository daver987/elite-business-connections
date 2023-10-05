//@ts-ignore
import imageUrlBuilder from '@sanity/image-url'
//@ts-ignore
import type { Image } from '@sanity/types'

export default defineNuxtPlugin(() => {
  const builder = imageUrlBuilder(useSanity().config)

  function urlFor(source: Image) {
    return builder.image(source).auto('format')
  }

  return {
    provide: { urlFor },
  }
})
