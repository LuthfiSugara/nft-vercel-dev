import { useContext } from 'react'
import { SidebarContext } from '.'

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('Should be called inside provider')
  }
  return context
}
