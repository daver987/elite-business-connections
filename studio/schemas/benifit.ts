import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'benefit',
  title: 'Benefits',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
  ],
})
