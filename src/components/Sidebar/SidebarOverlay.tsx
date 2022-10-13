import { useSidebar } from '@app/context/Sidebar/useSidebar'
import { Box } from '@chakra-ui/react'

const SidebarOverlay = () => {
  const { isSidebarOpen, onSidebarClose } = useSidebar()
  return (
    <Box
      position="fixed"
      width="100%"
      height="100%"
      onClick={() => onSidebarClose()}
      inset={0}
      bgColor="rgba(0,0,0,0.5)"
      zIndex={2}
      display={isSidebarOpen ? ['block', 'block', 'none'] : ['none']}
    />
  )
}

export default SidebarOverlay
