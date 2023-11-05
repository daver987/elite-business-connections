<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { Ref } from 'vue'
import { type Register, registerSchema } from '~/types/Register'

definePageMeta({
  title: 'Register',
  layout: 'empty',
  colorMode: 'dark',
})

const { createUser } = useDirectusAuth();
const router = useRouter();





const alert: Ref<(SubmitEvent & { data: Register }) | null | undefined> = ref()
const loading = ref(false)
const toast = useToast()


const state = reactive({
  email: undefined,
  password: undefined,
  confirm: undefined,
})

const resetState = () => {
  state.email = undefined
  state.password = undefined
  state.confirm = undefined
}

const onSubmit = async (event: FormSubmitEvent<Register>) => {
  loading.value = true
  try {
    const newUser = await createUser({ email: "", password: "" });
  } catch (e) {}
};


</script>

<template>
  <div
    class="flex h-[100dvh] min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <Logo />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white"
      >
        Join Elite Business Connections
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-4">
      <UForm :schema="registerSchema" :state="state" @submit="onSubmit">
        <UFormGroup required label="Email Address" name="email">
          <UInput v-model="state.email" placeholder="Enter email address..." />
        </UFormGroup>

        <UFormGroup label="Password" name="password" required>
          <template #label>
            <span>Password</span>
            <UTooltip
              text="Min 8 chars, 1 uppercase, 1 num/symbol."
              :popper="{ placement: 'right' }"
            >
              <UButton
                icon="i-heroicons-information-circle"
                size="2xs"
                color="primary"
                square
                variant="link"
              />
            </UTooltip>
          </template>
          <UInput
            v-model="state.password"
            placeholder="Enter a password"
            type="password"
            required
          >
          </UInput>
        </UFormGroup>
        <UFormGroup required label="Confirm Password" name="confirm">
          <UInput
            v-model="state.confirm"
            placeholder="Confirm your password"
            type="password"
          />
        </UFormGroup>
        <UButton :loading="loading" block type="submit"> Join Now</UButton>
      </UForm>

      <p class="mt-10 text-center text-sm text-gray-400">
        Already a member?
        {{ ' ' }}
        <NuxtLink
          class="font-semibold leading-6 text-primary-400 hover:text-primary-300"
          to="https://members.elitebusinessconnections.ca"
          >Login here
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
