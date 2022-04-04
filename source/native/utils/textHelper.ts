export const capitalizeFirstLetter = (str?: string) => {
  if (str && str.length > 0) {
    return str[0].toUpperCase() + str.slice(1)
  }
  return str
}
