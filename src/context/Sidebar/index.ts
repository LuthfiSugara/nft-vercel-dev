import { createContext } from 'react'

interface SidebarContextValues {
  isSidebarOpen: boolean
  onSidebarOpen: () => void
  onSidebarClose: () => void
  onSidebarToggle: () => void
}

export const SidebarContext = createContext<SidebarContextValues>(undefined)
