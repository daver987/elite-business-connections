export default function useUtilities() {
  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const avatarText = (value: string) => {
    if (!value) return ''
    const nameArray = value.split(' ')

    return nameArray.map((word) => word.charAt(0).toUpperCase()).join('')
  }

  const formatNumber = (num: number) => {
    const regex = /\B(?=(\d{3})+(?!\d))/g
    return num.toFixed(0).replace(regex, ',')
  }

  const formatThousands = (num: number) => {
    return `${Math.sign(num) * +(Math.abs(num) / 1000).toFixed(1)}k`
  }

  const kFormatter = (num: number) => {
    return Math.abs(num) > 9999 ? formatThousands(num) : formatNumber(num)
  }

  const defaultFormatting: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }

  const formatDate = (
    value: string | null | undefined,
    formatting: Intl.DateTimeFormatOptions = defaultFormatting
  ): string | null | undefined => {
    if (!value) return value

    return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
  }

  interface FormatDateToMonthShortParams {
    value: string
    toTimeForCurrentDay?: boolean
  }

  const formatDateToMonthShort = ({
    value,
    toTimeForCurrentDay = true,
  }: FormatDateToMonthShortParams) => {
    const date = new Date(value)
    let formatting: Record<string, string> = { month: 'short', day: 'numeric' }

    if (toTimeForCurrentDay && isToday(date))
      formatting = { hour: 'numeric', minute: 'numeric' }

    return new Intl.DateTimeFormat('en-US', formatting).format(date)
  }

  const prefixWithPlus = (value: number) => (value > 0 ? `+${value}` : value)

  return {
    avatarText,
    formatNumber,
    formatThousands,
    kFormatter,
    formatDate,
    formatDateToMonthShort,
    prefixWithPlus,
  }
}
