<script setup lang='ts'>
import type {  FormSubmitEvent } from '#ui/types'
import { z } from 'zod'
import type { Ref } from 'vue'

definePageMeta({
  title: 'Register',
  layout: 'empty',
  colorMode: 'dark'
})

const schema = z
  .object({
    email: z
      .string({required_error: 'An email address is required'})
      .email('Please enter a valid email address')
      .trim()
      .toLowerCase(),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error:
          'Password must be a min 8 characters and contain at least 1 uppercase letter, and a number or symbol.'
      })
      .min(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#\\$%\\^&\\*])(?=.{8,})/)
      .trim(),
    confirm: z
      .string({
        required_error: 'Matching password is required',
        invalid_type_error: 'Passwords must match!'
      })
      .min(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#\\$%\\^&\\*])(?=.{8,})/)
      .trim()
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords don\'t match',
    path: ['confirm']
  })

type Schema = z.output<typeof schema>

const alert: Ref<(SubmitEvent & { data: Schema }) | null | undefined> = ref()
const loading = ref(false)
const showAlert = ref(false)

const state = reactive({
  email: undefined,
  password: undefined,
  confirm: undefined
})

const resetState = () => {
  state.email = undefined
  state.password = undefined
  state.confirm = undefined
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  setTimeout(() => {
    alert.value = event
    console.log(event.data)
    loading.value = false
    showAlert.value = true
    resetState()
  }, 5000)
}
</script>

<template>
  <div
    class='flex h-[100dvh] min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'
  >
    <UAlert
      v-if='showAlert'
      :actions="[
        { variant: 'solid', color: 'primary', label: 'Action 1' },
        { variant: 'outline', color: 'primary', label: 'Action 2' },
      ]"
      title='Heads up!'
      :description='JSON.stringify(alert)'
    />
    <div class='sm:mx-auto sm:w-full sm:max-w-md text-center'>
      <Logo />
      <h2
        class='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white'
      >
        Join Elite Business Connections
      </h2>
    </div>

    <div class='mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-4'>
      <UForm :schema='schema' :state='state' @submit='onSubmit'>
        <UFormGroup required label='Email Address' name='email'>
          <UInput v-model='state.email' placeholder='Enter email address...' />
        </UFormGroup>

        <UFormGroup label='Password' name='password' required>
          <template #label>
            <span>Password</span>
            <UTooltip
              text='Min 8 chars, 1 uppercase, 1 num/symbol.'
              :popper="{ placement: 'right' }"
            >
              <UButton
                icon='i-heroicons-information-circle'
                size='2xs'
                color='primary'
                square
                variant='link'
              />
            </UTooltip>
          </template>
          <UInput
            v-model='state.password'
            placeholder='Enter a password'
            type='password'
            required
          >
          </UInput>
        </UFormGroup>
        <UFormGroup required label='Confirm Password' name='confirm'>
          <UInput
            v-model='state.confirm'
            placeholder='Confirm your password'
            type='password'
          />
        </UFormGroup>
        <UButton :loading='loading' block type='submit'> Join Now</UButton>
      </UForm>

      <p class='mt-10 text-center text-sm text-gray-400'>
        Already a member?
        {{ ' ' }}
        <NuxtLink
          class='font-semibold leading-6 text-primary-400 hover:text-primary-300'
          to='https://members.elitebusinessconnections.ca'
        >Login here
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
