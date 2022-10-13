import { Box, Center, Flex, Text } from '@chakra-ui/react'
import ConnectWalletButton from '@app/components/Buttons/ConnectWalletButton'
import Balance from '@app/components/Balance'
import Image from 'next/image'
import WGICTIcon from '@public/images/MarketMaker/BuyNFT/wgict_icon.png'
import CardActions from './CardActions'
import { useTranslation } from '@app/context'
import { useFetchMMDetailsQuery } from '@app/store/myNftDetail/my-nft-detail-slice'

const BuyCard = ({ displayBuyItem, marketMaker, account, userDataLoaded }) => {
  const { t } = useTranslation()
  const {
    data: mmDetailsAll = {
      data: {
        profit: 0,
        total_profit: 0,
        equity: 0,
        balance: 0,
        leverage: '',
        margin: 0,
        marginfree: 0,
        marginlevel: 0,
      },
    },
    isFetching: isMMDetailsFetching,
  } = useFetchMMDetailsQuery(displayBuyItem.mmid)

  const mmDetails = mmDetailsAll.data
    ? mmDetailsAll.data
    : {
        profit: 0,
        total_profit: 0,
        equity: 0,
        balance: 0,
        leverage: '',
        margin: 0,
        marginfree: 0,
        marginlevel: 0,
      }

  return (
    <Box>
      <Box bg={'legion.dark'} color={'white'} borderRadius={['3vw', '3vw', '1vw']} p={['3vw', '3vw', '1vw']}>
        <Text fontSize={['5vw', '5vw', '1.2vw']} fontWeight={'bold'} textAlign={'center'} mt={'1vw'}>
          {displayBuyItem.accounttypename}
        </Text>
        <Center
          bg={'legion.light'}
          p={['3vw', '3vw', '1.2vw']}
          border={'0.1vw solid rgba(255, 255, 255, 0.9)'}
          borderRadius={['3vw', '3vw', '1vw']}
          mt={['3vw', '3vw', '1.5vw']}
        >
          <Center pos={'relative'} w={'100%'} h={['30vw', '30vw', '11vw']} overflow={'hidden'}>
            <Image src={displayBuyItem.imageurl} layout="fill" objectFit="contain" alt={''} />
          </Center>
        </Center>
        <Center mt={['5vw', '5vw', '1.5vw']}>
          <Text fontSize={['5vw', '5vw', '1.5vw']} fontWeight={'bold'}>
            {displayBuyItem.max - displayBuyItem.minted}
          </Text>
          <Text fontSize={['5vw', '5vw', '1.5vw']} px={['1vw', '1vw', '0.2vw']}>
            /
          </Text>
          <Text fontSize={['3.5vw', '1vw', '1vw']}>{displayBuyItem.max}</Text>
        </Center>
        <Center>
          <Text fontSize={['3.5vw', '1vw', '1vw']} fontWeight={'bold'}>
            {t('NFT Available')}
          </Text>
        </Center>
        <Center mt={['3vw', '3vw', '1vw']}>
          <Text fontSize={['3.5vw', '1vw', '1vw']} fontWeight={'bold'}>
            {t('Share Interest')} {displayBuyItem.interest}%
          </Text>
        </Center>
        <Center mt={['5vw', '5vw', '1.5vw']}>
          <Text fontSize={['4.5vw', '4.5vw', '1.3vw']} fontWeight={'extrabold'}>
            {t('Equity')}
          </Text>
        </Center>
        {!isMMDetailsFetching ? (
          <Center mt={['2vw', '2vw', '0.3vw']}>
            <Balance
              value={mmDetails.equity}
              unit={' WGICT'}
              decimals={2}
              fontSize={['3.5vw', '3.5vw', '1vw']}
              fontWeight={'bold'}
            />
          </Center>
        ) : (
          <Center mt={['2vw', '2vw', '0.3vw']}>
            <Balance value={0} unit={' WGICT'} decimals={2} fontSize={['3.5vw', '3.5vw', '1vw']} fontWeight={'bold'} />
          </Center>
        )}

        <Flex justifyContent={'center'} alignItems={'center'} mt={['5vw', '5vw', '1.5vw']}>
          <Center pos={'relative'} w={['7vw', '7vw', '2vw']} h={['7vw', '7vw', '2vw']} overflow={'hidden'}>
            <Image src={WGICTIcon} layout="fill" objectFit="contain" alt={''} placeholder={'blur'} />
          </Center>
          <Balance
            value={Number(displayBuyItem.price)}
            unit={' WGICT'}
            decimals={0}
            textAlign={'center'}
            fontSize={['4vw', '4vw', '1.2vw']}
            fontWeight={'extrabold'}
            mx={['2vw', '2vw', '0.5vw']}
          />
        </Flex>
        <Center mt={['3vw', '3vw', '1vw']}>
          {account ? (
            <CardActions
              marketMaker={marketMaker}
              userDataLoaded={userDataLoaded}
              sold={displayBuyItem.max - displayBuyItem.minted === 0 ? true : false}
              mmid={displayBuyItem.mmid}
              batchid={displayBuyItem.batchid}
              account={account}
            />
          ) : (
            <ConnectWalletButton
              fontSize={['3.5vw', '3.5vw', '1vw']}
              fontWeight={'bold'}
              maxH={['10vw', '10vw', '1vw']}
              w={'100%'}
              py={['5vw', '5vw', '1.5vw']}
              textTransform={'capitalize'}
              borderRadius={['1.5vw', '1.5vw', '0.5vw']}
            />
          )}
        </Center>
      </Box>
    </Box>
  )
}

export default BuyCard
