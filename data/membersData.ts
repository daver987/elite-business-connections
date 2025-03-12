export interface MemberSocial {
  platform: string
  url: string
}

export interface Member {
  name: string
  role: string
  imageUrl: string
  social: MemberSocial[]
}

export const membersData: Member[] = [
  {
    name: 'John Smith',
    role: 'CEO, Tech Innovations',
    imageUrl: '/images/avatars/john-smith.jpg',
    social: [
      { platform: 'Facebook', url: 'https://facebook.com/johnsmith' },
      { platform: 'Instagram', url: 'https://instagram.com/johnsmith' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/johnsmith' },
    ],
  },
  {
    name: 'Sarah Johnson',
    role: 'Financial Advisor',
    imageUrl: '/images/avatars/sarah-johnson.jpg',
    social: [
      { platform: 'Facebook', url: 'https://facebook.com/sarahjohnson' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/sarahjohnson' },
    ],
  },
  {
    name: 'Michael Chen',
    role: 'Education Consultant',
    imageUrl: '/images/avatars/michael-chen.jpg',
    social: [
      { platform: 'Instagram', url: 'https://instagram.com/michaelchen' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/michaelchen' },
    ],
  },
]

export const socialIcons = {
  Facebook: 'mdi:facebook',
  Instagram: 'mdi:instagram',
  LinkedIn: 'mdi:linkedin',
  Twitter: 'mdi:twitter',
}
