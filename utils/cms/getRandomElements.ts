export function getRandomElements<T>(arr: T[], n: number): T[] {
  const tempArr = [...arr]

  const result: T[] = []

  if (n > arr.length) {
    throw new Error(
      'The number of elements to select cannot be greater than the length of the array.'
    )
  }

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * tempArr.length)

    result.push(...tempArr.splice(randomIndex, 1))
  }

  return result
}
