export const handleKeydownSubmit = (submitFunction: Function) => {
  return (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      submitFunction()
    }
  }
}
