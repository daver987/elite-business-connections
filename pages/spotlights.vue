<script lang="ts" setup>
definePageMeta({
  layout: 'default',
  path: '/spotlights',
  colorMode: 'dark',
})
</script>

<template>
  <div>
    <UContainer>
      <Spotlight3Up />
      <!--      <FormKit type='form' #default='{ value }' submit-label='Create Character'>-->
      <!--        <FormKit-->
      <!--          v-for='input in contact.form.schema'-->
      <!--          :key='input.name'-->
      <!--          :type='input.type'-->
      <!--          :label='input.label'-->
      <!--          :options="input.type === 'select' ? ['Option 1', 'Option 2', 'Option 3'] : ''"-->
      <!--          :placeholder='input.placeholder'-->
      <!--          :validation='input.validation'-->
      <!--        />-->
      <!--        <pre>{{ value }}</pre>-->
      <!--      </FormKit>-->
    </UContainer>
  </div>
</template>
