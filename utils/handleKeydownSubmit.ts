export const handleKeydownSubmit = (
  event: KeyboardEvent,
  submitFunction: Function
) => {
  if (event.key === 'Enter' || event.keyCode === 13) {
    event.preventDefault()
    submitFunction(event)
  }
}
