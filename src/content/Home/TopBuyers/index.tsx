import * as React from 'react'
import { useTranslation } from '@app/context'
import { Text, HStack, Flex, Button, Box, SimpleGrid } from '@chakra-ui/react'
import TopBuyer from './TopBuyer'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { withCustomScrollBar } from '@app/config/theme/withCustomScrollbar'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ITopBuyersProps {}

const TopBuyers: React.FunctionComponent<ITopBuyersProps> = (props) => {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <>
      <HStack justifyContent={'space-between'} mt={'7vw'}>
        <Flex>
          <Text fontSize={'2.8vw'} fontWeight={'extrabold'}>
            {t('Top Buyers')}
          </Text>
          <Text fontSize={'1.4vw'} fontWeight={'bold'} pt={'1.5vw'} pl={'1vw'}>
            {t('in 7 days')}
          </Text>
        </Flex>
        <Button
          variant={'ghost'}
          colorScheme={'primary'}
          fontSize={['1vw', '1vw', '1.2vw']}
          px={['1vw', '1vw', '2.5vw']}
          h={'3.5vw'}
          borderRadius={'0.5vw'}
          onClick={() => router.push('/collections')}
        >
          {t('More')}
          <ArrowForwardIcon ml={'1vw'} />
        </Button>
      </HStack>
      <SimpleGrid
        columns={5}
        autoColumns={'30vw'}
        spacing={'1.2vw'}
        overflowX={'scroll'}
        mt={'2vw'}
        pt={'2vw'}
        pb={'3vw'}
        sx={withCustomScrollBar()}
      >
        {[...Array(15)].map((_, idx) => (
          <Flex key={idx}>
            <Text fontSize={'4vw'} fontWeight={'extrabold'} color={'gicv.gray.700'} mr={'0.7vw'}>
              {idx + 1}
            </Text>
            <TopBuyer />
          </Flex>
        ))}
      </SimpleGrid>
    </>
  )
}

export default TopBuyers
