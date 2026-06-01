export const saveToLocalStorage = <T>(key: string, obj: T) => {
  localStorage.setItem(key, JSON.stringify(obj))
}

export const getFromLocalStorage = <T>(key: string): T => {
  return JSON.parse(localStorage.getItem(key)!)
}
