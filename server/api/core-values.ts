export default defineEventHandler(() => {
  interface CoreValues {
    name: string
    icon: string
    description: string
  }

  const coreValues: CoreValues[] = [
    {
      name: 'Business Integrity',
      description:
        'We prioritize honesty, transparency, and ethical conduct in all our relationships.',
      icon: 'heroicons:hand-raised',
    },
    {
      name: 'Collaborative Growth',
      description:
        'We believe in the power of collective growth, where each member’s success contributes to the whole.',
      icon: 'heroicons:user-group',
    },
    {
      name: 'Continuous Learning',
      description:
        'We embrace a culture of continuous learning and improvement, both personally and professionally.',
      icon: 'heroicons:academic-cap',
    },
    {
      name: 'Community Building',
      description:
        'We aim to build a community that supports and uplifts each other in every endeavor.',
      icon: 'heroicons:home',
    },
    {
      name: 'Value Creation',
      description:
        'We focus on creating tangible value for our members through high-quality referrals, networking, and resources.',
      icon: 'heroicons:sparkles',
    },
    {
      name: 'Work-Life Balance',
      description:
        'We understand the importance of a healthy work-life balance and encourage our members to prioritize it.',
      icon: 'heroicons:sun',
    },
  ]
  return { coreValues }
})
