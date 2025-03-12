export interface CMSContent<T> {
  fetch: () => Promise<T[]>
  fetchOne: (id: string) => Promise<T>
  fetchBySlug: (slug: string) => Promise<T>
}

export interface CMSImage {
  url: string
  alt?: string
  width?: number
  height?: number
}

export interface CMSImageTransformer {
  width: (width: number) => CMSImageTransformer
  height: (height: number) => CMSImageTransformer
  url: () => string
}
