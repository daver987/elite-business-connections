export const handleKeydownSubmit = (
  event: KeyboardEvent,
  submitFunction: Function
) => {
  if (event.shiftKey) {
    event.preventDefault()
  } else {
    submitFunction(event)
  }
}
