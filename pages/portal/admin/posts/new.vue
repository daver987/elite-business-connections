<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { refDebounced } from '@vueuse/core'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import slugify from 'slugify'

definePageMeta({
  layout: 'portal',
})

// Form validation schema
const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
  published: z.boolean().default(false),
  featuredImage: z.string().optional(),
})

type Schema = z.output<typeof schema>

// Form state
const state = reactive({
  title: '',
  content: '<p></p>',
  excerpt: '',
  slug: '',
  published: false,
  featuredImage: '',
})

// Media management
const showMediaModal = ref(false)
const selectedMedia = ref<string | null>(null)
const mediaType = ref<'featured' | null>(null)
const linkUrl = ref('')

// Loading states
const saving = ref(false)
const mediaLoading = ref(false)

// Toast notifications
const toast = useToast()

// Preview modal
const showPreviewModal = ref(false)

// Tiptap editor configuration
const editor = useEditor({
  content: state.content,
  extensions: [
    StarterKit,
    Image,
    Link.configure({
      HTMLAttributes: {
        class: 'text-primary-500 hover:text-primary-700 underline',
        target: '_blank',
      },
    }),
    Placeholder.configure({
      placeholder: 'Write your post content here...',
    }),
  ],
  onUpdate: ({ editor }) => {
    state.content = editor.getHTML()
  },
})

// Cleanup editor on component unmount
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

// Generate slug from title
watch(
  () => state.title,
  (newTitle) => {
    if (newTitle) {
      state.slug = slugify(newTitle, { lower: true, strict: true })
    } else {
      state.slug = ''
    }
  }
)

// Add image to editor
const addImage = (url: string) => {
  if (editor.value) {
    editor.value.chain().focus().setImage({ src: url }).run()
  }
}

// Open media modal to select media
const openMediaModal = (type: 'featured' | null = null) => {
  mediaType.value = type
  selectedMedia.value = null
  showMediaModal.value = true
}

// Handle media selection confirmation
const confirmMediaSelection = () => {
  if (!selectedMedia.value) {
    return
  }

  if (mediaType.value === 'featured') {
    state.featuredImage = selectedMedia.value
  } else {
    // Insert image into editor
    addImage(selectedMedia.value)
  }

  showMediaModal.value = false
}

// Editor actions
const toggleBold = () => editor.value?.chain().focus().toggleBold().run()
const toggleItalic = () => editor.value?.chain().focus().toggleItalic().run()
const toggleBulletList = () =>
  editor.value?.chain().focus().toggleBulletList().run()
const toggleOrderedList = () =>
  editor.value?.chain().focus().toggleOrderedList().run()
const toggleHeading2 = () =>
  editor.value?.chain().focus().toggleHeading({ level: 2 }).run()
const toggleHeading3 = () =>
  editor.value?.chain().focus().toggleHeading({ level: 3 }).run()
const toggleCodeBlock = () =>
  editor.value?.chain().focus().toggleCodeBlock().run()
const toggleCode = () => editor.value?.chain().focus().toggleCode().run()
const toggleBlockquote = () =>
  editor.value?.chain().focus().toggleBlockquote().run()
const addHorizontalRule = () =>
  editor.value?.chain().focus().setHorizontalRule().run()
const unsetLink = () =>
  editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()
const setLink = (close: () => void) => {
  editor.value?.chain().focus().setLink({ href: linkUrl.value }).run()
  linkUrl.value = ''
  close()
}

