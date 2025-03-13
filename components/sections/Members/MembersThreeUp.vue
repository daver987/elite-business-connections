<script setup lang="ts">
type SocialPlatform = 'Facebook' | 'Instagram' | 'LinkedIn' | 'Twitter'

interface SocialLinks {
  facebook?: string
  instagram?: string
  linkedin?: string
  twitter?: string
}

interface TeamMember {
  id: number
  name: string
  title: string
  bio: string
  image: string
  socialLinks: SocialLinks
}

interface ApiResponse {
  statusCode: number
  data?: TeamMember[]
  error?: string
}

const defaultMembers: TeamMember[] = [
  {
    id: 1,
    name: "Rachelle Lodge",
    title: "President",
    bio: "Leading EBC with vision and dedication.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    socialLinks: {
      facebook: "https://facebook.com"
    }
  },
  {
    id: 2,
    name: "Anik Lalonde",
    title: "Treasurer",
    bio: "Managing EBC's finances with precision and integrity.",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com"
    }
  },
  {
    id: 3,
    name: "Patrick Cobban",
    title: "Vice President",
    bio: "Helping guide EBC toward continued success and growth.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com"
    }
  }
]

const { data: apiResponse } = useLazyFetch<ApiResponse>('/api/pages/home/members', {
  default: () => ({ 
    statusCode: 200, 
    data: defaultMembers 
  })
})

const members = computed(() => 
  apiResponse.value?.data && apiResponse.value.statusCode === 200
    ? apiResponse.value.data
    : defaultMembers
)

const socialIcons: Record<string, string> = {
  facebook: 'logos:facebook',
  instagram: 'skill-icons:instagram',
  linkedin: 'logos:linkedin-icon',
  twitter: 'logos:twitter'
}
</script>

<template>
  <section class="py-24 bg-gray-900 sm:py-32">
    <UContainer class="text-center">
      <div class="mx-auto max-w-2xl">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Meet the Architects of Success
        </h2>
        <p class="mt-4 text-lg leading-8 text-gray-400">
          Our dedicated team of professionals is committed to propelling your
          business to new heights through strategic networking and connections.
        </p>
      </div>
      <ul
        class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
        role="list"
      >
        <li
          class="rounded-2xl bg-gray-800 px-8 py-10"
          v-for="member in members"
          :key="member.id"
        >
          <img
            class="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56 object-cover object-top"
            :src="member.image"
            :alt="member.name"
          />
          <h3
            class="mt-6 text-base font-semibold leading-7 tracking-tight text-white"
          >
            {{ member.name }}
          </h3>
          <p class="text-sm leading-6 text-gray-400">{{ member.title }}</p>
          <p v-if="member.bio" class="mt-2 text-xs text-gray-500">{{ member.bio }}</p>
          <ul class="mt-6 flex justify-center gap-x-6" role="list">
            <!-- Loop through the socialLinks object -->
            <template v-for="(url, platform) in member.socialLinks" :key="platform">
              <li v-if="url">
                <a
                  :href="url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="sr-only">{{ platform }}</span>
                  <Icon class="w-6 h-6" :name="socialIcons[platform]" />
                </a>
              </li>
            </template>
          </ul>
        </li>
      </ul>
    </UContainer>
  </section>
</template>
