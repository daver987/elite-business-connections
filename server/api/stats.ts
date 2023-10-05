import { Stat } from '~/types/stats'

export default defineEventHandler((event) => {
  const stats: Stat[] = [
    {
      id: 1,
      name: 'Active Members',
      symbol: '+',
      position: 'end',
      duration: 2000,
      start: 0,
      end: 45,
    },
    {
      id: 2,
      name: 'Referrals Exchanged',
      symbol: '+',
      position: 'end',
      duration: 3000,
      start: 0,
      end: 350,
    },
    {
      id: 3,
      name: 'Revenue Generated',
      symbol: '$',
      position: 'start',
      duration: 4000,
      start: 0,
      end: 10000,
    },
    {
      id: 4,
      name: 'Events Hosted',
      symbol: '+',
      position: 'end',
      duration: 3000,
      start: 0,
      end: 500,
    },
  ]
  return { stats }
})
