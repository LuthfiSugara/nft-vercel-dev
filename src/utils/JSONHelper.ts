export const isJsonString = (str: string) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const parseIfJsonString = <T, V extends unknown>(value: V): T | V => {
  if (isJsonString(value as string)) {
    return JSON.parse(value as string)
  }
  return value
}
