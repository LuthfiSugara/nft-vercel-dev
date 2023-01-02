import * as React from 'react'
import { useTranslation } from '@app/context'
import { Text, HStack, Flex, Button, Grid } from '@chakra-ui/react'
import LiveAuction from './LiveAuction'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ILiveAuctionsProps {}

const LiveAuctions: React.FunctionComponent<ILiveAuctionsProps> = () => {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <>
      <HStack justifyContent={'space-between'} mt={'7vw'}>
        <Flex>
          <Text fontSize={'2.8vw'} fontWeight={'extrabold'}>
            {t('Live Auction')}
          </Text>
        </Flex>
        <Button
          variant={'ghost'}
          colorScheme={'primary'}
          fontSize={['1vw', '1vw', '1.2vw']}
          px={['1vw', '1vw', '2.5vw']}
          h={'3.5vw'}
          borderRadius={'0.5vw'}
          onClick={() => router.push('/marketplace?status=auction')}
        >
          {t('More')}
          <ArrowForwardIcon ml={'1vw'} />
        </Button>
      </HStack>
      <Grid templateColumns={'repeat(5,1fr)'} templateRows={'repeat(2,1fr)'} gap={'2vw'} w={'full'} mt={'2vw'}>
        {[...Array(10)].map((_, idx) => (
          <Grid key={idx} gap={2}>
            <LiveAuction />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default LiveAuctions
