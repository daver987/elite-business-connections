import type { User } from './User'

export type ReferralStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'IN_PROGRESS'
  | 'CLOSED'
  | 'LOST'

export interface Referral {
  id: string
  giver: User
  giverId: string
  receiver: User
  receiverId: string
  contactName: string
  contactEmail?: string
  contactPhone?: string
  notes?: string
  status: ReferralStatus
  createdAt: Date
  updatedAt: Date
}
