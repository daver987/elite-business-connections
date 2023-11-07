import { z } from 'zod'

export const contactFormSchema = z.object({
  first_name: z.string().min(1, 'First name is required').trim(),
  last_name: z.string().min(1, 'Last name is required').trim(),
  phone_number: z
    .string({
      required_error: 'Phone number is required',
      invalid_type_error: 'Invalid phone number format must be 555 555 1234',
    })
    .min(10)
    .trim()
    .transform((val) => {
      const digits = val.replace(/\D/g, '')
      return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
    }),
  email_address: z
    .string({ required_error: 'An email address is required' })
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
  source: z.string().min(1, 'Please select where you heard about us'),
  business_type: z.object({
    label: z.string().min(1, 'Please select your type of business'),
    value: z.number(),
  }),
  additional_info: z.string().optional(),
  contact_type: z.string().default('form_submission').optional(),
  user_created: z.string().optional(),
})

export type ContactForm = z.output<typeof contactFormSchema>

export type Contact = {
  is_contact_form_lead: boolean
  first_name: string
  last_name: string
  email_address: string
  phone_number: string
  contact_notes: string
}
