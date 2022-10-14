import { Collapse, Flex, MenuItem, Text, Box, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { memo, useCallback, useEffect, useMemo } from 'react'
import { useSidebar } from '@app/context/Sidebar/useSidebar'
import { ChildMenu, Menu } from '@app/mocks'
import { useTranslation } from '@app/context'

interface ChildItemProps {
  child: ChildMenu
  handleChildMenuClicked: (e: string) => void
}

const ChildItem = ({ handleChildMenuClicked, child }: ChildItemProps) => {
  const { pathname } = useRouter()
  const { t } = useTranslation()
  const isChildActive = useMemo(() => {
    if (child.alias?.includes(pathname)) {
      return true
    }
    return false
  }, [child.alias, pathname])

  return (
    <MenuItem
      px={['18vw', '18vw', '5.25vw']}
      py={['3vw', '3vw', '1vw']}
      bg="gicv.light"
      borderLeft={['1vw solid', '1vw solid', '0.3vw solid']}
      _hover={{ bg: 'gicv.overlay' }}
      _focus={{ bg: 'gicv.dark' }}
      onClick={() => handleChildMenuClicked(child.path)}
      borderLeftColor={[
        isChildActive ? 'gicv.primary' : 'transparent',
        isChildActive ? 'gicv.primary' : 'transparent',
        isChildActive ? 'gicv.primary' : 'transparent',
      ]}
    >
      <Flex display="flex" alignItems="center">
        <Text fontSize={['3vw', '3vw', '1vw']} fontWeight="bold" letterSpacing="wider">
          {t(child.label)}
        </Text>
      </Flex>
    </MenuItem>
  )
}
interface SidebarItemProps {
  menu: Menu
}

const SidebarItem = ({ menu }: SidebarItemProps) => {
  const { isOpen: isChildOpen, onToggle: onChildToggle, onClose: onChildClose } = useDisclosure()
  const router = useRouter()
  const { t } = useTranslation()
  const { isSidebarOpen, onSidebarToggle } = useSidebar()
  const handleParentMenuClicked = useCallback(() => {
    onChildToggle()
    if (!isSidebarOpen) {
      onSidebarToggle()
    } else {
      if (menu.path) {
        router.push(menu.path)
      }
    }
  }, [menu.path, router, onSidebarToggle, onChildToggle, isSidebarOpen])
  const handleCloseChildFromDrawer = useCallback(
    (val) => {
      if (!val) {
        onChildClose()
      }
    },
    [onChildClose]
  )
  const handleChildMenuClicked = useCallback(
    (path) => {
      router.push(path)
    },
    [router]
  )
  const isParentActive = useMemo(() => {
    if (menu.child && menu.child.length > 0) {
      const included = menu.child.flatMap((m) => m.alias).filter((e) => !!e)
      return included.includes(router.pathname)
    }
    if (menu.path !== '/') return router.pathname.includes(menu.path)
    return menu.path === router.pathname
  }, [router.pathname, menu.path, menu.child])
  useEffect(() => {
    handleCloseChildFromDrawer(isSidebarOpen)
  }, [isSidebarOpen, handleCloseChildFromDrawer])
  const SidebarItemIcon = menu.icon
  return (
    <>
      <MenuItem
        px={['3.7vw', '3.7vw', '1.7vw']}
        py={['3vw', '3vw', '1vw']}
        height="auto"
        display="block"
        overflowX="hidden"
        borderLeft={['1vw solid', '1vw solid', '0.3vw solid']}
        _hover={{ bg: 'gicv.overlay' }}
        _focus={{ bg: 'gicv.dark' }}
        onClick={handleParentMenuClicked}
        borderLeftColor={[
          isParentActive ? 'gicv.primary' : 'transparent',
          isParentActive ? 'gicv.primary' : 'transparent',
          isParentActive ? 'gicv.primary' : 'transparent',
        ]}
      >
        <Box display="flex" alignItems="center">
          <SidebarItemIcon boxSize={['4vw', '4vw', '1.5vw']} />
          <Text
            px={['3.3vw', '3.3vw', '1.3vw']}
            fontSize={['3vw', '3vw', '1vw']}
            fontWeight="bold"
            letterSpacing="wider"
            color={isSidebarOpen ? 'inherit' : ['transparent', 'transparent', 'inherit', 'inherit']}
            style={{
              transitionDuration: '150ms',
              transitionProperty: 'color',
              transitionTimingFunction: 'linear',
              // color: isSidebarOpen ? 'inherit' : 'transparent',
            }}
          >
            {t(menu.label)}
          </Text>
        </Box>
      </MenuItem>
      <Collapse in={isChildOpen} animateOpacity unmountOnExit>
        <Box width="full">
          {menu.hasChild &&
            isChildOpen &&
            menu.child.map((child, idx) => (
              <ChildItem key={idx} child={child} handleChildMenuClicked={handleChildMenuClicked} />
            ))}
        </Box>
      </Collapse>
    </>
  )
}

export default memo(SidebarItem)
