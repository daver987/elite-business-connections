import { z } from 'zod'

export const registerSchema = z
  .object({
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
