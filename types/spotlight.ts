// Remove Sanity dependencies and use generic types
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
  marks?: Array<string>
}

export interface BodyItem {
  _type: string
  style?: string
  postImage?: string
  markDefs?: Array<MarkDef>
  children?: Array<Child>
}

export interface Spotlight {
  _id: string
  _type: 'spotlight'
  _createdAt: string
  _updatedAt: string
  author: Array<Author>
  title?: string
  slug: {
    current: string
  }
  excerpt: string
  featuredImage: string
  mainImage?: string | null
  body: Array<BodyItem>
  authorName: Array<string>
  avatar: Array<string>
}
