import type { User } from './User'
import type { Referral } from './Referral'

export interface ClosedBusiness {
  id: string
  referral: Referral
  referralId: string
  member: User
  memberId: string
  amount: number
  notes?: string
  closedDate: Date
  createdAt: Date
  updatedAt: Date
}
