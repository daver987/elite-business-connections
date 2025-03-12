export interface User {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'MEMBER'
  profileImage?: string
  phone?: string
  company?: string
  title?: string
  bio?: string
  createdAt: Date
  updatedAt: Date
}