import {defineField, defineType} from 'sanity'

const SOCIALS = [
  {title: 'Facebook', value: 'logos:facebook'},
  {title: 'Linkedin', value: 'skill-icons:linkedin'},
  {title: 'Instagram', value: 'skill-icons:instagram'},
  {title: 'Twitter', value: 'line-md:twitter-x'},
]

export default defineType({
  name: 'socialComponent',
  title: 'Social Component',
  type: 'object',
  fieldsets: [{name: 'social', title: 'Social media handles'}],
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      description: 'The social platform',
      options: {
        list: SOCIALS,
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'The url of the social media account',
    }),
  ],
  options: {
    collapsible: true,
    collapsed: true,
    columns: 1,
    modal: {type: 'popover'},
  },
  preview: {
    select: {
      platform: 'platform',
    },
    prepare: ({platform}) => {
      const platformName =
        platform && SOCIALS.flatMap((option) => (option.value === platform ? [option.title] : []))
      return {
        title: platform ? `${platformName}` : 'No platform selected',
      }
    },
  },
})
