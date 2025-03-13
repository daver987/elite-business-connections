import prisma from '~/lib/prisma'

// Seed data for core values
const coreValues = [
  {
    id: 1,
    title: 'Reliability',
    description:
      'We prioritize building reliable, trust-based relationships that our members can count on.',
    icon: 'i-heroicons-shield-check',
  },
  {
    id: 2,
    title: 'Excellence',
    description:
      'We strive for excellence in everything we do, from member connections to event organization.',
    icon: 'i-heroicons-star',
  },
  {
    id: 3,
    title: 'Growth',
    description:
      'We foster a culture that promotes business and personal growth for all members.',
    icon: 'i-heroicons-arrow-trending-up',
  },
  {
    id: 4,
    title: 'Exclusivity',
    description:
      'We maintain exclusivity to ensure our members receive high-quality referrals and opportunities.',
    icon: 'i-heroicons-key',
  },
]

// Seed data for team members
const teamMembers = [
  {
    id: 1,
    name: 'Rachelle Lodge',
    title: 'President',
    bio: 'Leading EBC with vision and dedication.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    socialLinks: {
      facebook: 'https://facebook.com',
    },
  },
  {
    id: 2,
    name: 'Anik Lalonde',
    title: 'Treasurer',
    bio: "Managing EBC's finances with precision and integrity.",
    image:
      'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    socialLinks: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: 3,
    name: 'Patrick Cobban',
    title: 'Vice President',
    bio: 'Helping guide EBC toward continued success and growth.',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    socialLinks: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
  },
]

// Seed data for testimonials
const testimonials = [
  {
    id: 1,
    quote:
      'Before joining EBC, I was new in business, had no mentors or business partners and was very nervous of where my business would take me. Now looking back 3 years in, it was the best decision I made. My business would never be this successful without the help and support of each and every member.',
    author: 'Patrick Cobban',
    occupation: 'Insurance Agent',
    organization: 'Elite Business Connections',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 2,
    quote:
      'Joining Elite Business Connections has been a game-changer for my business, offering unparalleled networking opportunities, exclusive events, and invaluable insights that have significantly propelled my growth.',
    author: 'David Harmer',
    occupation: 'Chief Executive Officer',
    organization: 'Elite Business Connections',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 3,
    quote:
      "As a founding member of EBC, and I can confidently say that it has been a game-changer for my business. The connections I've made, the knowledge I've gained, and the opportunities that have arisen through this group are unparalleled. EBC truly fosters a supportive and collaborative environment that has helped me grow both personally and professionally. I highly recommend EBC to anyone looking to expand their network and take their business to the next level.",
    author: 'Guy Dery',
    occupation: 'Owner / Carpenter',
    organization: 'Elite Business Connections',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
]

// Stats data
const stats = [
  {
    id: 1,
    value: '50+',
    label: 'Active Members',
    description: 'Professional business connections in our network',
  },
  {
    id: 2,
    value: '100+',
    label: 'Monthly Referrals',
    description: 'Quality business leads shared between members',
  },
  {
    id: 3,
    value: '25+',
    label: 'Business Categories',
    description: 'Diverse range of industries represented',
  },
  {
    id: 4,
    value: '6+',
    label: 'Years of Excellence',
    description: 'Building strong business relationships since 2018',
  },
]

/**
 * Endpoint to seed the database with initial page content
 * This should only be accessible in development mode
 */
export default defineEventHandler(async (event) => {
  try {
    // In a real production app, we'd add a safety check here
    // For now, we'll allow seeding regardless of environment

    // Create or update core values
    await prisma.pageContent.upsert({
      where: {
        pageId_sectionId: {
          pageId: 'home',
          sectionId: 'core-values',
        },
      },
      update: {
        content: coreValues,
      },
      create: {
        pageId: 'home',
        sectionId: 'core-values',
        content: coreValues,
      },
    })

    // Create or update team members
    await prisma.pageContent.upsert({
      where: {
        pageId_sectionId: {
          pageId: 'home',
          sectionId: 'members',
        },
      },
      update: {
        content: teamMembers,
      },
      create: {
        pageId: 'home',
        sectionId: 'members',
        content: teamMembers,
      },
    })

    // Create or update testimonials
    await prisma.pageContent.upsert({
      where: {
        pageId_sectionId: {
          pageId: 'home',
          sectionId: 'testimonials',
        },
      },
      update: {
        content: testimonials,
      },
      create: {
        pageId: 'home',
        sectionId: 'testimonials',
        content: testimonials,
      },
    })

    // Create or update stats
    await prisma.pageContent.upsert({
      where: {
        pageId_sectionId: {
          pageId: 'home',
          sectionId: 'stats',
        },
      },
      update: {
        content: stats,
      },
      create: {
        pageId: 'home',
        sectionId: 'stats',
        content: stats,
      },
    })

    return {
      statusCode: 200,
      message: 'Seed data successfully created',
      sections: ['core-values', 'members', 'testimonials', 'stats'],
    }
  } catch (error) {
    console.error('Error seeding page content:', error)
    return {
      statusCode: 500,
      error: 'Failed to seed page content',
    }
  }
})
