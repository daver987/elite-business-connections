import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'stats',
  title: 'Stats',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'symbol',
      title: 'Symbol',
      type: 'string',
      description: 'The symbol that you want before or after your stat like $ % - +',
      initialValue: '+',
      options: {
        list: [
          {title: '$', value: '$'},
          {title: '%', value: '%'},
          {title: '+', value: '+'},
          {title: '-', value: '-'},
        ],
      },
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      description: 'The position of the symbol',
      initialValue: 'end',
      options: {
        list: [
          {title: 'Start', value: 'start'},
          {title: 'End', value: 'end'},
        ],
      },
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'number',
      description: 'The duration of the count up',
    }),
    defineField({
      name: 'start',
      title: 'Start Number',
      type: 'number',
      description: 'The starting number',
    }),
    defineField({
      name: 'end',
      title: 'End Number',
      type: 'number',
      description: 'The end number',
    }),
  ],
})
