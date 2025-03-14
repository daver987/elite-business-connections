export * from './ContactForm'
export * from './Navigation'
export * from './Register'
export * from './spotlight'
export * from './Stats'
export * from './User'
export * from './Referral'
export * from './ClosedBusiness'
export * from './Post'
export * from './Media'

export type UserStatus = 'subscribed' | 'unsubscribed' | 'bounced'

import type {
  Link as ULink,
  Avatar,
  Badge,
  Chip,
  Command,
  Tooltip,
} from '#ui/types'

export interface User {
  id: number
  name: string
  email: string
  avatar?: Avatar
  status: UserStatus
  location: string
}

export interface Mail {
  id: number
  unread?: boolean
  from: User
  subject: string
  body: string
  date: string
}

export interface Member {
  name: string
  username: string
  role: 'member' | 'owner'
  avatar: Avatar
}

export interface Notification {
  id: number
  unread?: boolean
  sender: User
  body: string
  date: string
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
  start: Date
  end: Date
}

export interface Link extends ULink {
  label: string
  class?: string
  click?: (...args: unknown[]) => void
}

export interface AsideLink extends Link {
  icon?: string
  iconClass?: string
}

export interface HeaderPopoverLink extends Link {
  description?: string
  icon?: string
  iconClass?: string
}

export interface HeaderLink extends Link {
  children?: HeaderPopoverLink[]
}

export interface FooterLink extends Link {}

export interface PageLink extends Link {
  icon?: string
  iconClass?: string
  avatar?: Avatar
  avatarClass?: string
}

export interface NavigationLink extends Link {
  icon?: string
  iconClass?: string
  badge?: string | Badge
}

export interface NavigationTree extends NavigationLink {
  children?: NavigationTree[]
}

export interface NavigationGroup {
  type?: 'link' | 'accordion'
  defaultOpen?: boolean
  children: NavigationTree[]
}

export interface ContentSearchLink extends Link, Omit<Command, 'id'> {}

export interface DashboardSidebarLink extends Link {
  labelClass?: string
  icon?: string
  iconClass?: string
  avatar?: Avatar
  avatarClass?: string
  chip?: string | Chip
  chipClass?: string
  badge?: string | number | Badge
  tooltip?: Tooltip
  defaultOpen?: boolean
  // Only applicable to links with children
  draggable?: boolean
  collapsible?: boolean
  children?: DashboardSidebarLink[]
}
