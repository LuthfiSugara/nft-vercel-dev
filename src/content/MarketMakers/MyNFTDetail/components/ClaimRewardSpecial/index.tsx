import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import ClaimRewardSpecialCardsContainer from '@app/content/MarketMakers/MyNFTDetail/components/ClaimRewardSpecial/ClaimRewardSpecialCardsContainer'
import ClaimRewardSpecialCardsSkeleton from '@app/content/MarketMakers/MyNFTDetail/components/ClaimRewardSpecial/ClaimRewardSpecialCards/Skeleton'
import { useFetchDisplayClaimRewardSpecialQuery } from '@app/store/myNftDetail/my-nft-detail-slice'
import { withCustomScrollBar } from '@app/config/theme/withCustomScrollbar'
import Balance from '@app/components/Balance'

const ClaimRewardSpecial = ({ account, nftid, batchid }) => {
  const [year, setYear] = useState(Number(new Date().getFullYear()))
  const {
    data: displayClaimRewardSpecialAll = { data: { data: [] } },
    isFetching: isDisplayClaimRewardSpecialFetching,
  } = useFetchDisplayClaimRewardSpecialQuery({ nftid: nftid, batchid: batchid, year: year })

  const displayClaimRewardSpecial = displayClaimRewardSpecialAll.data.data ? displayClaimRewardSpecialAll.data.data : []
  const totalReward = () => {
    let total = 0
    for (let i = 0; i < displayClaimRewardSpecial.length; i++) {
      total += displayClaimRewardSpecial[i].reward ?? 0
    }
    return total
  }
  const claimedReward = () => {
    let total = 0
    for (let i = 0; i < displayClaimRewardSpecial.length; i++) {
      if (displayClaimRewardSpecial[i].status === true) {
        total += displayClaimRewardSpecial[i].reward ?? 0
      }
    }
    return total
  }

  return (
    <Box
      bg={'legion.light'}
      pos={'relative'}
      p={['3vw', '3vw', '1vw']}
      borderRadius={['3vw', '3vw', '1vw']}
      mt={['7vw', '7vw', '2vw']}
    >
      <Flex justifyContent={'center'} mt={['3vw', '3vw', '1vw']}>
        <Text fontSize={['6vw', '6vw', '1.7vw']} fontWeight={'bold'}>
          Special Reward
        </Text>
      </Flex>
      <Flex justifyContent={'center'} mt={['3vw', '3vw', '1vw']}>
        <Menu>
          <MenuButton
            bg={'legion.primary'}
            borderRadius={['2vw', '2vw', '0.5vw']}
            fontSize={['3.5vw', '3.5vw', '1vw']}
            maxH={['10vw', '10vw', '3vw']}
            py={['5vw', '5vw', '1.5vw']}
            minW={['25vw', '25vw', '7vw']}
            _hover={{ bg: 'legion.primary', color: 'legion.white' }}
            _active={{ bg: 'legion.primary', color: 'legion.white' }}
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {year}
          </MenuButton>
          <MenuList
            overflow={'hidden'}
            bg={'legion.white'}
            color={'legion.black'}
            minW={['25vw', '25vw', '7vw']}
            borderRadius={['2vw', '2vw', '0.5vw']}
          >
            <MenuItem
              onClick={() => {
                setYear(Number(new Date().getFullYear()))
              }}
              _hover={{ bg: 'legion.gray.300' }}
              py={['2vw', '2vw', '0.5vw']}
              justifyContent={'center'}
              fontSize={['3.5vw', '3.5vw', '1vw']}
              fontWeight={'extrabold'}
            >
              {Number(new Date().getFullYear())}
            </MenuItem>
            <MenuItem
              onClick={() => {
                setYear(Number(new Date().getFullYear() - 1))
              }}
              _hover={{ bg: 'legion.gray.300' }}
              py={['2vw', '2vw', '0.5vw']}
              justifyContent={'center'}
              fontSize={['3.5vw', '3.5vw', '1vw']}
              fontWeight={'extrabold'}
            >
              {Number(new Date().getFullYear() - 1)}
            </MenuItem>
            <MenuItem
              onClick={() => {
                setYear(Number(new Date().getFullYear() - 2))
              }}
              _hover={{ bg: 'legion.gray.300' }}
              py={['2vw', '2vw', '0.5vw']}
              justifyContent={'center'}
              fontSize={['3.5vw', '3.5vw', '1vw']}
              fontWeight={'extrabold'}
            >
              {Number(new Date().getFullYear() - 2)}
            </MenuItem>
            <MenuItem
              onClick={() => {
                setYear(Number(new Date().getFullYear() - 3))
              }}
              _hover={{ bg: 'legion.gray.300' }}
              py={['2vw', '2vw', '0.5vw']}
              justifyContent={'center'}
              fontSize={['3.5vw', '3.5vw', '1vw']}
              fontWeight={'extrabold'}
            >
              {Number(new Date().getFullYear() - 3)}
            </MenuItem>
            <MenuItem
              onClick={() => {
                setYear(Number(new Date().getFullYear() - 4))
              }}
              _hover={{ bg: 'legion.gray.300' }}
              py={['2vw', '2vw', '0.5vw']}
              justifyContent={'center'}
              fontSize={['3.5vw', '3.5vw', '1vw']}
              fontWeight={'extrabold'}
            >
              {Number(new Date().getFullYear() - 4)}
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Box
        maxH={['116vw', '116vw', '100vh']}
        overflowY={'scroll'}
        sx={withCustomScrollBar({ base: '1.5vw', lg: '0.3vw' }, 'legion.primary')}
        mt={['7vw', '7vw', '2vw']}
      >
        {isDisplayClaimRewardSpecialFetching ? (
          <ClaimRewardSpecialCardsSkeleton account={account} />
        ) : (
          <ClaimRewardSpecialCardsContainer
            displayClaimRewardSpecial={displayClaimRewardSpecial}
            idnft={nftid}
            batchid={batchid}
            year={year}
            account={account}
          />
        )}
      </Box>
      <Flex justifyContent={'center'} mt={['5vw', '5vw', '1.5vw']}>
        <Box display={['block', 'block', 'flex']} justifyContent={'center'} alignItems={'center'}>
          <Text align={'center'} fontSize={['5.5vw', '5.5vw', '1.5vw']} fontWeight={'bold'}>
            &nbsp; Total Reward Claimed &nbsp;
          </Text>
          <Flex justifyContent={'center'} alignItems={'center'}>
            <Balance
              value={claimedReward()}
              decimals={2}
              unit={' WGICT'}
              fontSize={['4.5vw', '4.5vw', '1.8vw']}
              fontWeight={'extrabold'}
              color={'legion.primary'}
            />
            <Text fontSize={['4vw', '4vw', '1.5vw']} fontWeight={'bold'}>
              &nbsp; of &nbsp;
            </Text>
            <Balance
              value={totalReward()}
              decimals={2}
              unit={' WGICT'}
              fontSize={['4.5vw', '4.5vw', '1.8vw']}
              fontWeight={'extrabold'}
              color={'legion.primary'}
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default ClaimRewardSpecial
