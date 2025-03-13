<script setup lang="ts">
import type { Media } from '~/types/Media'
import { refDebounced } from '@vueuse/core'

definePageMeta({
  layout: 'admin',
})

// Table columns
const columns = [
  {
    key: 'filename',
    label: 'File',
  },
  {
    key: 'mimetype',
    label: 'Type',
  },
  {
    key: 'size',
    label: 'Size',
  },
  {
    key: 'createdAt',
    label: 'Uploaded',
  },
  {
    key: 'actions',
    label: 'Actions',
    sortable: false,
  },
]

// State
const mediaFiles = ref<Media[]>([])
const loading = ref(true)
const search = ref('')
const page = ref(1)
const limit = ref(20)
const totalFiles = ref(0)
const totalPages = computed(() => Math.ceil(totalFiles.value / limit.value))
const filters = reactive({
  type: 'All',
  sortBy: 'createdAt:desc',
})
const viewMode = ref<'grid' | 'list'>('grid')

// File upload
const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const uploadFiles = ref<File[]>([])
const showUploadModal = ref(false)
const uploading = ref(false)

// File details and deletion
const selectedFile = ref<Media | null>(null)
const showFileDetailsModal = ref(false)
const fileToDelete = ref<Media | null>(null)
const showDeleteModal = ref(false)
const deleteLoading = ref(false)

// Format date for display
const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const k = 1024

// Format file size
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
}

// Check if file is an image
const isImage = (file: Media) => {
  return file.mimetype.startsWith('image/')
}

// Get file type display name
const getFileType = (file: Media) => {
  if (file.mimetype.startsWith('image/')) return 'Image'
  if (file.mimetype.includes('pdf')) return 'PDF'
  if (file.mimetype.includes('word')) return 'Word'
  if (file.mimetype.includes('excel') || file.mimetype.includes('spreadsheet'))
    return 'Excel'
  if (file.mimetype.includes('presentation')) return 'PowerPoint'
  if (file.mimetype.includes('text/')) return 'Text'
  return file.mimetype.split('/')[1] || 'File'
}

// Get file icon based on mimetype
const getFileIcon = (file: Media) => {
  if (file.mimetype.startsWith('image/')) return 'i-heroicons-photo'
  if (file.mimetype.includes('pdf') || file.mimetype.includes('word'))
    return 'i-heroicons-document-text'
  if (file.mimetype.includes('excel') || file.mimetype.includes('spreadsheet'))
    return 'i-heroicons-table-cells'
  if (file.mimetype.includes('presentation'))
    return 'i-heroicons-presentation-chart-bar'
  if (file.mimetype.includes('text/')) return 'i-heroicons-document'
  return 'i-heroicons-document'
}

// Get file icon by MIME type for upload preview
const getFileIconByType = (mimeType: string) => {
  if (mimeType.startsWith('image/')) return 'i-heroicons-photo'
  if (mimeType.includes('pdf') || mimeType.includes('word'))
    return 'i-heroicons-document-text'
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet'))
    return 'i-heroicons-table-cells'
  if (mimeType.includes('presentation'))
    return 'i-heroicons-presentation-chart-bar'
  if (mimeType.includes('text/')) return 'i-heroicons-document'
  return 'i-heroicons-document'
}

// Get file extension
const getFileExtension = (filename: string) => {
  return filename.split('.').pop() || ''
}

