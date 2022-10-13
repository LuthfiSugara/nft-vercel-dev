import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import ClaimRewardCardsContainer from '@app/content/MarketMakers/MyNFTDetail/components/ClaimReward/ClaimRewardCardsContainer'
import ClaimRewardCardsSkeleton from '@app/content/MarketMakers/MyNFTDetail/components/ClaimReward/ClaimRewardCards/Skeleton'
import { useFetchDisplayClaimRewardQuery } from '@app/store/myNftDetail/my-nft-detail-slice'
import { withCustomScrollBar } from '@app/config/theme/withCustomScrollbar'
import Balance from '@app/components/Balance'

const ClaimReward = ({ account, nftid, mmid }) => {
  const [year, setYear] = useState(Number(new Date().getFullYear()))
  const { data: displayClaimRewardAll = { data: { data: [] } }, isFetching: isDisplayClaimRewardFetching } =
    useFetchDisplayClaimRewardQuery({ nftid: nftid, mmid: mmid, year: year })

  const displayClaimReward = displayClaimRewardAll.data.data ? displayClaimRewardAll.data.data : []
  const totalReward = () => {
    let total = 0
    for (let i = 0; i < displayClaimReward.length; i++) {
      total += displayClaimReward[i].reward ?? 0
    }
    return total
  }
  const claimedReward = () => {
    let total = 0
    for (let i = 0; i < displayClaimReward.length; i++) {
      if (displayClaimReward[i].status === true) {
        total += displayClaimReward[i].reward ?? 0
      }
    }
    return total
  }

  return (
    <Box
      bg={'legion.dark'}
      pos={'relative'}
      px={['3vw', '3vw', '1vw']}
      py={['5vw', '5vw', '1.5vw']}
      borderRadius={['3vw', '3vw', '1vw']}
      mt={['7vw', '7vw', '2vw']}
    >
      <Flex justifyContent={'center'}>
        <Text fontSize={['6vw', '6vw', '1.7vw']} fontWeight={'bold'}>
          Market Maker Profit
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
        {isDisplayClaimRewardFetching ? (
          <ClaimRewardCardsSkeleton account={account} />
        ) : (
          <ClaimRewardCardsContainer
            displayClaimReward={displayClaimReward}
            idnft={nftid}
            mmid={mmid}
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

export default ClaimReward
