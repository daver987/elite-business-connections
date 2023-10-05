<script setup lang="ts">
interface Props {
  to?: string
  size?: string
  altText?: string
  customClass?: string
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  to: '/',
  size: 'md',
  altText: 'EBC Logo',
  customClass: '',
})

const emit = defineEmits(['logoClick'])

const styleObject = reactive({
  maxWidth: '200px',
})

const logoSize = ref('200px')

computed(() => {
  if (props.size === 'sm') {
    logoSize.value = '150px'
  }
  if (props.size === 'md') {
    logoSize.value = '200px'
  }
  if (props.size === 'lg') {
    logoSize.value = '250px'
  }
  if (props.size === 'xl') {
    logoSize.value = '300px'
  }
})

const handleClick = () => {
  emit('logoClick')
}

const colorMode = useColorMode().value
</script>

<template>
  <div :style="styleObject">
    <NuxtLink :to="to" @click="handleClick">
      <NuxtImg
        :alt="altText"
        :src="
          colorMode === 'dark'
            ? '/images/ebc_logo_dark.png'
            : '/images/ebc_logo_light.png'
        "
      />
    </NuxtLink>
  </div>
</template>

<style scoped>
.logo {
  width: 100%;
  max-width: 190px;
}
</style>
