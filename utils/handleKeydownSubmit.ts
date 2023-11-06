export const handleKeydownSubmit = (
  event: KeyboardEvent,
  submitFunction: Function,
) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    submitFunction(event)
  }
}
