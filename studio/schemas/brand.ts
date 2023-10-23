import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  groups: [
    {
      name: 'phone',
      title: 'Phone Number',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo Dark',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'brand_name',
      title: 'Brand Name',
      type: 'string',
      description: 'The business name',
    }),
    defineField({
      name: 'address',
      title: 'Business Address',
      type: 'string',
      description: 'The business address',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'The business email address',
    }),
    defineField({
      name: 'emailLink',
      title: 'Email Link',
      type: 'string',
      description: 'The email address link in the following format, mailto:info@example.com',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'The business phone number in the following format, +1 (555) 123-1234',
      group: 'phone',
    }),
    defineField({
      name: 'phoneLink',
      title: 'Phone Number Link',
      type: 'string',
      description: 'The phone number link in the following format, tel:15551231234',
      group: 'phone',
    }),
    defineField({
      name: 'social',
      title: 'Social Media',
      description: 'The social media accounts of the brand',
      type: 'array',
      of: [{type: 'socialComponent'}],
    }),
  ],
})
