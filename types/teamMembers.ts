type SocialPlatform = 'Facebook' | 'Instagram'

export interface SocialLink {
  platform: SocialPlatform
  url: string
}

export interface Member {
  name: string
  role: string
  imageUrl: string
  social: SocialLink[]
}
