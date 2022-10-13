import { useDisclosure, useMediaQuery } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { SidebarContext } from '.'

export const SidebarProvider: FC = ({ children }) => {
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure()
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const { pathname } = useRouter()
  useEffect(() => {
    if (isMobile) {
      onClose()
    }
  }, [pathname, onClose, isMobile])
  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen: isOpen,
        onSidebarOpen: onOpen,
        onSidebarClose: onClose,
        onSidebarToggle: onToggle,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
