import axios from 'axios'

export const GlobalAPI = axios.create({
  baseURL: process.env.GLOBAL_API,
})

export const ExternalAPIGic = axios.create({
  baseURL: process.env.EXTERNAL_API_GIC,
})
