import {z} from 'zod'

export const subscriptionSchema = z.object({
  email_address: z.string().email()
})

export type Subscription = z.infer<typeof subscriptionSchema>
