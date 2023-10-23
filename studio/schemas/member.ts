import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'member',
  title: 'Members',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The full name of the member',
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      description: 'The role or title of the member',
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      description: 'An image of the member',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'The company name of the member',
    }),
    defineField({
      name: 'socials',
      title: 'Social Media',
      type: 'array',
      of: [{type: 'socialComponent'}],
    }),
  ],
})