// Fetch media files
const fetchMedia = async () => {
  loading.value = true
  try {
    const queryParams = new URLSearchParams({
      page: page.value.toString(),
      limit: limit.value.toString(),
      search: search.value,
      type: filters.type === 'All' ? '' : filters.type.toLowerCase(),
      sort: filters.sortBy,
    })

    const response = await $fetch(`/api/media?${queryParams.toString()}`)

    // For now, using mock data until we have the actual API implementation
    if (!response || !Array.isArray(response.data)) {
      // Mock data for development
      const mockMedia: Media[] = Array.from({ length: 20 }, (_, i) => {
        const isImg = i % 3 === 0
        const isPdf = i % 3 === 1
        const isDoc = i % 3 === 2

        let filename
        let mimetype
        let filepath

        if (isImg) {
          filename = `image-${i + 1}.jpg`
          mimetype = 'image/jpeg'
          filepath = `https://picsum.photos/seed/${i + 1}/400/300`
        } else if (isPdf) {
          filename = `document-${i + 1}.pdf`
          mimetype = 'application/pdf'
          filepath = `/files/document-${i + 1}.pdf`
        } else if (isDoc) {
          filename = `spreadsheet-${i + 1}.xlsx`
          mimetype =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          filepath = `/files/spreadsheet-${i + 1}.xlsx`
        }

        return {
          id: `media-${i + 1}`,
          filename,
          filepath,
          mimetype,
          size: Math.floor(Math.random() * 5 * 1024 * 1024), // Random size up to 5MB
          createdAt: new Date(Date.now() - i * 86_400_000), // Random date within last 20 days
        }
      })

      mediaFiles.value = mockMedia
      totalFiles.value = 45
    } else {
      mediaFiles.value = response.data
      totalFiles.value = response.total
    }
  } catch (error) {
    console.error('Error fetching media:', error)
    // Use mock data as fallback
    const mockMedia: Media[] = Array.from({ length: 20 }, (_, i) => {
      const isImg = i % 3 === 0
      const isPdf = i % 3 === 1
      const isDoc = i % 3 === 2

      let filename
      let mimetype
      let filepath

      if (isImg) {
        filename = `image-${i + 1}.jpg`
        mimetype = 'image/jpeg'
        filepath = `https://picsum.photos/seed/${i + 1}/400/300`
      } else if (isPdf) {
        filename = `document-${i + 1}.pdf`
        mimetype = 'application/pdf'
        filepath = `/files/document-${i + 1}.pdf`
      } else if (isDoc) {
        filename = `spreadsheet-${i + 1}.xlsx`
        mimetype =
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        filepath = `/files/spreadsheet-${i + 1}.xlsx`
      }

      return {
        id: `media-${i + 1}`,
        filename,
        filepath,
        mimetype,
        size: Math.floor(Math.random() * 5 * 1024 * 1024), // Random size up to 5MB
        createdAt: new Date(Date.now() - i * 86_400_000), // Random date within last 20 days
      }
    })

    mediaFiles.value = mockMedia
    totalFiles.value = 45
  } finally {
    loading.value = false
  }
}

const debouncedSearch = refDebounced(search, 300)

watch(debouncedSearch, () => {
  page.value = 1
  fetchMedia()
})

// File selection for detail view
const selectFile = (file: Media) => {
  selectedFile.value = file
  showFileDetailsModal.value = true
}

// File URL copy to clipboard
const copyFileUrl = (file: Media) => {
  navigator.clipboard.writeText(file.filepath)

  // Show toast notification
  const toast = useToast()
  toast.add({
    title: 'URL Copied',
    description: 'File URL copied to clipboard',
    icon: 'i-heroicons-clipboard-document-check',
    color: 'green',
    timeout: 3000,
  })
}

// Trigger file input click
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

// Handle file selection
const onFileSelected = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    addFilesToUpload(Array.from(input.files))
    input.value = '' // Reset input
  }
}

// Handle file drop
const onFileDrop = (event: DragEvent) => {
  isDragging.value = false
  if (event.dataTransfer?.files) {
    addFilesToUpload(Array.from(event.dataTransfer.files))
  }
}

// Add files to upload queue
const addFilesToUpload = (files: File[]) => {
  uploadFiles.value.push(...files)
}

// Remove file from upload queue
const removeUploadFile = (index: number) => {
  uploadFiles.value.splice(index, 1)
}