// Form submission
const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  saving.value = true
  try {
    const response = await $fetch('/api/posts', {
      method: 'POST',
      body: event.data,
    })

    if (response.statusCode === 201) {
      toast.add({
        title: 'Success',
        description: 'Post saved successfully',
        icon: 'i-heroicons-check-circle',
        color: 'green',
        timeout: 5000,
      })

      // Redirect to posts list
      navigateTo('/portal/admin/posts')
    } else {
      console.error('Error saving post:', response.error || 'Unknown error')
      toast.add({
        title: 'Error',
        description: response.error || 'Failed to save post. Please try again.',
        icon: 'i-heroicons-exclamation-circle',
        color: 'red',
        timeout: 5000,
      })
    }
  } catch (error) {
    console.error('Error saving post:', error)
    toast.add({
      title: 'Error',
      description: 'Failed to save post. Please try again.',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
      timeout: 5000,
    })
  } finally {
    saving.value = false
  }
}

// Preview post
const previewPost = () => {
  showPreviewModal.value = true
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Create New Post">
        <template #right>
          <div class="flex items-center gap-2">
            <UButton
              icon="i-heroicons-arrow-left"
              color="gray"
              variant="ghost"
              to="/portal/admin/posts"
            />
            <UButton
              icon="i-heroicons-eye"
              label="Preview"
              color="gray"
              @click="previewPost"
            />
            <UButton
              icon="i-heroicons-document-check"
              label="Save"
              color="primary"
              type="submit"
              form="post-form"
              :loading="saving"
            />
          </div>
        </template>
      </UDashboardNavbar>

      <UDashboardPanelContent>
        <div class="p-6">
          <UForm
            class="space-y-6"
            id="post-form"
            :schema="schema"
            :state="state"
            @submit="onSubmit"
          >
            <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
              <!-- Main content area -->
              <div class="md:col-span-2 space-y-6">
                <UCard>
                  <template #header>
                    <div class="font-medium">Post Content</div>
                  </template>

                  <!-- Title -->
                  <div class="mb-6">
                    <UFormGroup label="Post Title" name="title" required>
                      <UInput
                        v-model="state.title"
                        placeholder="Enter post title"
                        size="lg"
                      />
                    </UFormGroup>
                  </div>

                  <!-- Content Editor -->
                  <div class="mb-6">
                    <UFormGroup label="Post Content" name="content" required>
                      <div class="min-h-[400px] border rounded-lg p-4">
                        <ClientOnly>
                          <div class="tiptap-wrapper" v-if="editor">
                            <div
                              class="tiptap-toolbar border-b pb-2 mb-4 flex flex-wrap gap-2"
                            >
                              <UButton
                                color="gray"
                                variant="ghost"
                                size="xs"
                                icon="i-heroicons-bold"
                                :class="{
                                  'bg-gray-100 dark:bg-gray-800':
                                    editor.isActive('bold'),
                                }"
                                @click="toggleBold"
                              />
                              <UButton
                                color="gray"
                                variant="ghost"
                                size="xs"
                                icon="i-heroicons-italic"
                                :class="{
                                  'bg-gray-100 dark:bg-gray-800':
                                    editor.isActive('italic'),
                                }"
                                @click="toggleItalic"
                              />
                              <UButton
                                color="gray"
                                variant="ghost"
                                size="xs"
                                icon="i-heroicons-list-bullet"
                                :class="{
                                  'bg-gray-100 dark:bg-gray-800':
                                    editor.isActive('bulletList'),
                                }"
                                @click="toggleBulletList"
                              />
                              <UButton
                                color="gray"
                                variant="ghost"
                                size="xs"
                                icon="i-heroicons-list-decimal"
                                :class="{
                                  'bg-gray-100 dark:bg-gray-800':
                                    editor.isActive('orderedList'),
                                }"
                                @click="toggleOrderedList"
                              />
                              <UButton
                                color="gray"
                                variant="ghost"
                                size="xs"
                                icon="i-heroicons-heading"
                                :class="{
                                  'bg-gray-100 dark:bg-gray-800':
                                    editor.isActive('heading', {
                                      level: 2,
                                    }),
                                }"
                                @click="toggleHeading2"
                              >
                                H2
                              </UButton>
                              <UButton
                                color="gray"
                                variant="ghost"
                                size="xs"
                                icon="i-heroicons-heading"
                                :class="{
                                  'bg-gray-100 dark:bg-gray-800':
                                    editor.isActive('heading', {
                                      level: 3,
                                    }),
                                }"
                                @click="toggleHeading3"
                              >
                                H3
                              </UButton>
                              <UButton
                                color="gray"
                                variant="ghost"
                                size="xs"
                                icon="i-heroicons-photo"
                                @click="openMediaModal()"
                              />
                              <UButton
                                v-if="editor.isActive('link')"
                                color="gray"
                                variant="ghost"
                                size="xs"
                                icon="i-heroicons-link"
                                :class="{
                                  'bg-gray-100 dark:bg-gray-800':
                                    editor.isActive('link'),
                                }"
                                @click="unsetLink"
                              />
                              <UPopover v-else>
                                <UButton
                                  color="gray"
                                  variant="ghost"
                                  size="xs"
                                  icon="i-heroicons-link"
                                />
                                <template #panel="{ close }">
                                  <div class="p-4 w-80">
                                    <UFormGroup label="Link URL">
                                      <UInput
                                        v-model="linkUrl"
                                        placeholder="https://example.com"
                                      />
                                    </UFormGroup>
                                    <div class="mt-4 flex justify-end gap-2">
                                      <UButton
                                        size="sm"
                                        color="gray"
                                        variant="ghost"
                                        @click="close"
                                      >
                                        Cancel
                                      </UButton>
                                      <UButton
                                        size="sm"
                                        color="primary"
                                        @click="setLink(close)"
                                      >
                                        Add Link
                                      </UButton>
                                    </div>
                                  </div>
                                </template>
                              </UPopover>
                              <UButton
                                color="gray"
                                variant="ghost"
                                size="xs"
                                icon="i-heroicons-code-bracket"
                                :class="{
                                  'bg-gray-100 dark:bg-gray-800':
                                    editor.isActive('codeBlock'),
                                }"
                                @click="toggleCodeBlock"
                              />
                              <UButton
                                color="gray"
                                variant="ghost"
                                size="xs"
                                icon="i-heroicons-code-bracket-square"
                                :class="{
                                  'bg-gray-100 dark:bg-gray-800':
                                    editor.isActive('code'),
                                }"
                                @click="toggleCode"
                              />
                              <UButton
                                color="gray"
                                variant="ghost"
                                size="xs"
                                icon="i-heroicons-quote-right"
                                :class="{
                                  'bg-gray-100 dark:bg-gray-800':
                                    editor.isActive('blockquote'),
                                }"
                                @click="toggleBlockquote"
                              />
                              <UButton
                                color="gray"
                                variant="ghost"
                                size="xs"
                                icon="i-heroicons-horizontal-rule"
                                @click="addHorizontalRule"
                              />
                            </div>
                            <TiptapEditor
                              class="prose prose-sm max-w-none min-h-[300px] dark:prose-invert"
                              :editor="editor"
                            />
                          </div>
                          <div
                            class="flex items-center justify-center h-[300px]"
                            v-else
                          >
                            <UIcon
                              class="animate-spin h-6 w-6"
                              name="i-heroicons-arrow-path"
                            />
                            <span class="ml-2">Loading editor...</span>
                          </div>
                        </ClientOnly>
                      </div>
                    </UFormGroup>
                  </div>

                  <!-- Excerpt -->
                  <div class="mb-6">
                    <UFormGroup label="Excerpt (optional)" name="excerpt">
                      <UTextarea
                        v-model="state.excerpt"
                        placeholder="Enter a short summary of the post"
                        :rows="3"
                      />
                      <template #hint>
                        <span class="text-xs text-gray-500">
                          This will be displayed in post previews. If left
                          empty, the beginning of the post content will be used.
                        </span>
                      </template>
                    </UFormGroup>
                  </div>
                </UCard>
              </div>

              <!-- Sidebar -->
              <div class="space-y-6">
                <!-- Publication Settings -->
                <UCard>
                  <template #header>
                    <div class="font-medium">Publication Settings</div>
                  </template>

                  <div class="space-y-4">
                    <!-- Slug -->
                    <UFormGroup label="Post URL Slug" name="slug">
                      <UInput
                        v-model="state.slug"
                        placeholder="post-url-slug"
                        :prefix="'/spotlights/'"
                        :ui="{ prefix: { padding: 'pl-2 pr-1' } }"
                      />
                      <template #hint>
                        <span class="text-xs text-gray-500">
                          URL-friendly version of the title. Automatically
                          generated but can be edited.
                        </span>
                      </template>
                    </UFormGroup>

                    <!-- Publication Status -->
                    <UFormGroup label="Status" name="published">
                      <UToggle
                        v-model="state.published"
                        :on-icon="'i-heroicons-eye'"
                        :off-icon="'i-heroicons-eye-slash'"
                      >
                        <span v-if="state.published">Published</span>
                        <span v-else>Draft</span>
                      </UToggle>
                      <template #hint>
                        <span class="text-xs text-gray-500">
                          Draft posts are only visible to admins. Published
                          posts are public.
                        </span>
                      </template>
                    </UFormGroup>
                  </div>
                </UCard>

                <!-- Featured Image -->
                <UCard>
                  <template #header>
                    <div class="font-medium">Featured Image</div>
                  </template>

                  <div class="space-y-4">
                    <div
                      class="relative aspect-video bg-gray-100 rounded-lg overflow-hidden"
                      v-if="state.featuredImage"
                    >
                      <img
                        class="w-full h-full object-cover"
                        :src="state.featuredImage"
                        alt="Featured image"
                      />
                      <button
                        class="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                        @click="state.featuredImage = ''"
                      >
                        <UIcon
                          class="w-4 h-4 text-gray-500"
                          name="i-heroicons-x-mark"
                        />
                      </button>
                    </div>
                    <UButton
                      v-else
                      block
                      color="gray"
                      variant="ghost"
                      icon="i-heroicons-photo"
                      @click="openMediaModal('featured')"
                    >
                      Select Featured Image
                    </UButton>
                    <div class="text-xs text-gray-500">
                      Featured image will be displayed at the top of the post
                      and in post previews.
                    </div>
                  </div>
                </UCard>
              </div>
            </div>
          </UForm>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>

    <!-- Media Selection Modal -->
    <UModal v-model="showMediaModal" :ui="{ width: 'max-w-5xl' }">
      <UCard>
        <template #header>
          <div class="font-medium">Select Media</div>
        </template>
        <div class="min-h-[400px]">
          <div
            class="flex justify-center items-center h-64"
            v-if="mediaLoading"
          >
            <UIcon
              class="animate-spin h-8 w-8 text-gray-400"
              name="i-heroicons-arrow-path"
            />
          </div>
          <div class="grid grid-cols-3 gap-4" v-else>
            <!-- This would be populated with actual media items from the API -->
            <div
              class="aspect-video bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all"
              v-for="i in 9"
              :key="i"
              :class="{
                'ring-2 ring-primary-500':
                  selectedMedia === `/placeholder-${i}.jpg`,
              }"
              @click="selectedMedia = `/placeholder-${i}.jpg`"
            >
              <img
                class="w-full h-full object-cover"
                :src="`https://picsum.photos/seed/${i}/300/200`"
                alt="Media item"
              />
            </div>
          </div>
        </div>
        <template #footer>
          <div class="flex justify-between">
            <UButton
              color="gray"
              variant="ghost"
              @click="showMediaModal = false"
            >
              Cancel
            </UButton>
            <UButton
              color="primary"
              :disabled="!selectedMedia"
              @click="confirmMediaSelection"
            >
              Select
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Preview Modal -->
    <PostPreviewModal v-model="showPreviewModal" :post="state" />
  </UDashboardPage>
</template>
