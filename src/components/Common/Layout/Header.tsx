import { Box, Flex, IconButton, Spacer, Button, Text, Avatar } from '@chakra-ui/react'
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
      px={['3.7vw', '3.7vw', '3.5vw']}
      position="fixed"
      top={scrolling ? '-1000' : '0'}
      transition="top 200ms ease-in-out"
      zIndex={20}
      width="full"
      maxH={['15vw', '15vw', '4.3vw']}
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
        <Flex display={['none', 'none', 'unset']}>
          <Link href="/" passHref>
            <a
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text fontSize={'1.7vw'} fontWeight={'extrabold'}>
                GICVerse
              </Text>
            </a>
          </Link>
        </Flex>
        <Box display={['unset', 'unset', 'none']} mx={2}>
          <Link href="/" passHref>
            <a
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text fontSize={'5vw'} fontWeight={'extrabold'}>
                GICVerse
              </Text>
            </a>
          </Link>
        </Box>
      </Flex>
      <Spacer />
      {!active ? (
        <ConnectWalletButton />
      ) : (
        <Button
          onClick={onPresent}
          variant={'outline'}
          fontSize={['4vw', '4vw', '1vw']}
          fontWeight={'extrabold'}
          border={['1vw solid', '1vw solid', '0.1vw solid']}
          borderRadius={['2vw', '2vw', '0.5vw']}
          h={'fit-content'}
          py={['2vw', '2vw', '0.8vw']}
          px={['3vw', '4vw', '1.5vw']}
        >
          {account.slice(0, 5) + '...' + account.slice(-4)}
        </Button>
      )}
    </Box>
  )
}

export default memo(Header)
