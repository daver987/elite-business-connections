<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

const emit = defineEmits(['close'])

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

const state = reactive({
  name: undefined,
  email: undefined,
})

async function onSubmit(event: FormSubmitEvent<z.infer<typeof schema>>) {
  // Do something with data
  console.log(event.data)

  emit('close')
}
</script>

<template>
  <UForm class="space-y-4" :state="state" :schema="schema" @submit="onSubmit">
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" placeholder="John Doe" autofocus />
    </UFormGroup>

    <UFormGroup label="Email" name="email">
      <UInput
        v-model="state.email"
        type="email"
        placeholder="john.doe@example.com"
      />
    </UFormGroup>

    <div class="flex justify-end gap-3">
      <UButton
        label="Cancel"
        color="gray"
        variant="ghost"
        @click="emit('close')"
      />
      <UButton type="submit" label="Save" color="black" />
    </div>
  </UForm>
</template>
