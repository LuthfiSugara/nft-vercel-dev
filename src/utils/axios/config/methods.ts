import { ExternalAPIGic, GlobalAPI } from '..'

export const GlobalAPIMethods = {
  GET: (url: string, params?: any) => GlobalAPI.get(url, params),
  POST: (url: string, params?: any) => GlobalAPI.post(url, params),
}

export const ExternalAPIGicMethods = {
  GET: (url: string, params?: any) => ExternalAPIGic.get(url, params),
  POST: (url: string, params?: any) => ExternalAPIGic.post(url, params),
}
