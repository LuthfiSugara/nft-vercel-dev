import { EN } from '@app/config/localization/languages'
import Cookies from 'js-cookie'

const publicUrl = process.env.PUBLIC_URL || ''

export const LS_KEY = 'legionswap_language'

export const fetchLocale = async (locale) => {
  const response = await fetch(`${publicUrl}/locales/${locale}.json`)
  const data = await response.json()
  return data
}

export const getLanguageCodeFromLS = () => {
  try {
    const codeFromCookie = Cookies.get(LS_KEY)
    return codeFromCookie || EN.locale
  } catch {
    return EN.locale
  }
}