// Upload all files
const uploadAllFiles = async () => {
  if (uploadFiles.value.length === 0) return

  uploading.value = true
  try {
    // In a real app, we would upload files to the server here
    // For this example, we'll simulate a successful upload

    // Create FormData with files
    const formData = new FormData()
    uploadFiles.value.forEach((file) => {
      formData.append('files', file)
    })

    // Upload files
    // await $fetch('/api/media', {
    //   method: 'POST',
    //   body: formData,
    // })

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Show success notification
    const toast = useToast()
    toast.add({
      title: 'Upload Complete',
      description: `${uploadFiles.value.length} files uploaded successfully`,
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 5000,
    })

    // Clear upload queue and close modal
    uploadFiles.value = []
    showUploadModal.value = false

    // Refresh media list
    fetchMedia()
  } catch (error) {
    console.error('Error uploading files:', error)

    // Show error notification
    const toast = useToast()
    toast.add({
      title: 'Upload Failed',
      description: 'There was an error uploading your files. Please try again.',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
      timeout: 5000,
    })
  } finally {
    uploading.value = false
  }
}

// Delete confirmation
const confirmDelete = (file: Media | null) => {
  if (!file) return

  fileToDelete.value = file
  showDeleteModal.value = true
  showFileDetailsModal.value = false
}

// Delete file
const deleteFile = async () => {
  if (!fileToDelete.value) return

  deleteLoading.value = true
  try {
    // Delete file
    await $fetch(`/api/media/${fileToDelete.value.id}`, {
      method: 'DELETE',
    })

    // Remove file from list
    mediaFiles.value = mediaFiles.value.filter(
      (file) => file.id !== fileToDelete.value?.id
    )
    totalFiles.value--

    // Show success notification
    const toast = useToast()
    toast.add({
      title: 'File Deleted',
      description: `"${fileToDelete.value.filename}" has been deleted.`,
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 5000,
    })

    showDeleteModal.value = false
    fileToDelete.value = null
  } catch (error) {
    console.error('Error deleting file:', error)

    // Show error notification
    const toast = useToast()
    toast.add({
      title: 'Error',
      description: 'Failed to delete file. Please try again.',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
      timeout: 5000,
    })
  } finally {
    deleteLoading.value = false
  }
}

// Fetch media on mount
onMounted(() => {
  fetchMedia()
})
</script>

