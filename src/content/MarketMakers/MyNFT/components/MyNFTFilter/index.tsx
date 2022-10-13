import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ArrowUpIcon, ArrowDownIcon, ChevronDownIcon } from '@chakra-ui/icons'

const MyNFTFilter = ({ claimedStatus, setClaimedStatus, isAscending, setIsAscending }) => {
  return (
    <Menu>
      <MenuButton
        bg={'legion.dark'}
        fontSize={'1vw'}
        borderRadius={'0.5vw'}
        minW={'14vw'}
        maxH={'3vw'}
        py={'1.5vw'}
        _hover={{ bg: 'legion.dark', color: 'legion.white' }}
        _active={{ bg: 'legion.dark', color: 'legion.white' }}
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        {claimedStatus}{' '}
        {claimedStatus === 'All' ? (
          ''
        ) : isAscending ? (
          <ArrowUpIcon ml={'0.5vw'} mr={'1vw'} />
        ) : (
          <ArrowDownIcon ml={'0.5vw'} mr={'1vw'} />
        )}
      </MenuButton>
      <MenuList
        overflow={'hidden'}
        bg={'legion.dark'}
        color={'legion.white'}
        minW={'14vw'}
        fontSize={'1vw'}
        borderRadius={'0.5vw'}
      >
        <MenuItem
          onClick={() => {
            setClaimedStatus('All')
            setIsAscending(true)
          }}
          py={'0.5vw'}
          px={'1vw'}
        >
          All
        </MenuItem>
        <MenuItem
          onClick={() => {
            setClaimedStatus('Claimed')
            setIsAscending(true)
          }}
          py={'0.5vw'}
          px={'1vw'}
        >
          Claimed <ArrowUpIcon ml={'0.5vw'} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            setClaimedStatus('Claimed')
            setIsAscending(false)
          }}
          py={'0.5vw'}
          px={'1vw'}
        >
          Claimed <ArrowDownIcon ml={'0.5vw'} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            setClaimedStatus('Unclaimed')
            setIsAscending(true)
          }}
          py={'0.5vw'}
          px={'1vw'}
        >
          Unclaimed <ArrowUpIcon ml={'0.5vw'} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            setClaimedStatus('Unclaimed')
            setIsAscending(false)
          }}
          py={'0.5vw'}
          px={'1vw'}
        >
          Unclaimed <ArrowDownIcon ml={'0.5vw'} />
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MyNFTFilter
