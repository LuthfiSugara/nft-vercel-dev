import { Modal, ModalBody, ModalContent, ModalOverlay, Button, Center, Text, GridItem, Grid } from '@chakra-ui/react'
import { InjectedModalProps, useTranslation } from '@app/context'
import Image from 'next/image'
import NFTPic from '@public/images/MarketMaker/BuyNFT/nft_pic.png'
import Balance from '../../../Balance'

export default function ModalBuyNFT({ isOpen, onDismiss }: InjectedModalProps) {
  const { t } = useTranslation()
  return (
    <Modal isOpen={isOpen} onClose={onDismiss} isCentered>
      <ModalOverlay />
      <ModalContent maxW={'25vw'}>
        <ModalBody p={'1vw'}>
          <Center mt={'1vw'}>
            <Text fontSize={'2vw'} fontWeight={600}>
              {t('Minting Success !')}
            </Text>
          </Center>
          <Center mt={'2vw'}>
            <Center
              pos={'relative'}
              border={'0.1vw solid rgba(255, 255, 255, 0.9)'}
              w={'50%'}
              h={'12.8vw'}
              borderRadius={'0.5vw'}
              overflow={'hidden'}
            >
              <Image src={NFTPic} layout="fill" objectFit="contain" alt={''} placeholder={'blur'} />
            </Center>
          </Center>
          <Center mt={'1vw'}>
            <Text fontSize={'1.5vw'} fontWeight={600}>
              MM1 #123
            </Text>
          </Center>
          <Center>
            <Text fontSize={'1vw'} fontWeight={600}>
              Sept #1
            </Text>
          </Center>
          <Grid
            templateRows={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(1, 1fr)']}
            templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)']}
            bg={'legion.red.200'}
            p={'1vw'}
            borderRadius={'0.5vw'}
            gap={'2vw'}
            mt={'2vw'}
          >
            <GridItem>
              <Text fontSize={'1vw'}>Equity :</Text>
              <Balance
                value={9885.14}
                unit={' WGICT'}
                decimals={2}
                fontSize={['7vw', '7vw', '1vw']}
                fontWeight={'extrabold'}
              />
              <Text fontSize={'1vw'} mt={'0.5vw'}>
                Balance :
              </Text>
              <Balance
                value={4705.54}
                unit={' WGICT'}
                decimals={2}
                fontSize={['7vw', '7vw', '1vw']}
                fontWeight={'extrabold'}
              />
              <Text fontSize={'1vw'} mt={'0.5vw'}>
                Laverage :
              </Text>
              <Text fontSize={'1vw'} fontWeight={'bold'}>
                1:100
              </Text>
            </GridItem>
            <GridItem>
              <Text fontSize={'1vw'}>Margin :</Text>
              <Balance value={55.3} decimals={1} fontSize={['7vw', '7vw', '1vw']} fontWeight={'extrabold'} />
              <Text fontSize={'1vw'} mt={'0.5vw'}>
                Free Margin :
              </Text>
              <Balance value={4829.89} decimals={2} fontSize={['7vw', '7vw', '1vw']} fontWeight={'extrabold'} />
              <Text fontSize={'1vw'} mt={'0.5vw'}>
                Level Margin :
              </Text>
              <Balance value={5122.23325522} decimals={8} fontSize={['7vw', '7vw', '1vw']} fontWeight={'extrabold'} />
            </GridItem>
          </Grid>
          <Center mt={'2vw'}>
            <Button
              colorScheme="primary"
              color={'legion.white'}
              fontSize={['7vw', '7vw', '1vw']}
              fontWeight={'bold'}
              maxH={'1vw'}
              w={'100%'}
              py={'1.5vw'}
              textTransform={'capitalize'}
              borderRadius={'0.5vw'}
              onClick={onDismiss}
            >
              Done
            </Button>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
