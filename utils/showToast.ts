import type { NotificationColor } from '#ui/types'

const toast = useToast()

export async function showToast(
  id: string,
  color: NotificationColor,
  title: string,
  description: string,
  icon: string
) {
  toast.add({
    id: id,
    color: color,
    title: title,
    description: description,
    timeout: 7000,
    icon: icon,
  })
}
