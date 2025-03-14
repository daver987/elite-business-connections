<script setup lang="ts">
import type { Post } from '~/types/Post'

const props = defineProps<{
  modelValue: boolean
  post: Partial<Post>
}>()

const emit = defineEmits(['update:modelValue'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

// Format date for display
const formatDate = (date: Date | string | undefined) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <UModal v-model="isOpen" :ui="{ width: 'max-w-4xl' }">
    <UCard>
      <template #header>
        <div class="font-medium">Post Preview</div>
      </template>
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">
          {{ post.title || 'Untitled Post' }}
        </h1>

        <div class="mb-6" v-if="post.featuredImage">
          <img
            class="w-full h-auto rounded-lg"
            :src="post.featuredImage"
            alt="Featured image"
          />
        </div>

        <div class="prose max-w-none" v-html="post.content"></div>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <UButton color="gray" @click="isOpen = false"> Close </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
