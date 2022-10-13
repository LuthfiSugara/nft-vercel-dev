import React from 'react'
import { Box, Button, Center, Text } from '@chakra-ui/react'
import Image from 'next/image'
// import WGICTIcon from '@public/images/MarketMaker/BuyNFT/wgict_icon.png'
// import Balance from '@app/components/Balance'
// import { useRouter } from 'next/router'
import Link from 'next/link'
import ModalPopUpNFT from '@app/components/Modals/MarketMaker/ModalPopUpNFT'
import { useModal } from '@app/context/Modal/useModal'
import { useFetchDisplayRarityImageQuery } from '@app/store/buyNft/buy-nft-slice'

interface IMyNFTCard {
  imageUrl: string
  accounttypename: string
  mmid: number
  batchname: string
  type: string
  nftid: number
}

const MyNFTCard: React.FC<IMyNFTCard> = ({ imageUrl, accounttypename, mmid, batchname, type, nftid }) => {
  const [onOpenPopUpNFTModal] = useModal(<ModalPopUpNFT imageUrl={imageUrl} />, true, false, 'transferNFTModal')
  const { data: rarityImage = { data: [] }, isFetching: isFetchingRarityImage } = useFetchDisplayRarityImageQuery()
  return (
    <Box
      // position={'relative'}
      bg={'legion.dark'}
      color={'white'}
      borderRadius={['3vw', '3vw', '1vw']}
      p={['3vw', '3vw', '1vw']}
    >
      <Center
        pos={'relative'}
        border={'0.1vw solid rgba(255, 255, 255, 0.9)'}
        w={'100%'}
        h={['39.5vw', '39.5vw', '14.41vw']}
        borderRadius={['3vw', '3vw', '1vw']}
        overflow={'hidden'}
        cursor={'pointer'}
        onClick={onOpenPopUpNFTModal}
      >
        <Image src={imageUrl} layout="fill" objectFit="contain" alt={''} />
      </Center>
      <Text
        align="center"
        fontSize={['4.2vw', '4.2vw', '1.4vw']}
        fontWeight={'bold'}
        textTransform={'capitalize'}
        mt={['3vw', '3vw', '1vw']}
      >
        {accounttypename} #{mmid}
      </Text>
      <Text
        align="center"
        fontSize={['3vw', '3vw', '1vw']}
        fontWeight={'bold'}
        textTransform={'capitalize'}
        mt={['1.5vw', '1.5vw', '0.5vw']}
      >
        {batchname}
      </Text>
      <Center mt={['3vw', '3vw', '1vw']}>
        {type !== 'Normal' && !isFetchingRarityImage && rarityImage.data.length > 0 && (
          <Center
            position={'relative'}
            w={['6.5vw', '6.5vw', '2vw']}
            h={['6.5vw', '6.5vw', '2vw']}
            overflow={'hidden'}
            mr={['1vw', '1vw', '0.5vw']}
          >
            <Image
              src={rarityImage.data.find((val) => val.name == type).image}
              layout="fill"
              objectFit="contain"
              alt={''}
            />
          </Center>
        )}
        <Text fontSize={['4.2vw', '4.2vw', '1.4vw']} fontWeight={'bold'} textTransform={'capitalize'}>
          {type}
        </Text>
      </Center>
      {/* <Text fontSize={'1vw'} fontWeight={'bold'} mt={'1.5vw'}>
        Reward
      </Text>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Center pos={'relative'} w={'2vw'} h={'2vw'} overflow={'hidden'}>
          <Image src={WGICTIcon} layout="fill" objectFit="contain" alt={''} placeholder={'blur'} />
        </Center>
        <Balance
          value={150.22}
          unit={' WGICT'}
          decimals={2}
          textAlign={'center'}
          fontSize={['7vw', '7vw', '0.9vw']}
          fontWeight={'extrabold'}
          me={'0.5vw'}
        />
        <Text fontSize={'0.9vw'}>Unclaimed</Text>
      </Flex> */}
      <Center mt={['3vw', '3vw', '1vw']}>
        <Link passHref href={`/my-nft-detail?nftid=${nftid?.toString()}`}>
          <Button
            colorScheme="primary"
            color={'legion.white'}
            fontSize={['3.5vw', '3.5vw', '1vw']}
            fontWeight={'bold'}
            maxH={['10vw', '10vw', '1vw']}
            w={'100%'}
            py={['5vw', '5vw', '1.5vw']}
            textTransform={'capitalize'}
            borderRadius={['1.5vw', '1.5vw', '0.5vw']}
          >
            Detail
          </Button>
        </Link>
      </Center>
    </Box>
  )
}

export default MyNFTCard
