import { ref } from '#imports'
import type { NotificationColor } from '#ui/types'

export async function showToast(
  id: string,
  color: NotificationColor,
  title: string,
  description: string,
  icon: string
) {
  const toast = ref(useToast())
  toast.value.add({
    id: id,
    color: color,
    title: title,
    description: description,
    timeout: 7000,
    icon: icon,
  })
}
