<script setup lang="ts">
import { ref, reactive } from '#imports'
import { showToast } from '~/utils/showToast'

definePageMeta({
  layout: 'admin',
})

const sections = ref([
  { id: 'testimonials', label: 'Testimonials', page: 'home' },
  { id: 'stats', label: 'Statistics', page: 'home' },
  { id: 'core-values', label: 'Core Values', page: 'home' },
  { id: 'members', label: 'Team Members', page: 'home' },
])

const selectedSection = ref<{ id: string; label: string; page: string } | null>(
  null
)
const jsonContent = ref('')
const isSaving = ref(false)
const isSeeding = ref(false)
const jsonValid = ref(true)
const jsonError = ref('')

// This will help manage JSON editor state
const editorOptions = {
  mode: 'code',
  onEditable: () => true,
}

function selectSection(section) {
  selectedSection.value = section
  fetchSectionContent(section.page, section.id)
}

async function fetchSectionContent(pageId, sectionId) {
  try {
    const response = await $fetch(`/api/pages/${pageId}/${sectionId}`)

    if (response.statusCode === 200) {
      // Format the JSON with 2 spaces indentation
      jsonContent.value = JSON.stringify(response.data, null, 2)
      jsonValid.value = true
      jsonError.value = ''
    } else {
      // If 404, provide a template
      if (response.statusCode === 404) {
        // Provide default template based on section
        if (sectionId === 'testimonials') {
          jsonContent.value = JSON.stringify(
            [
              {
                id: 1,
                author: 'John Doe',
                position: 'CEO',
                company: 'Company Name',
                text: 'This is a sample testimonial.',
                image: '/path/to/image.jpg',
              },
            ],
            null,
            2
          )
        } else if (sectionId === 'stats') {
          jsonContent.value = JSON.stringify(
            [
              {
                id: 1,
                value: '95%',
                label: 'Client Satisfaction',
                description: 'Sample description',
              },
            ],
            null,
            2
          )
        } else if (sectionId === 'core-values') {
          jsonContent.value = JSON.stringify(
            [
              {
                id: 1,
                title: 'Integrity',
                description: 'We believe in doing the right thing.',
                icon: 'i-heroicons-shield-check',
              },
            ],
            null,
            2
          )
        } else if (sectionId === 'members') {
          jsonContent.value = JSON.stringify(
            [
              {
                id: 1,
                name: 'Jane Doe',
                title: 'Position',
                bio: 'Sample bio text',
                image: '/path/to/member.jpg',
                socialLinks: {
                  linkedin: 'https://linkedin.com/in/username',
                  twitter: 'https://twitter.com/username',
                },
              },
            ],
            null,
            2
          )
        } else {
          jsonContent.value = '[]'
        }
        jsonValid.value = true
        jsonError.value = ''
      } else {
        await showToast(
          'fetch_error',
          'red',
          'Error',
          `Failed to fetch content: ${response.error}`,
          'i-heroicons-exclamation-circle'
        )
      }
    }
  } catch (error) {
    console.error('Error fetching section content:', error)
    await showToast(
      'fetch_error',
      'red',
      'Error',
      'Failed to fetch content',
      'i-heroicons-exclamation-circle'
    )
  }
}

function validateJSON() {
  try {
    JSON.parse(jsonContent.value)
    jsonValid.value = true
    jsonError.value = ''
    return true
  } catch (error) {
    jsonValid.value = false
    jsonError.value = error.message
    return false
  }
}

async function saveContent() {
  if (!selectedSection.value) {
    await showToast(
      'save_error',
      'red',
      'Error',
      'Please select a section to edit',
      'i-heroicons-exclamation-circle'
    )
    return
  }

  if (!validateJSON()) {
    await showToast(
      'save_error',
      'red',
      'Error',
      'Invalid JSON. Please fix errors before saving.',
      'i-heroicons-exclamation-circle'
    )
    return
  }

  isSaving.value = true

  try {
    const { page, id } = selectedSection.value
    const response = await $fetch(`/api/pages/${page}/${id}`, {
      method: 'PUT',
      body: {
        content: JSON.parse(jsonContent.value),
      },
    })

    if (response.statusCode === 200) {
      await showToast(
        'save_success',
        'green',
        'Success',
        'Content saved successfully',
        'i-heroicons-check-badge'
      )
    } else {
      await showToast(
        'save_error',
        'red',
        'Error',
        `Failed to save content: ${response.error}`,
        'i-heroicons-exclamation-circle'
      )
    }
  } catch (error) {
    console.error('Error saving content:', error)
    await showToast(
      'save_error',
      'red',
      'Error',
      'Failed to save content',
      'i-heroicons-exclamation-circle'
    )
  } finally {
    isSaving.value = false
  }
}

async function runSeed() {
  isSeeding.value = true
  try {
    const response = await $fetch('/api/pages/seed')

    if (response.statusCode === 200) {
      await showToast(
        'seed_success',
        'green',
        'Success',
        'Default content loaded successfully',
        'i-heroicons-check-badge'
      )

      // If a section is selected, refresh its content
      if (selectedSection.value) {
        fetchSectionContent(
          selectedSection.value.page,
          selectedSection.value.id
        )
      }
    } else {
      await showToast(
        'seed_error',
        'red',
        'Error',
        `Failed to load default content: ${response.error}`,
        'i-heroicons-exclamation-circle'
      )
    }
  } catch (error) {
    console.error('Error loading default content:', error)
    await showToast(
      'seed_error',
      'red',
      'Error',
      'Failed to load default content',
      'i-heroicons-exclamation-circle'
    )
  } finally {
    isSeeding.value = false
  }
}
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Page Content Management</h1>
      <UButton
        color="gray"
        @click="runSeed"
        :loading="isSeeding"
        icon="i-heroicons-arrow-path"
        title="Load default content for all sections"
      >
        Load Default Content
      </UButton>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Sidebar with sections -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 class="text-lg font-semibold mb-4">Content Sections</h2>
        <div class="space-y-2">
          <UButton
            v-for="section in sections"
            :key="section.id"
            :class="[
              'w-full justify-start',
              selectedSection?.id === section.id
                ? 'bg-primary-500'
                : 'bg-gray-100 dark:bg-gray-700',
            ]"
            :color="selectedSection?.id === section.id ? 'white' : 'gray'"
            @click="selectSection(section)"
          >
            {{ section.label }}
          </UButton>
        </div>
      </div>

      <!-- Content editor -->
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:col-span-3"
      >
        <div v-if="selectedSection">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">
              Editing: {{ selectedSection.label }}
            </h2>
            <div class="flex gap-2">
              <UButton
                color="primary"
                :loading="isSaving"
                :disabled="!jsonValid"
                @click="saveContent"
              >
                Save Changes
              </UButton>
            </div>
          </div>

          <div class="mb-4">
            <UAlert
              v-if="!jsonValid"
              color="red"
              title="Invalid JSON"
              :description="jsonError"
              icon="i-heroicons-exclamation-triangle"
            />
          </div>

          <UTextarea
            class="font-mono text-sm"
            v-model="jsonContent"
            rows="20"
            :error="!jsonValid"
            @blur="validateJSON"
          />

          <div class="mt-4">
            <p class="text-xs text-gray-500">
              Edit the JSON above to update the content. Click "Save Changes"
              when done.
            </p>
          </div>
        </div>
        <div class="flex items-center justify-center h-64" v-else>
          <p class="text-gray-500">Select a section to edit from the sidebar</p>
        </div>
      </div>
    </div>
  </div>
</template>
