import { withCustomScrollBar } from '@app/config/theme/withCustomScrollbar'
import { menuItems } from '@app/mocks'
import { useScrollEvent } from '@app/hooks'
import { Flex, Menu, Box } from '@chakra-ui/react'
// import SidebarToolkit from './SidebarToolkit'
// import SidebarContact from './SidebarContact'
import SidebarItem from './SidebarItem'
import { useSidebar } from '@app/context/Sidebar/useSidebar'
import { memo } from 'react'

const Sidebar = () => {
  const { scrolling } = useScrollEvent()
  const { isSidebarOpen } = useSidebar()
  return (
    <Flex
      top="0"
      left={'0'}
      zIndex={3}
      height={'full'}
      bg="legion.dark"
      position={'fixed'}
      alignItems="stretch"
      flexDirection="column"
      transitionDuration="150ms"
      pt={scrolling ? ['5vw', '5vw', '1vw'] : ['18vw', '18vw', '5vw']}
      width={isSidebarOpen ? ['55vw', '55vw', '17vw'] : [0, 0, '17vw']}
      borderRightColor="legion.dark"
      transitionTimingFunction="linear"
      transitionProperty="width, padding"
    >
      <Menu>
        <Box sx={withCustomScrollBar('4px')} overflowY="auto" overflowX="hidden">
          {menuItems.map((menu, idx) => (
            <SidebarItem menu={menu} key={`sidebar-item__${menu.label}__${idx}`} />
          ))}
        </Box>
      </Menu>
      {/* <Flex py="6" mt="auto" borderTop="2px" direction="column" borderTopColor="legion.dark">
        <SidebarToolkit />
        <SidebarContact />
      </Flex> */}
    </Flex>
  )
}

export default memo(Sidebar)
