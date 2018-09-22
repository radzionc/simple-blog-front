export const takeIfExists = (key, type = String) => {
  const item = localStorage.getItem(key)
  if (item) {
    return type === Number
      ? Number.parseFloat(item)
      : type === Object ? JSON.parse(item) : item
  }
}
