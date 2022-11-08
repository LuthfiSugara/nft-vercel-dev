import { memo } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useEagerConnect } from '@app/hooks'
import { usePollBlockNumber } from '@app/store/block/hooks'
import SidebarOverlay from '@app/components/Sidebar/SidebarOverlay'
import Sidebar from '@app/components/Sidebar'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  usePollBlockNumber()
  useEagerConnect()
  return (
    <Box display={'block'} justifyContent={'space-between'} minH={'100vh'}>
      <Box>
        <Header />
        <Flex maxWidth="full" position="relative">
          <Sidebar />
          <Box width="full" transitionDuration="150ms" transitionProperty="margin" transitionTimingFunction="linear">
            <SidebarOverlay />
            {children}
          </Box>
        </Flex>
      </Box>
      <Footer transitionDuration="150ms" transitionProperty="margin" transitionTimingFunction="linear" />
    </Box>
  )
}

export default memo(Layout)
