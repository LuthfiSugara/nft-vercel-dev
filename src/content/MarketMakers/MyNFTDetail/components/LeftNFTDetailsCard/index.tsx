import Balance from '@app/components/Balance'
import { Box, Button, Center, Grid, GridItem, Text } from '@chakra-ui/react'
import Image from 'next/image'
import TransferIcon from '@app/components/Icons/MarketMaker/MyNFTDetails/transfer_nft'
import ModalTransferNFT from '@app/components/Modals/MarketMaker/ModalTransferNFT'
import { useModal } from '@app/context/Modal/useModal'
import useTransferNFT from '@app/content/MarketMakers/hooks/useTransferNFT'
import { useFetchMMDetailsQuery } from '@app/store/myNftDetail/my-nft-detail-slice'
import ConnectWalletButton from '@app/components/Buttons/ConnectWalletButton'
import { useFetchDisplayRarityImageQuery } from '@app/store/buyNft/buy-nft-slice'

const LeftNFTDetailsCard = ({
  rowSpan,
  colSpan,
  account,
  nftId,
  imageUrl,
  name,
  accounttypename,
  mmid,
  batchname,
  type,
  ownerValidation,
}) => {
  const { data: rarityImage = { data: [] }, isFetching: isFetchingRarityImage } = useFetchDisplayRarityImageQuery()
  const {
    data: mmDetailsAll = {
      data: {
        profit: 0,
        total_profit: 0,
        equity: 0,
        balance: 0,
        leverage: '0:0',
        margin: 0,
        marginfree: 0,
        marginlevel: 0,
      },
    },
    isFetching: isMMDetailsFetching,
  } = useFetchMMDetailsQuery(mmid)

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

  const { onTransfer } = useTransferNFT(account)

  const handleStake = async (receiver: string) => {
    await onTransfer(receiver, nftId)
  }

  const [onOpenTransferNFTModal] = useModal(
    <ModalTransferNFT
      imageUrl={imageUrl}
      accounttypename={accounttypename}
      mmid={mmid}
      batchname={batchname}
      type={type}
      nftId={nftId}
      mmDetails={mmDetails}
      onConfirm={handleStake}
    />,
    true,
    false,
    'transferNFTModal'
  )

  return (
    <GridItem bg={'legion.dark'} borderRadius={['3vw', '3vw', '1vw']} rowSpan={rowSpan} colSpan={colSpan}>
      <Grid
        templateRows={['repeat(15, 1fr)', 'repeat(15, 1fr)', 'repeat(1, 1fr)']}
        templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(20, 1fr)']}
        gap={[0, 0, '1vw']}
        p={['3vw', '3vw', '1vw']}
      >
        <GridItem rowSpan={[8, 8, 1]} colSpan={[1, 1, 7]} py={['7vw', '7vw', 0]}>
          <Center w={'100%'}>
            <Center
              position={'relative'}
              border={'0.1vw solid rgba(255, 255, 255, 0.9)'}
              w={['60vw', '60vw', '100%']}
              h={['60vw', '60vw', '13vw']}
              borderRadius={['3vw', '3vw', '1vw']}
              overflow={'hidden'}
            >
              {imageUrl && <Image src={imageUrl} layout="fill" objectFit="contain" alt={''} />}
            </Center>
          </Center>
          <Box mt={['5vw', '5vw', '1vw']}>
            <Text align={'center'} fontSize={['6vw', '6vw', '1.4vw']} fontWeight={600} textTransform={'capitalize'}>
              {name}
            </Text>
            <Text align={'center'} fontSize={['6vw', '6vw', '1.4vw']} fontWeight={600} textTransform={'capitalize'}>
              {accounttypename} ( {mmid} )
            </Text>
            <Text
              align={'center'}
              fontSize={['4.5vw', '4.5vw', '1vw']}
              fontWeight={600}
              textTransform={'capitalize'}
              mt={['1.5vw', '1.5vw', '0.5vw']}
            >
              {batchname}
            </Text>
            <Center mt={['3vw', '3vw', '1vw']}>
              {type !== 'Normal' && !isFetchingRarityImage && rarityImage.data.length > 0 && (
                <Center
                  pos={'relative'}
                  w={['10vw', '10vw', '2vw']}
                  h={['10vw', '10vw', '2vw']}
                  overflow={'hidden'}
                  mr={['2vw', '2vw', '0.5vw']}
                >
                  <Image
                    src={rarityImage.data.find((val) => val.name == type).image}
                    layout="fill"
                    objectFit="contain"
                    alt={''}
                  />
                </Center>
              )}
              <Text fontSize={['6vw', '6vw', '1.4vw']} fontWeight={600} textTransform={'capitalize'}>
                {type}
              </Text>
            </Center>
          </Box>
        </GridItem>
        <GridItem rowSpan={[7, 7, 1]} colSpan={[1, 1, 13]}>
          <Text
            align={'center'}
            fontSize={['5vw', '5vw', '1.1vw']}
            fontWeight={'bold'}
            mt={[0, 0, '0.2vw']}
            mb={['5vw', '5vw', '1vw']}
          >
            Market Maker Performance
          </Text>
          {!isMMDetailsFetching ? (
            <>
              <Grid templateRows={'repeat(1, 1fr)'} templateColumns={'repeat(2, 1fr)'} gap={['2vw', '2vw', '0.5vw']}>
                <GridItem
                  rowSpan={1}
                  colSpan={1}
                  bg={'legion.red.200'}
                  p={['3vw', '3vw', '1vw']}
                  borderRadius={['2vw', '2vw', '0.5vw']}
                >
                  <Text fontSize={['3.2vw', '3.2vw', '0.85vw']}>Profit/Loss ( 7 days )</Text>
                  <Balance
                    value={mmDetails.profit}
                    unit={' WGICT'}
                    decimals={2}
                    fontSize={['4vw', '4vw', '1vw']}
                    fontWeight={'extrabold'}
                  />
                </GridItem>
                <GridItem
                  rowSpan={1}
                  colSpan={1}
                  bg={'legion.red.200'}
                  p={['3vw', '3vw', '1vw']}
                  borderRadius={['2vw', '2vw', '0.5vw']}
                >
                  <Text fontSize={['3.2vw', '3.2vw', '0.85vw']}>All Time Realized Profit</Text>
                  <Balance
                    value={mmDetails.total_profit}
                    unit={' WGICT'}
                    decimals={2}
                    fontSize={['4vw', '4vw', '1vw']}
                    fontWeight={'extrabold'}
                  />
                </GridItem>
              </Grid>
              <Grid
                templateRows={'repeat(1, 1fr)'}
                templateColumns={'repeat(2, 1fr)'}
                bg={'legion.red.200'}
                mt={['2vw', '2vw', '0.5vw']}
                gap={['2vw', '2vw', '0.5vw']}
                p={['3vw', '3vw', '1vw']}
                borderRadius={['2vw', '2vw', '0.5vw']}
              >
                <GridItem rowSpan={1} colSpan={1}>
                  <Text fontSize={['3.5vw', '3.5vw', '1vw']}>Equity :</Text>
                  <Balance
                    value={mmDetails.equity}
                    unit={' WGICT'}
                    decimals={2}
                    fontSize={['4vw', '4vw', '1vw']}
                    fontWeight={'extrabold'}
                  />
                  <Text fontSize={['3.5vw', '3.5vw', '1vw']} mt={['2vw', '2vw', '0.5vw']}>
                    Balance :
                  </Text>
                  <Balance
                    value={mmDetails.balance}
                    unit={' WGICT'}
                    decimals={2}
                    fontSize={['4vw', '4vw', '1vw']}
                    fontWeight={'extrabold'}
                  />
                  <Text fontSize={['3.5vw', '3.5vw', '1vw']} mt={['2vw', '2vw', '0.5vw']}>
                    Laverage :
                  </Text>
                  <Text fontSize={['3.5vw', '3.5vw', '1vw']} fontWeight={'bold'}>
                    {mmDetails.leverage}
                  </Text>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                  <Text fontSize={['3.5vw', '3.5vw', '1vw']}>Margin :</Text>
                  <Balance
                    value={mmDetails.margin}
                    decimals={1}
                    fontSize={['4vw', '4vw', '1vw']}
                    fontWeight={'extrabold'}
                  />
                  <Text fontSize={['3.5vw', '3.5vw', '1vw']} mt={['2vw', '2vw', '0.5vw']}>
                    Free Margin :
                  </Text>
                  <Balance
                    value={mmDetails.marginfree}
                    decimals={2}
                    fontSize={['4vw', '4vw', '1vw']}
                    fontWeight={'extrabold'}
                  />
                  <Text fontSize={['3.5vw', '3.5vw', '1vw']} mt={['2vw', '2vw', '0.5vw']}>
                    Level Margin :
                  </Text>
                  <Balance
                    value={mmDetails.marginlevel}
                    decimals={8}
                    fontSize={['4vw', '4vw', '1vw']}
                    fontWeight={'extrabold'}
                  />
                </GridItem>
              </Grid>
              {account ? (
                <Button
                  colorScheme="primary"
                  color={'legion.white'}
                  fontSize={['4.5vw', '4.5vw', '1.2vw']}
                  fontWeight={'extrabold'}
                  borderRadius={['2vw', '2vw', '0.5vw']}
                  w={'100%'}
                  py={['7vw', '7vw', '1.7vw']}
                  maxH={['5vw', '5vw', '3.5vw']}
                  mt={['5vw', '5vw', '1vw']}
                  onClick={onOpenTransferNFTModal}
                  disabled={ownerValidation !== 'owned'}
                >
                  <TransferIcon boxSize={['5vw', '5vw', '1.5vw']} mr={['3vw', '3vw', '1vw']} />
                  {ownerValidation === 'loading' ? 'Loading...' : 'Transfer NFT'}
                </Button>
              ) : (
                <ConnectWalletButton
                  colorScheme="primary"
                  color={'legion.white'}
                  fontSize={['4.5vw', '4.5vw', '1.2vw']}
                  fontWeight={'extrabold'}
                  borderRadius={['2vw', '2vw', '0.5vw']}
                  w={'100%'}
                  py={['7vw', '7vw', '1.7vw']}
                  maxH={['5vw', '5vw', '3.5vw']}
                  mt={['5vw', '5vw', '1vw']}
                />
              )}
            </>
          ) : (
            <>
              <Grid templateRows={'repeat(1, 1fr)'} templateColumns={'repeat(2, 1fr)'} gap={['2vw', '2vw', '0.5vw']}>
                <GridItem
                  rowSpan={1}
                  colSpan={1}
                  bg={'legion.red.200'}
                  p={['3vw', '3vw', '1vw']}
                  borderRadius={['2vw', '2vw', '0.5vw']}
                >
                  <Text fontSize={['3.2vw', '3.2vw', '0.85vw']}>Profit/Loss ( 7 days )</Text>
                  <Balance
                    value={0}
                    unit={' WGICT'}
                    decimals={2}
                    fontSize={['4vw', '4vw', '1vw']}
                    fontWeight={'extrabold'}
                  />
                </GridItem>
                <GridItem
                  rowSpan={1}
                  colSpan={1}
                  bg={'legion.red.200'}
                  p={['3vw', '3vw', '1vw']}
                  borderRadius={['2vw', '2vw', '0.5vw']}
                >
                  <Text fontSize={['3.2vw', '3.2vw', '0.85vw']}>All Time Realized Profit</Text>
                  <Balance
                    value={0}
                    unit={' WGICT'}
                    decimals={2}
                    fontSize={['4vw', '4vw', '1vw']}
                    fontWeight={'extrabold'}
                  />
                </GridItem>
              </Grid>
              <Grid
                templateRows={'repeat(1, 1fr)'}
                templateColumns={'repeat(2, 1fr)'}
                bg={'legion.red.200'}
                mt={['2vw', '2vw', '0.5vw']}
                gap={['2vw', '2vw', '0.5vw']}
                p={['3vw', '3vw', '1vw']}
                borderRadius={['2vw', '2vw', '0.5vw']}
              >
                <GridItem rowSpan={1} colSpan={1}>
                  <Text fontSize={['3.5vw', '3.5vw', '1vw']}>Equity :</Text>
                  <Balance
                    value={0}
                    unit={' WGICT'}
                    decimals={2}
                    fontSize={['4vw', '4vw', '1vw']}
                    fontWeight={'extrabold'}
                  />
                  <Text fontSize={['3.5vw', '3.5vw', '1vw']} mt={['2vw', '2vw', '0.5vw']}>
                    Balance :
                  </Text>
                  <Balance
                    value={0}
                    unit={' WGICT'}
                    decimals={2}
                    fontSize={['4vw', '4vw', '1vw']}
                    fontWeight={'extrabold'}
                  />
                  <Text fontSize={['3.5vw', '3.5vw', '1vw']} mt={['2vw', '2vw', '0.5vw']}>
                    Laverage :
                  </Text>
                  <Text fontSize={['3.5vw', '3.5vw', '1vw']} fontWeight={'bold'}>
                    0:0
                  </Text>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                  <Text fontSize={['3.5vw', '3.5vw', '1vw']}>Margin :</Text>
                  <Balance value={0} decimals={1} fontSize={['4vw', '4vw', '1vw']} fontWeight={'extrabold'} />
                  <Text fontSize={['3.5vw', '3.5vw', '1vw']} mt={['2vw', '2vw', '0.5vw']}>
                    Free Margin :
                  </Text>
                  <Balance value={0} decimals={2} fontSize={['4vw', '4vw', '1vw']} fontWeight={'extrabold'} />
                  <Text fontSize={['3.5vw', '3.5vw', '1vw']} mt={['2vw', '2vw', '0.5vw']}>
                    Level Margin :
                  </Text>
                  <Balance value={0} decimals={8} fontSize={['4vw', '4vw', '1vw']} fontWeight={'extrabold'} />
                </GridItem>
              </Grid>
              <Button
                disabled={true}
                colorScheme="primary"
                color={'legion.white'}
                fontSize={['4.5vw', '4.5vw', '1.2vw']}
                fontWeight={'extrabold'}
                borderRadius={['2vw', '2vw', '0.5vw']}
                w={'100%'}
                py={['7vw', '7vw', '1.7vw']}
                maxH={['5vw', '5vw', '3.5vw']}
                mt={['5vw', '5vw', '1vw']}
              >
                <TransferIcon boxSize={['5vw', '5vw', '1.5vw']} mr={['3vw', '3vw', '1vw']} />
                Loading...
              </Button>
            </>
          )}
        </GridItem>
      </Grid>
    </GridItem>
  )
}

export default LeftNFTDetailsCard
