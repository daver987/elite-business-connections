export interface Stat {
  id: string
  position: 'start' | 'end' | 'none'
  duration: number
  symbol: string
  end: number
  title: string
  start: number
}

export const statsData: Stat[] = [
  {
    id: '1',
    position: 'end',
    duration: 2000,
    symbol: '+',
    end: 250,
    title: 'Active Members',
    start: 0,
  },
  {
    id: '2',
    position: 'end',
    duration: 2000,
    symbol: 'M',
    end: 10,
    title: 'Business Generated',
    start: 0,
  },
  {
    id: '3',
    position: 'end',
    duration: 2000,
    symbol: '+',
    end: 500,
    title: 'Referrals Made',
    start: 0,
  },
  {
    id: '4',
    position: 'end',
    duration: 2000,
    symbol: '%',
    end: 98,
    title: 'Member Satisfaction',
    start: 0,
  },
]
