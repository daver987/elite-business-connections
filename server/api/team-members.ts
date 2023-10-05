export default defineEventHandler(() => {
  type SocialPlatform = 'Facebook' | 'Instagram'

  interface SocialLink {
    platform: SocialPlatform
    url: string
  }

  interface Member {
    name: string
    role: string
    imageUrl: string
    social: SocialLink[]
  }

  const members: Member[] = [
    {
      name: 'Anik Lalonde',
      role: 'Treasurer',
      imageUrl: '/images/member-one-enhanced.jpeg',
      social: [
        {
          platform: 'Facebook',
          url: 'https://www.facebook.com/Kinahealthrockland/',
        },
        {
          platform: 'Instagram',
          url: 'https://www.instagram.com/kinahealthrockland',
        },
      ],
    },
    {
      name: 'Rachelle Lodge',
      role: 'President',
      imageUrl: '/images/member-three-enhanced.jpeg',
      social: [
        {
          platform: 'Facebook',
          url: 'https://www.facebook.com/rachelle.montgomery.9',
        },
      ],
    },
    {
      name: 'Patrick Cobban',
      role: 'Vice President',
      imageUrl: '/images/member-two-enhanced.jpeg',
      social: [
        {
          platform: 'Facebook',
          url: 'https://www.facebook.com/PCobbanAllstate',
        },
        {
          platform: 'Instagram',
          url: 'https://www.instagram.com/patcobbaninsurance',
        },
      ],
    },
  ]

  const socialIcons: Record<SocialPlatform, string> = {
    Facebook: 'logos:facebook',
    Instagram: 'skill-icons:instagram',
  }
  return {
    members,
    socialIcons,
  }
})