<template>
  <div class="p-6">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Media Library</h1>
      <UButton
        color="primary"
        icon="i-heroicons-arrow-up-tray"
        size="lg"
        @click="showUploadModal = true"
      >
        Upload Files
      </UButton>
    </div>

    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <UInput
              class="w-64"
              v-model="search"
              placeholder="Search media..."
              size="lg"
              icon="i-heroicons-magnifying-glass"
            />
          </div>
          <div class="flex items-center gap-2">
            <USelect
              v-model="filters.type"
              :options="['All', 'Images', 'Documents', 'Other']"
              placeholder="File type"
              size="sm"
              @update:model-value="fetchMedia"
            />
            <USelect
              v-model="filters.sortBy"
              :options="[
                { label: 'Newest first', value: 'createdAt:desc' },
                { label: 'Oldest first', value: 'createdAt:asc' },
                { label: 'Name A-Z', value: 'filename:asc' },
                { label: 'Name Z-A', value: 'filename:desc' },
                { label: 'Size (largest)', value: 'size:desc' },
                { label: 'Size (smallest)', value: 'size:asc' },
              ]"
              placeholder="Sort by"
              size="sm"
              @update:model-value="fetchMedia"
            />
            <UButtonGroup size="sm">
              <UButton
                :color="viewMode === 'grid' ? 'primary' : 'gray'"
                :variant="viewMode === 'grid' ? 'solid' : 'ghost'"
                icon="i-heroicons-squares-2x2"
                @click="viewMode = 'grid'"
              />
              <UButton
                :color="viewMode === 'list' ? 'primary' : 'gray'"
                :variant="viewMode === 'list' ? 'solid' : 'ghost'"
                icon="i-heroicons-list-bullet"
                @click="viewMode = 'list'"
              />
            </UButtonGroup>
          </div>
        </div>
      </template>

      <!-- Grid View -->
      <div
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        v-if="viewMode === 'grid'"
      >
        <UCard
          class="overflow-hidden"
          v-for="file in mediaFiles"
          :key="file.id"
          @click="selectFile(file)"
        >
          <div class="aspect-square relative overflow-hidden bg-gray-100">
            <img
              class="h-full w-full object-cover"
              v-if="isImage(file)"
              :src="file.filepath"
              :alt="file.filename"
            />
            <div
              class="flex h-full w-full items-center justify-center bg-gray-100"
              v-else
            >
              <UIcon
                class="h-12 w-12 text-gray-400"
                :name="getFileIcon(file)"
              />
            </div>
            <UBadge
              class="absolute bottom-2 right-2"
              v-if="!isImage(file)"
              color="gray"
              size="xs"
            >
              {{ getFileExtension(file.filename).toUpperCase() }}
            </UBadge>
          </div>
          <div class="p-2 text-center">
            <p class="truncate text-sm">{{ file.filename }}</p>
            <p class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</p>
          </div>
        </UCard>
      </div>

      <!-- List View -->
      <UTable
        v-else
        :columns="columns"
        :rows="mediaFiles"
        :loading="loading"
        :empty-state="{ icon: 'i-heroicons-photo', label: 'No media found' }"
      >
        <template #filename-data="{ row }">
          <div class="flex items-center gap-3">
            <div
              class="h-10 w-10 flex-shrink-0 overflow-hidden rounded bg-gray-100"
            >
              <img
                class="h-full w-full object-cover"
                v-if="isImage(row)"
                :src="row.filepath"
                :alt="row.filename"
              />
              <div
                class="flex h-full w-full items-center justify-center"
                v-else
              >
                <UIcon class="h-6 w-6 text-gray-400" :name="getFileIcon(row)" />
              </div>
            </div>
            <span class="font-medium">{{ row.filename }}</span>
          </div>
        </template>

        <template #mimetype-data="{ row }">
          <UBadge color="gray" size="sm">
            {{ getFileType(row) }}
          </UBadge>
        </template>

        <template #size-data="{ row }">
          {{ formatFileSize(row.size) }}
        </template>

        <template #createdAt-data="{ row }">
          {{ formatDate(row.createdAt) }}
        </template>

        <template #actions-data="{ row }">
          <div class="flex items-center gap-2">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-eye"
              :href="row.filepath"
              target="_blank"
              title="View file"
              size="xs"
            />
            <UButton
              v-if="isImage(row)"
              color="primary"
              variant="ghost"
              icon="i-heroicons-clipboard-document"
              title="Copy URL"
              size="xs"
              @click="copyFileUrl(row)"
            />
            <UButton
              color="red"
              variant="ghost"
              icon="i-heroicons-trash"
              title="Delete file"
              size="xs"
              @click="confirmDelete(row)"
            />
          </div>
        </template>
      </UTable>

      <template #footer>
        <div class="flex justify-between items-center">
          <p class="text-sm text-gray-500">
            Showing {{ mediaFiles.length }} of {{ totalFiles }} files
          </p>
          <UPagination
            v-model="page"
            :page-count="totalPages"
            :total="totalFiles"
            :ui="{
              wrapper: 'flex items-center gap-1',
              rounded: 'rounded-full min-w-8 h-8 justify-center',
            }"
            @update:model-value="fetchMedia"
          />
        </div>
      </template>
    </UCard>

    <!-- Upload Modal -->
    <UModal v-model="showUploadModal">
      <UCard>
        <template #header>
          <div class="flex items-center">
            <UIcon
              class="mr-2 text-primary-500"
              name="i-heroicons-arrow-up-tray"
            />
            <h3 class="text-lg font-medium">Upload Media</h3>
          </div>
        </template>

        <div>
          <div
            class="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center"
            :class="{ 'border-primary-500 bg-primary-50': isDragging }"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="onFileDrop"
            @click="triggerFileInput"
          >
            <input
              class="hidden"
              ref="fileInput"
              type="file"
              multiple
              @change="onFileSelected"
            />
            <UIcon
              class="mx-auto mb-4 h-12 w-12 text-gray-400"
              name="i-heroicons-arrow-up-tray"
            />
            <p class="text-lg font-medium text-gray-700">
              Drag and drop files here, or click to browse
            </p>
            <p class="mt-1 text-sm text-gray-500">
              Upload multiple files at once. Images, documents, and other files
              supported.
            </p>
          </div>

          <!-- File Preview List -->
          <div class="mt-6" v-if="uploadFiles.length > 0">
            <h4 class="mb-2 font-medium">Files to upload</h4>
            <ul class="space-y-2">
              <li
                class="flex items-center justify-between rounded bg-gray-50 p-2"
                v-for="(file, index) in uploadFiles"
                :key="index"
              >
                <div class="flex items-center">
                  <UIcon
                    class="mr-2 h-5 w-5 text-gray-500"
                    :name="getFileIconByType(file.type)"
                  />
                  <span class="truncate max-w-xs">{{ file.name }}</span>
                  <span class="ml-2 text-xs text-gray-500">
                    {{ formatFileSize(file.size) }}
                  </span>
                </div>
                <UButton
                  color="red"
                  variant="ghost"
                  icon="i-heroicons-x-mark"
                  size="xs"
                  @click="removeUploadFile(index)"
                />
              </li>
            </ul>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              color="gray"
              variant="outline"
              @click="showUploadModal = false"
            >
              Cancel
            </UButton>
            <UButton
              color="primary"
              :loading="uploading"
              :disabled="uploadFiles.length === 0"
              @click="uploadAllFiles"
            >
              Upload {{ uploadFiles.length }} files
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteModal">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              class="text-red-500"
              name="i-heroicons-exclamation-triangle"
            />
            <h3 class="text-lg font-medium">Delete File</h3>
          </div>
        </template>

        <p>
          Are you sure you want to delete this file? This action cannot be
          undone.
        </p>
        <p class="font-medium mt-2">{{ fileToDelete?.filename }}</p>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              color="gray"
              variant="outline"
              @click="showDeleteModal = false"
            >
              Cancel
            </UButton>
            <UButton color="red" :loading="deleteLoading" @click="deleteFile">
              Delete
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- File Details Modal -->
    <UModal v-model="showFileDetailsModal">
      <UCard class="max-w-xl">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon class="text-primary-500" name="i-heroicons-photo" />
            <h3 class="text-lg font-medium">File Details</h3>
          </div>
        </template>

        <div class="space-y-4" v-if="selectedFile">
          <div class="flex justify-center">
            <div
              class="h-48 overflow-hidden rounded"
              v-if="isImage(selectedFile)"
            >
              <img
                class="h-full w-auto object-contain"
                :src="selectedFile.filepath"
                :alt="selectedFile.filename"
              />
            </div>
            <div
              class="flex h-48 w-48 items-center justify-center rounded bg-gray-100"
              v-else
            >
              <UIcon
                class="h-24 w-24 text-gray-400"
                :name="getFileIcon(selectedFile)"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm font-medium text-gray-500">Filename</p>
              <p>{{ selectedFile.filename }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">File Type</p>
              <p>{{ selectedFile.mimetype }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Size</p>
              <p>{{ formatFileSize(selectedFile.size) }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Uploaded</p>
              <p>{{ formatDate(selectedFile.createdAt) }}</p>
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-500">File URL</p>
            <div class="flex mt-1">
              <UInput class="flex-1" v-model="selectedFile.filepath" readonly />
              <UButton
                color="primary"
                variant="outline"
                icon="i-heroicons-clipboard-document"
                @click="copyFileUrl(selectedFile)"
              />
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-between">
            <UButton
              color="red"
              variant="ghost"
              icon="i-heroicons-trash"
              @click="confirmDelete(selectedFile)"
            >
              Delete
            </UButton>
            <UButton color="gray" @click="showFileDetailsModal = false">
              Close
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
