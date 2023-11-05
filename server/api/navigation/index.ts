import type { FooterNavigation, HeaderNavigation } from '~/types/Navigation'

export default defineEventHandler((event) => {
  const query = getQuery(event)

  const footerNavigation: FooterNavigation = {
    opportunities: [
      { name: 'Networking', href: '#' },
      { name: 'Business Growth', href: '#' },
      { name: 'Member Benefits', href: '#' },
      { name: 'Testimonials', href: '#' },
    ],
    resources: [
      { name: 'FAQs', href: '#' },
      { name: 'How To Join', href: '#' },
      { name: 'Spotlights', href: '/spotlights' },
      { name: 'Member Dashboard', href: '#' },
    ],
    about: [
      { name: 'About Us', href: '/about' },
      { name: 'Team', href: '#' },
      { name: 'Events', href: '#' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],

    social: [
      {
        name: 'Facebook',
        href: 'https://www.facebook.com/RocklandEliteBusinessConnections/',
        icon: 'line-md:facebook',
      },
      {
        name: 'Instagram',
        href: 'https://www.instagram.com/elite_business_connections/',
        icon: 'line-md:instagram',
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com/EliteBizCon',
        icon: 'line-md:twitter-x',
      },
      {
        name: 'Linkedin',
        href: 'https://www.linkedin.com/company/70982919',
        icon: 'line-md:linkedin',
      },
    ],
  }

  const headerNavigation: HeaderNavigation[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Spotlights', href: '/spotlights' },
    { name: 'Contact', href: '/contact' },
  ]

  const navType = query.navType
  if (navType === 'footer') {
    return footerNavigation
  } else {
    return headerNavigation
  }
})
