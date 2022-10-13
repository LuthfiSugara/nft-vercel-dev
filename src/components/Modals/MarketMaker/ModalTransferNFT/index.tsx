import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Button,
  Center,
  Box,
  Text,
  GridItem,
  Grid,
  Flex,
  InputGroup,
  Input,
  ModalCloseButton,
} from '@chakra-ui/react'
import { InjectedModalProps, useTranslation } from '@app/context'
import Image from 'next/image'
import Balance from '../../../Balance'
import TransferIcon from '@app/components/Icons/MarketMaker/MyNFTDetails/transfer_nft'
import { ArrowDownIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useToastApp } from '@app/hooks'
import { useFetchDisplayRarityImageQuery } from '@app/store/buyNft/buy-nft-slice'
// import NFTPic from '@public/images/MarketMaker/BuyNFT/nft_pic.png'
// import { ArrowDownIcon, CopyIcon } from '@chakra-ui/icons'
// import { CopyToClipboard } from 'react-copy-to-clipboard'
// import ModalSuccessTransferNFT from '../ModalSuccessTransferNFT'
// import { useModal } from '@app/context/Modal/useModal'

interface TransferNFTModalProps {
  onConfirm: (receiver: string, nftId: number) => void
  onDismiss?: () => void
  imageUrl: string
  accounttypename: string
  mmid: number
  batchname: string
  type: string
  nftId: number
  mmDetails: any
}

