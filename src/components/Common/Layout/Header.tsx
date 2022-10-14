import { Box, Flex, IconButton, Spacer, Button, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useScrollEvent } from '@app/hooks'
import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from '@app/components/Buttons/ConnectWalletButton'
import { ModalWalletAccount } from '@app/components/Modals'
import { useModal } from '@app/context/Modal/useModal'
import { useSidebar } from '@app/context/Sidebar/useSidebar'
import { memo } from 'react'
import { LegionSiteLogo, LegionSiteLogoMobile, MenuIcon } from '@app/components/Icons'

const Header: React.FC = () => {
  const { scrolling } = useScrollEvent()
  const { account, active } = useWeb3React()
  const { onSidebarToggle } = useSidebar()
  const [onPresent] = useModal(<ModalWalletAccount />)
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      py={['2vw', '2vw', '2vw']}
      px={['3.7vw', '3.7vw', '5vw']}
      position="fixed"
      top={scrolling ? '-1000' : '0'}
      transition="top 200ms ease-in-out"
      zIndex={20}
      width="full"
      maxH={['15vw', '15vw', '4vw']}
      as="header"
      boxShadow={'md'}
    >
      <Flex alignItems="center">
        <IconButton
          display={['unset', 'unset', 'none']}
          aria-label="menu"
          size={'lg'}
          bg="transparent"
          // _hover={{
          //   backgroundColor: 'gicv.light',
          // }}
          // _active={{
          //   backgroundColor: 'gicv.light',
          // }}
          onClick={onSidebarToggle}
          icon={<MenuIcon />}
        />
        <Box display={['none', 'none', 'unset']}>
          <Link href="/" passHref>
            <a
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text fontSize={['1vw', '1vw', '1.7vw']} fontWeight={'extrabold'}>
                GICVerse
              </Text>
            </a>
          </Link>
        </Box>
        <Box display={['unset', 'unset', 'none']} mx={2}>
          <Link href="/" passHref>
            <a
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LegionSiteLogoMobile />
            </a>
          </Link>
        </Box>
      </Flex>
      <Spacer />
      {!active ? (
        <ConnectWalletButton
          bg={'brand.bg.10'}
          h={'fit-content'}
          py={['2vw', '2vw', '0.8vw']}
          px={['3vw', '4vw', '1.5vw']}
          borderRadius={['2vw', '2vw', '0.5vw']}
          fontSize={['4vw', '4vw', '1vw']}
          fontWeight={'extrabold'}
          _hover={{
            backgroundColor: 'brand.bg.10',
          }}
          _active={{
            backgroundColor: 'brand.bg.10',
          }}
        />
      ) : (
        <Button
          // bg={'brand.bg.10'}
          h={'fit-content'}
          py={['2vw', '2vw', '0.8vw']}
          px={['3vw', '4vw', '1.5vw']}
          borderRadius={['2vw', '2vw', '0.5vw']}
          fontSize={['4vw', '4vw', '1vw']}
          fontWeight={'extrabold'}
          colorScheme="primary"
          onClick={onPresent}
          color="white"
          // _hover={{
          //   backgroundColor: 'brand.bg.10',
          // }}
          // _active={{
          //   backgroundColor: 'brand.bg.10',
          // }}
        >
          {account.slice(0, 5) + '...' + account.slice(-4)}
        </Button>
      )}
    </Box>
  )
}

export default memo(Header)
