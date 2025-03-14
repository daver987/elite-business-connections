<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

definePageMeta({
  layout: 'portal',
})

const fileRef = ref<HTMLInputElement>()
const isDeleteAccountModalOpen = ref(false)

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  username: z.string().min(1),
  avatar: z.string().optional(),
  profession: z.string().min(1),
  company: z.string().optional(),
  bio: z.string().optional(),
  password_current: z.string().optional(),
  password_new: z.string().optional(),
})

const state = reactive({
  name: 'Jane Smith',
  email: 'jane@example.com',
  username: 'janesmith',
  avatar: '',
  profession: 'Real Estate Agent',
  company: 'Premier Properties',
  bio: 'Specializing in residential properties with over 10 years of experience helping families find their dream homes.',
  password_current: '',
  password_new: '',
})

const toast = useToast()

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement

  if (!input.files?.length) {
    return
  }

  state.avatar = URL.createObjectURL(input.files[0])
}

function onFileClick() {
  fileRef.value?.click()
}

async function onSubmit(event: FormSubmitEvent<z.infer<typeof schema>>) {
  // Do something with data
  console.log(event.data)

  toast.add({ title: 'Profile updated', icon: 'i-heroicons-check-circle' })
}
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UDashboardSection
      title="Theme"
      description="Customize the look and feel of your dashboard."
    >
      <template #links>
        <UColorModeSelect color="gray" />
      </template>
    </UDashboardSection>

    <UDivider class="mb-4" />

    <UForm :state="state" :schema="schema" @submit="onSubmit">
      <UDashboardSection
        title="Personal Information"
        description="This information will be displayed to other members of Elite Business Connections."
      >
        <template #links>
          <UButton type="submit" label="Save changes" color="primary" />
        </template>

        <UFormGroup
          class="grid grid-cols-2 gap-2 items-center"
          name="name"
          label="Name"
          description="Your full name as it will appear on your profile."
          required
          :ui="{ container: '' }"
        >
          <UInput
            v-model="state.name"
            autocomplete="off"
            icon="i-heroicons-user"
            size="md"
          />
        </UFormGroup>

        <UFormGroup
          class="grid grid-cols-2 gap-2"
          name="email"
          label="Email"
          description="Used for communications and login."
          required
          :ui="{ container: '' }"
        >
          <UInput
            v-model="state.email"
            type="email"
            autocomplete="off"
            icon="i-heroicons-envelope"
            size="md"
          />
        </UFormGroup>

        <UFormGroup
          class="grid grid-cols-2 gap-2"
          name="username"
          label="Username"
          description="Your unique username for the portal."
          required
          :ui="{ container: '' }"
        >
          <UInput
            v-model="state.username"
            type="username"
            autocomplete="off"
            size="md"
            input-class="ps-[125px]"
          >
            <template #leading>
              <span class="text-gray-500 dark:text-gray-400 text-sm"
                >elitebusinessconnections.com/</span
              >
            </template>
          </UInput>
        </UFormGroup>

        <UFormGroup
          class="grid grid-cols-2 gap-2"
          name="avatar"
          label="Profile Photo"
          help="JPG, GIF or PNG. 1MB Max."
          :ui="{ container: 'flex flex-wrap items-center gap-3', help: 'mt-0' }"
        >
          <UAvatar :src="state.avatar" :alt="state.name" size="lg" />

          <UButton
            label="Choose Photo"
            color="gray"
            size="md"
            @click="onFileClick"
          />

          <input
            class="hidden"
            ref="fileRef"
            type="file"
            accept=".jpg, .jpeg, .png, .gif"
            @change="onFileChange"
          />
        </UFormGroup>

        <UFormGroup
          class="grid grid-cols-2 gap-2"
          name="profession"
          label="Profession"
          description="Your profession or specialty."
          required
          :ui="{ container: '' }"
        >
          <UInput v-model="state.profession" autocomplete="off" size="md" />
        </UFormGroup>

        <UFormGroup
          class="grid grid-cols-2 gap-2"
          name="company"
          label="Company"
          description="Your business or organization name."
          :ui="{ container: '' }"
        >
          <UInput v-model="state.company" autocomplete="off" size="md" />
        </UFormGroup>

        <UFormGroup
          class="grid grid-cols-2 gap-2"
          name="bio"
          label="Bio"
          description="A brief professional description for your profile. URLs are hyperlinked."
          :ui="{ container: '' }"
        >
          <UTextarea v-model="state.bio" :rows="5" autoresize size="md" />
        </UFormGroup>
      </UDashboardSection>

      <UDivider class="my-4" />

      <UDashboardSection
        title="Change Password"
        description="Update your password to maintain account security."
      >
        <UFormGroup
          class="grid grid-cols-2 gap-2"
          name="password"
          label="Password"
          description="Confirm your current password before setting a new one."
          :ui="{ container: '' }"
        >
          <UInput
            id="password"
            v-model="state.password_current"
            type="password"
            placeholder="Current password"
            size="md"
          />
          <UInput
            class="mt-2"
            id="password_new"
            v-model="state.password_new"
            type="password"
            placeholder="New password"
            size="md"
          />
        </UFormGroup>
      </UDashboardSection>
    </UForm>

    <UDivider class="mb-4" />

    <UDashboardSection
      title="Account"
      description="No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently."
    >
      <div>
        <UButton
          color="red"
          label="Delete account"
          size="md"
          @click="isDeleteAccountModalOpen = true"
        />
      </div>
    </UDashboardSection>

    <!-- ~/components/settings/DeleteAccountModal.vue -->
    <SettingsDeleteAccountModal v-model="isDeleteAccountModalOpen" />
  </UDashboardPanelContent>
</template>
