export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  featuredImage?: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}