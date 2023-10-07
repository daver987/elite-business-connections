export default defineEventHandler((event) => {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Spotlights', href: '/spotlights' },
    { name: 'Contact', href: '/contact' },
  ]
  return { navigation }
})
