import { z } from 'zod'

export const statSchema = z.object({
  _id: z.string().uuid(),
  title: z.string(),
  start: z.number(),
  end: z.number(),
  duration: z.number(),
  symbol: z.string().optional(),
  position: z.union([z.literal('start'), z.literal('end')]).optional(),
})

export interface Stat {
  _id: number
  title: string
  start: number
  end: number
  duration: number
  symbol?: string
  position?: 'start' | 'end'
}
