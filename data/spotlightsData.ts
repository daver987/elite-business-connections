import { categories } from './professions'

export interface SpotlightAuthor {
  fullName: string
  uri: string
  companyRole: string
  avatar: string
}

export interface SpotlightCategory {
  title: string
  href: string
}

export interface SpotlightItem {
  id: string
  datetime: string
  category: SpotlightCategory
  author: SpotlightAuthor
  title: string
  imageUrl: string
  imageDescription: string
  excerpt: string
  content?: any
}

export const spotlightsData: SpotlightItem[] = [
  {
    id: '1',
    datetime: '2023-06-15T09:00:00Z',
    category: categories[0],
    author: {
      fullName: 'John Smith',
      uri: '/members/john-smith',
      companyRole: 'CEO, Tech Innovations',
      avatar: '/images/avatars/john-smith.jpg',
    },
    title: 'How I Grew My Tech Business by 200% in One Year',
    imageUrl: '/images/spotlights/tech-growth.jpg',
    imageDescription: 'A person working on a computer with growth charts',
    excerpt:
      'Learn how networking through EBC helped me connect with key partners and grow my business exponentially.',
  },
  {
    id: '2',
    datetime: '2023-07-22T14:30:00Z',
    category: categories[2],
    author: {
      fullName: 'Sarah Johnson',
      uri: '/members/sarah-johnson',
      companyRole: 'Financial Advisor',
      avatar: '/images/avatars/sarah-johnson.jpg',
    },
    title: 'Financial Planning Strategies for Small Business Owners',
    imageUrl: '/images/spotlights/financial-planning.jpg',
    imageDescription: 'Financial documents and calculator on a desk',
    excerpt:
      'Discover the key financial planning strategies that helped my clients secure their business future.',
  },
  {
    id: '3',
    datetime: '2023-08-10T11:15:00Z',
    category: categories[4],
    author: {
      fullName: 'Michael Chen',
      uri: '/members/michael-chen',
      companyRole: 'Education Consultant',
      avatar: '/images/avatars/michael-chen.jpg',
    },
    title: 'Revolutionizing Corporate Training Programs',
    imageUrl: '/images/spotlights/corporate-training.jpg',
    imageDescription: 'A group of professionals in a training session',
    excerpt:
      'How I transformed corporate training programs and increased employee retention by 45%.',
  },
]
