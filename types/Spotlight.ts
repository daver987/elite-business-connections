import { PortableTextBlock, Slug, ImageAsset } from '@sanity/types'

interface Author {
  name: string
  image: string
  slug: string
}

export interface Spotlight {
  _id: string
  _type: 'spotlight'
  _createdAt: string
  _updatedAt: string
  author: Author[]
  title?: string
  slug: Slug
  excerpt: string
  mainImage?: ImageAsset
  body: PortableTextBlock[]
}
