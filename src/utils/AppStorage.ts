import { parseIfJsonString } from './JSONHelper'

class SafeLocalStorage {
  private isBrowser() {
    return typeof window !== 'undefined'
  }
  setItem<T>(key: string, value: T) {
    if (this.isBrowser()) {
      const stringified = JSON.stringify(value)
      return localStorage.setItem(key, stringified)
    }
    return null
  }
  removeItem(key: string) {
    if (this.isBrowser()) {
      return localStorage.removeItem(key)
    }
    return null
  }
  getItem<T>(key: string): T | null {
    if (this.isBrowser()) {
      const item = localStorage.getItem(key)
      return parseIfJsonString(item) as T
    }
    return null
  }
  clear() {
    if (this.isBrowser()) {
      return localStorage.clear()
    }
  }
}

const AppStorage = new SafeLocalStorage()

export default AppStorage
