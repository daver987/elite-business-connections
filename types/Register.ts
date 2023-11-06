import { z } from 'zod'

export const registerSchema = z
  .object({
    first_name: z.string({ required_error: 'A first name is required' }),
    last_name: z.string({ required_error: 'A last name is required' }),
    email: z
      .string({ required_error: 'An email address is required' })
      .email('Please enter a valid email address')
      .trim()
      .toLowerCase(),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error:
          'Password must be a min 8 characters and contain at least 1 uppercase letter, and a number or symbol.',
      })
      .min(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#\\$%\\^&\\*])(?=.{8,})/)
      .trim(),
    confirm: z
      .string({
        required_error: 'Matching password is required',
        invalid_type_error: 'Passwords must match!',
      })
      .min(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#\\$%\\^&\\*])(?=.{8,})/)
      .trim(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  })

export type Register = z.output<typeof registerSchema>

export interface RegisterResponse {
  data: Data
}

export interface Data {
  id: string
  first_name?: string
  last_name?: string
  email: string
  password?: string
  location?: null
  title?: null
  description?: null
  tags?: null
  avatar?: null
  language?: null
  tfa_secret?: null
  status?: string
  role?: string
  token?: null
  last_access?: null
  last_page?: null
  provider?: string
  external_identifier?: null
  auth_data?: null
  email_notifications?: boolean
  company_name?: null
  website?: null
  logo?: null
  short_bio?: null
  long_bio?: null
  appearance?: null
  theme_dark?: null
  theme_light?: null
  theme_light_overrides?: null
  theme_dark_overrides?: null
}
