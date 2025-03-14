<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import slugify from 'slugify'

definePageMeta({
  layout: 'admin',
})

// Form state
const form = reactive({
  title: '',
  content: '<p></p>',
  excerpt: '',
  featuredImage: '',
  slug: '',
  published: false,
})

// Post validation
const titleErrors = ref<string[]>([])
const contentErrors = ref<string[]>([])

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

// Tiptap editor configuration
const editor = useEditor({
  content: form.content,
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
    form.content = editor.getHTML()
    validateContent()
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
  () => form.title,
  (newTitle) => {
    if (newTitle) {
      form.slug = slugify(newTitle, { lower: true, strict: true })
    } else {
      form.slug = ''
    }
  }
)

// Validate form fields
const validateTitle = () => {
  titleErrors.value = []
  if (!form.title.trim()) {
    titleErrors.value.push('Title is required')
  }
  return titleErrors.value.length === 0
}

const validateContent = () => {
  contentErrors.value = []
  if (form.content === '<p></p>' || form.content === '') {
    contentErrors.value.push('Content is required')
  }
  return contentErrors.value.length === 0
}

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

/**
 * Media item interface
 */
interface MediaItem {
  filepath: string
  [key: string]: string | number | boolean | undefined
}

/**
 * @param media The media item to select
 */
const selectMedia = (media: MediaItem) => {
  selectedMedia.value = media.filepath
}

// Handle media selection confirmation
const confirmMediaSelection = () => {
  if (!selectedMedia.value) {
    return
  }

  if (mediaType.value === 'featured') {
    form.featuredImage = selectedMedia.value
  } else {
    // Insert image into editor
    addImage(selectedMedia.value)
  }

  showMediaModal.value = false
}

// Define API response type
type ApiResponse = {
  statusCode: number
  message?: string
  error?: string
  data?: Record<string, unknown>
}

// Save post to database
const savePost = async () => {
  const isValidTitle = validateTitle()
  const isValidContent = validateContent()

  if (!isValidTitle || !isValidContent) {
    toast.add({
      title: 'Validation Error',
      description: 'Please fix the form errors before saving',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
      timeout: 5000,
    })
    return
  }

  saving.value = true

  try {
    const response = await $fetch<ApiResponse>('/api/posts', {
      method: 'POST',
      body: {
        ...form,
      },
    })

    if (response.statusCode === 201) {
      toast.add({
        title: 'Success',
        description: 'Post saved successfully',
        icon: 'i-heroicons-check-circle',
        color: 'green',
        timeout: 5000,
      })

      // Redirect to post list or edit page
      navigateTo('/admin/posts')
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
</script>

<template>
  <ClientOnly>
    <div class="p-6">
      <div class="mb-6 flex items-center justify-between">
        <h1 class="text-2xl font-semibold">Create New Post</h1>
        <div class="flex gap-2">
          <UButton
            to="/admin/posts"
            variant="outline"
            color="gray"
            icon="i-heroicons-arrow-left"
          >
            Back
          </UButton>
          <UButton
            color="primary"
            icon="i-heroicons-check"
            :loading="saving"
            @click="savePost"
          >
            Save Post
          </UButton>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <!-- Main content area -->
        <div class="md:col-span-2 space-y-6">
          <UCard>
            <template #header>
              <div class="font-medium">Post Content</div>
            </template>

            <!-- Title -->
            <div class="mb-6">
              <UFormGroup
                label="Post Title"
                :error="titleErrors[0]"
                :required="true"
              >
                <UInput
                  v-model="form.title"
                  placeholder="Enter post title"
                  size="lg"
                  @blur="validateTitle"
                />
              </UFormGroup>
            </div>

            <!-- Content Editor -->
            <div class="mb-6">
              <UFormGroup
                label="Post Content"
                :error="contentErrors[0]"
                :required="true"
              >
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
                          :class="{ 'bg-gray-100': editor.isActive('bold') }"
                          @click="editor.chain().focus().toggleBold().run()"
                        />
                        <UButton
                          color="gray"
                          variant="ghost"
                          size="xs"
                          icon="i-heroicons-italic"
                          :class="{ 'bg-gray-100': editor.isActive('italic') }"
                          @click="editor.chain().focus().toggleItalic().run()"
                        />
                        <UButton
                          color="gray"
                          variant="ghost"
                          size="xs"
                          icon="i-heroicons-list-bullet"
                          :class="{
                            'bg-gray-100': editor.isActive('bulletList'),
                          }"
                          @click="
                            editor.chain().focus().toggleBulletList().run()
                          "
                        />
                        <UButton
                          color="gray"
                          variant="ghost"
                          size="xs"
                          icon="i-heroicons-list-decimal"
                          :class="{
                            'bg-gray-100': editor.isActive('orderedList'),
                          }"
                          @click="
                            editor.chain().focus().toggleOrderedList().run()
                          "
                        />
                        <UButton
                          color="gray"
                          variant="ghost"
                          size="xs"
                          icon="i-heroicons-heading"
                          :class="{
                            'bg-gray-100': editor.isActive('heading', {
                              level: 2,
                            }),
                          }"
                          @click="
                            editor
                              .chain()
                              .focus()
                              .toggleHeading({ level: 2 })
                              .run()
                          "
                        >
                          H2
                        </UButton>
                        <UButton
                          color="gray"
                          variant="ghost"
                          size="xs"
                          icon="i-heroicons-heading"
                          :class="{
                            'bg-gray-100': editor.isActive('heading', {
                              level: 3,
                            }),
                          }"
                          @click="
                            editor
                              .chain()
                              .focus()
                              .toggleHeading({ level: 3 })
                              .run()
                          "
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
                          :class="{ 'bg-gray-100': editor.isActive('link') }"
                          @click="
                            editor
                              .chain()
                              .focus()
                              .extendMarkRange('link')
                              .unsetLink()
                              .run()
                          "
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
                                  @click="
                                    editor
                                      .chain()
                                      .focus()
                                      .setLink({ href: linkUrl })
                                      .run()
                                    linkUrl = ''
                                    close()
                                  "
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
                            'bg-gray-100': editor.isActive('codeBlock'),
                          }"
                          @click="
                            editor.chain().focus().toggleCodeBlock().run()
                          "
                        />
                        <UButton
                          color="gray"
                          variant="ghost"
                          size="xs"
                          icon="i-heroicons-code-bracket-square"
                          :class="{ 'bg-gray-100': editor.isActive('code') }"
                          @click="editor.chain().focus().toggleCode().run()"
                        />
                        <UButton
                          color="gray"
                          variant="ghost"
                          size="xs"
                          icon="i-heroicons-quote-right"
                          :class="{
                            'bg-gray-100': editor.isActive('blockquote'),
                          }"
                          @click="
                            editor.chain().focus().toggleBlockquote().run()
                          "
                        />
                        <UButton
                          color="gray"
                          variant="ghost"
                          size="xs"
                          icon="i-heroicons-horizontal-rule"
                          @click="
                            editor.chain().focus().setHorizontalRule().run()
                          "
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
              <UFormGroup label="Excerpt (optional)">
                <UTextarea
                  v-model="form.excerpt"
                  placeholder="Enter a short summary of the post"
                  :rows="3"
                />
                <template #hint>
                  <span class="text-xs text-gray-500">
                    This will be displayed in post previews. If left empty, the
                    beginning of the post content will be used.
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
              <UFormGroup label="Post URL Slug">
                <UInput
                  v-model="form.slug"
                  placeholder="post-url-slug"
                  :prefix="'/spotlights/'"
                  :ui="{ prefix: { padding: 'pl-2 pr-1' } }"
                />
                <template #hint>
                  <span class="text-xs text-gray-500">
                    URL-friendly version of the title. Automatically generated
                    but can be edited.
                  </span>
                </template>
              </UFormGroup>

              <!-- Publication Status -->
              <UFormGroup label="Status">
                <UToggle
                  v-model="form.published"
                  :on-icon="'i-heroicons-eye'"
                  :off-icon="'i-heroicons-eye-slash'"
                >
                  <span v-if="form.published">Published</span>
                  <span v-else>Draft</span>
                </UToggle>
                <template #hint>
                  <span class="text-xs text-gray-500">
                    Draft posts are only visible to admins. Published posts are
                    public.
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

            <div>
              <div
                class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mb-4"
                v-if="!form.featuredImage"
              >
                <UIcon
                  class="h-12 w-12 text-gray-400 mx-auto mb-2"
                  name="i-heroicons-photo"
                />
                <p class="text-sm text-gray-500 mb-4">
                  No featured image selected
                </p>
                <UButton
                  size="sm"
                  color="gray"
                  @click="openMediaModal('featured')"
                >
                  Select Image
                </UButton>
              </div>
              <div class="mb-4" v-else>
                <img
                  class="mb-2 rounded"
                  :src="form.featuredImage"
                  alt="Featured image"
                />
                <div class="flex justify-end gap-2">
                  <UButton
                    size="xs"
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-pencil-square"
                    @click="openMediaModal('featured')"
                  >
                    Change
                  </UButton>
                  <UButton
                    size="xs"
                    color="red"
                    variant="ghost"
                    icon="i-heroicons-trash"
                    @click="form.featuredImage = ''"
                  >
                    Remove
                  </UButton>
                </div>
              </div>
              <p class="text-xs text-gray-500">
                This image will be displayed at the top of the post and in post
                lists.
              </p>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Media Library Modal -->
      <UModal v-model="showMediaModal" :ui="{ width: 'max-w-5xl' }">
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon class="text-primary-500" name="i-heroicons-photo" />
              <h3 class="text-lg font-medium">Media Library</h3>
            </div>
          </template>

          <div class="min-h-[400px]">
            <!-- Media Library goes here -->
            <!-- This should be a simplified version of the media library that allows selection -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <!-- Image items will go here -->
              <UCard
                class="cursor-pointer overflow-hidden"
                v-for="i in 8"
                :key="i"
                :class="{
                  'ring-2 ring-primary-500':
                    selectedMedia === `https://picsum.photos/seed/${i}/400/300`,
                }"
                @click="
                  selectMedia({
                    filepath: `https://picsum.photos/seed/${i}/400/300`,
                  })
                "
              >
                <div class="aspect-square relative overflow-hidden bg-gray-100">
                  <NuxtImg
                    class="h-full w-full object-cover"
                    :src="`https://picsum.photos/seed/${i}/400/300`"
                    alt="Sample image"
                  />
                </div>
              </UCard>
            </div>

            <!-- Loading state -->
            <div
              class="flex items-center justify-center h-[300px]"
              v-if="mediaLoading"
            >
              <UIcon
                class="animate-spin h-6 w-6"
                name="i-heroicons-arrow-path"
              />
              <span class="ml-2">Loading media...</span>
            </div>
          </div>

          <template #footer>
            <div class="flex justify-end gap-2">
              <UButton
                color="gray"
                variant="outline"
                @click="showMediaModal = false"
              >
                Cancel
              </UButton>
              <UButton
                color="primary"
                :disabled="!selectedMedia"
                @click="confirmMediaSelection"
              >
                Select Image
              </UButton>
            </div>
          </template>
        </UCard>
      </UModal>
    </div>
    <template #fallback>
      <div>
        <UIcon name="i-heroicons-exclamation-circle" />
        <span>Loading...</span>
      </div>
    </template>
  </ClientOnly>
</template>

<style>
.tiptap-wrapper .ProseMirror {
  outline: none;
  min-height: 300px;
}

.tiptap-wrapper .ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
</style>
