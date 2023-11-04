import { z } from 'zod'

export const contactFormSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  phone_number: z.string().min(1, 'Phone number is required'),
  email_address: z.string().email('Invalid email'),
  source: z.string().min(1, 'Please select where you heard about us'),
  business_type: z.object({
    label: z.string().min(1, 'Please select your type of business'),
    value: z.number()
  }),
  additional_info: z.string().optional()
})

export type ContactForm = z.output<typeof contactFormSchema>


export const sendgridResponseSchema = z.object({
  response: z.array(
    z.object({
      statusCode: z.number(),
      body: z.string().optional(),
      headers: z.object({
        server: z.string(),
        date: z.string(),
        'content-length': z.string(),
        connection: z.string(),
        'x-message-id': z.string(),
        'access-control-allow-origin': z.string(),
        'access-control-allow-methods': z.string(),
        'access-control-allow-headers': z.string(),
        'access-control-max-age': z.string(),
        'x-no-cors-reason': z.string(),
        'strict-transport-security': z.string()
      }).optional()
    })
  )
})


export type SendgridResponse = z.infer<typeof sendgridResponseSchema>

