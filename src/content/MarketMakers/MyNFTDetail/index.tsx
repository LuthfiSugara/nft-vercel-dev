import { Box, ScaleFade, Grid, Flex } from '@chakra-ui/react'
import MyNFTDetailHero from './components/MyNFTDetailHero'
import { useRouter } from 'next/router'
import { useActiveWeb3React } from '@app/hooks'
import RightNFTDetailsCard from './components/RightNFTDetailsCard'
import LeftNFTDetailsCard from './components/LeftNFTDetailsCard'
import ClaimReward from './components/ClaimReward'
import ClaimRewardSpecial from './components/ClaimRewardSpecial'
import { useFetchSingleOwnerNftQuery } from '@app/store/myNftDetail/my-nft-detail-slice'
import { useEffect, useState } from 'react'
import { useFetchOwnerNftQuery } from '@app/store/myNft/my-nft-slice'

// import { useTranslation } from '@app/context'
// import Background from './components/Background'

const MyNFTDetailPageContent: React.FC = () => {
  const { account } = useActiveWeb3React()

  const router = useRouter()
  const { nftid } = router.query

  const { data: singleOwnerNft, isFetching: isSingleOwnerNftFetching } = useFetchSingleOwnerNftQuery(Number(nftid))
  const { data: ownerNFT = { data: { total: 0, records: [] } }, isFetching: isOwnerNFTFetching } =
    useFetchOwnerNftQuery({
      address: account,
      start: 1,
      row: 100,
    })
  const [ownerValidation, setOwnerValidation] = useState('loading')

  const imageUrl = singleOwnerNft?.data?.image ?? ''
  const name = singleOwnerNft?.data?.name ?? ''
  const accounttypename = singleOwnerNft?.data?.accounttypename ?? ''
  const mmid = singleOwnerNft?.data?.mmid ?? ''
  const batchname = singleOwnerNft?.data?.batchname ?? ''
  const type = singleOwnerNft?.data?.type.name ?? ''
  const batchid = singleOwnerNft?.data?.batchid ?? ''
  const ownedNft = ownerNFT.data.records

  useEffect(() => {
    if (!isOwnerNFTFetching) {
      if (ownedNft.find((e) => e.nftid === Number(nftid))) {
        setOwnerValidation('owned')
      } else {
        setOwnerValidation('notOwned')
      }
    } else {
      setOwnerValidation('loading')
    }
  }, [isOwnerNFTFetching, nftid, ownedNft])

  return (
    <Box bg={'legion.bg'} minHeight={'100vh'} py={['20vw', '20vw', '7vw']} px={['3vw', '3vw', '4vw']}>
      <Flex>
        <MyNFTDetailHero />
      </Flex>
      {!isSingleOwnerNftFetching && (
        <ScaleFade in={true} initialScale={0.9}>
          <Box px={[0, 0, '3vw']} py={['5vw', '5vw', 0]}>
            <Grid
              templateRows={['repeat(3, 1fr)', 'repeat(3, 1fr)', 'repeat(1, 1fr)']}
              templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(10, 1fr)']}
              gap={['7vw', '7vw', '1vw']}
              mt={'3vw'}
            >
              <LeftNFTDetailsCard
                rowSpan={[2, 2, 1]}
                colSpan={[1, 1, 6]}
                account={account}
                imageUrl={imageUrl}
                name={name}
                accounttypename={accounttypename}
                mmid={mmid}
                batchname={batchname}
                type={type}
                nftId={nftid}
                ownerValidation={ownerValidation}
              />
              <RightNFTDetailsCard rowSpan={1} colSpan={[1, 1, 4]} mmid={mmid} />
            </Grid>
            {ownerValidation === 'owned' && type !== '' && type !== 'Normal' && (
              <ClaimRewardSpecial account={account} nftid={nftid} batchid={batchid} />
            )}
            {ownerValidation === 'owned' && <ClaimReward account={account} nftid={nftid} mmid={mmid} />}
          </Box>
        </ScaleFade>
      )}
    </Box>
  )
}

export default MyNFTDetailPageContent
