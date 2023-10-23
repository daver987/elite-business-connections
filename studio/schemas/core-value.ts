import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'coreValues',
  title: 'Core Values',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      type: 'icon.manager',
      name: 'icon',
      title: 'Icon',
    }),
  ],
})
