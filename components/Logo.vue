<script setup lang="ts">
interface Props {
  to?: string
  size?: string
  altText?: string
  customClass?: string
  autoMargin?: boolean
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  to: '/',
  size: 'md',
  altText: 'EBC Logo',
  customClass: '',
  autoMargin: true,
})

const emit = defineEmits(['logoClick'])

const styleObject = reactive({
  maxWidth: '200px',
  margin: props.autoMargin ? 'auto' : '',
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

const calculateHeight = (width: string) => {
  const actualWidth = parseFloat(width)
  const actualHeight = (actualWidth * 48.6) / 200
  return `${actualHeight}px`
}

// Add static logo URL for CMS migration
const logoUrl = '/images/ebc_logo_light.png'
</script>

<template>
  <div :style="styleObject">
    <NuxtLink :to="to" @click="handleClick">
      <NuxtImg
        :alt="altText"
        :width="logoSize"
        :height="calculateHeight(logoSize)"
        :src="logoUrl"
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