const ModalTransferNFT: React.FC<InjectedModalProps & TransferNFTModalProps> = ({
  isOpen,
  onConfirm,
  onDismiss,
  imageUrl,
  accounttypename,
  mmid,
  batchname,
  type,
  nftId,
  mmDetails,
}) => {
  // const [onOpenSuccessTransferNFTModal] = useModal(<ModalSuccessTransferNFT />)
  const [val, setVal] = useState('')
  const { toastSuccess, toastError } = useToastApp()
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const { data: rarityImage = { data: [] }, isFetching: isFetchingRarityImage } = useFetchDisplayRarityImageQuery()
  return (
    <Modal isOpen={isOpen} onClose={onDismiss} scrollBehavior={'inside'} isCentered>
      <ModalOverlay />
      <ModalContent maxW={['94vw', '94vw', '43vw']}>
        <ModalBody p={['5vw', '5vw', '1.5vw']}>
          <Flex justifyContent={'space-between'}>
            <Text fontSize={['7vw', '7vw', '2vw']} fontWeight={600}>
              {t('NFT Transfer')}
            </Text>
            <ModalCloseButton
              position={'relative'}
              fontSize={['5vw', '5vw', '1vw']}
              w={'fit-content'}
              h={'fit-content'}
            />
          </Flex>
          <Grid
            templateRows={['repeat(7, 1fr)', 'repeat(7, 1fr)', 'repeat(1, 1fr)']}
            templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(20, 1fr)']}
            gap={['5vw', '5vw', '1vw']}
            mt={['5vw', '5vw', '1vw']}
          >
            <GridItem rowSpan={[4, 4, 1]} colSpan={[1, 1, 7]}>
              <Center w={'100%'}>
                <Center
                  pos={'relative'}
                  border={'0.1vw solid rgba(255, 255, 255, 0.9)'}
                  w={['60vw', '60vw', '100%']}
                  h={['60vw', '60vw', '13.4vw']}
                  borderRadius={['3vw', '3vw', '1vw']}
                  overflow={'hidden'}
                >
                  {imageUrl && <Image src={imageUrl} layout="fill" objectFit="contain" alt={''} />}
                </Center>
              </Center>
              <Box mt={['5vw', '5vw', '1vw']}>
                <Text align={'center'} fontSize={['6vw', '6vw', '1.4vw']} fontWeight={600} textTransform={'capitalize'}>
                  {accounttypename} #{mmid}
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
                      position={'relative'}
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
            <GridItem rowSpan={[3, 3, 1]} colSpan={[1, 1, 13]}>
              <Grid templateRows={'repeat(1, 1fr)'} templateColumns={'repeat(2, 1fr)'} gap={['2vw', '2vw', '0.5vw']}>
                <GridItem
                  rowSpan={1}
                  colSpan={1}
                  bg={'legion.red.200'}
                  p={['3vw', '3vw', '1vw']}
                  borderRadius={['2vw', '2vw', '0.5vw']}
                >
                  <Text fontSize={['3.5vw', '3.5vw', '1vw']}>Profit/Loss</Text>
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
                  <Text fontSize={['3.5vw', '3.5vw', '1vw']}>All Profit (all time)</Text>
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
            </GridItem>
          </Grid>
          <Box color={'legion.primary'}>
            <Center>
              <Text fontSize={['5vw', '5vw', '1.1vw']} fontWeight={'bold'}>
                Transfer to
              </Text>
            </Center>
            <Center mt={['2vw', '2vw', '0.5vw']}>
              <ArrowDownIcon boxSize={['7vw', '7vw', '2vw']} />
            </Center>
          </Box>
          <Box>
            <Text fontSize={['3.5vw', '3.5vw', '1vw']} fontWeight={'bold'}>
              Account Address
            </Text>
            <InputGroup size="md" mt={['2vw', '2vw', '0.5vw']}>
              <Input
                value={val}
                onChange={({ target: { value } }) => {
                  setVal(value)
                }}
                fontSize={['3.5vw', '3.5vw', '1vw']}
                p={['5vw', '5vw', '1.5vw']}
                height={['10vw', '10vw', '3vw']}
                borderColor={'legion.white'}
                placeholder="Input address here"
                _placeholder={{ opacity: 0.7, color: 'legion.white', fontSize: ['3.5vw', '3.5vw', '1vw'] }}
                _hover={{ borderColor: 'legion.white' }}
              />
              {/* <InputRightElement height={'3vw'} width="3vw">
                <CopyToClipboard
                  text={value}
                  onCopy={() => toastSuccess(t('Copy to clipboard'), t('Account address has been copied'))}
                >
                  <CopyIcon boxSize={'1.5vw'} cursor={'pointer'} />
                </CopyToClipboard>
              </InputRightElement> */}
            </InputGroup>
            <Text
              align={'right'}
              fontSize={['2.5vw', '2.5vw', '0.9vw']}
              fontWeight="semibold"
              color={'legion.white'}
              mt={['2vw', '2vw', '0.5vw']}
            >
              *Triple CHECK the account address that you input
            </Text>
          </Box>
          <Center mt={['7vw', '7vw', '2vw']}>
            <Button
              colorScheme="primary"
              color="white"
              fontSize={['4vw', '4vw', '1.2vw']}
              fontWeight={'extrabold'}
              borderRadius={['2vw', '2vw', '0.5vw']}
              w={'100%'}
              p={['6vw', '6vw', '1.7vw']}
              maxH={['15vw', '15vw', '3.5vw']}
              isLoading={pendingTx}
              disabled={pendingTx}
              onClick={async () => {
                setPendingTx(true)
                try {
                  await onConfirm(val, nftId)
                  await toastSuccess(
                    `${t('Transferred')}!`,
                    t('Your NFT has Been Transferred To %val%!', {
                      val: val,
                    })
                  )
                  onDismiss()
                } catch (e) {
                  toastError(
                    t('Error'),
                    t('Please try again. Confirm the transaction and make sure you are paying enough gas!')
                  )
                  console.error(e)
                } finally {
                  setPendingTx(false)
                }
              }}
            >
              <TransferIcon boxSize={['5vw', '5vw', '1.5vw']} mr={['3vw', '3vw', '1vw']} />
              {pendingTx ? t('Transferring') : t('Transfer NFT')}
            </Button>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalTransferNFT
