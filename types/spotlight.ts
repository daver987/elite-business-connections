import type { Slug, ImageAsset } from '@sanity/types'

export interface Author {
  name: string
  image: string
  slug: string
}

export interface MarkDef {
  _type: string
  href?: string
  _key: string
}

export interface Child {
  _type: string
  text: string
  marks?: string[]
}

export interface BodyItem {
  _type: string
  style?: string
  postImage?: string
  markDefs?: MarkDef[]
  children?: Child[]
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
  featuredImage: string
  body: BodyItem[]
  authorName: string[]
  avatar: string[]
}
