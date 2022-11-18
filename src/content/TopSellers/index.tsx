import * as React from 'react'
import { useTranslation } from '@app/context'
import { Box, Button, Center, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import TopSeller from './TopSeller'
import { useRouter } from 'next/router'
import { ArrowForwardIcon } from '@chakra-ui/icons'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ITopSellersProps {}

const TopSellers: React.FunctionComponent<ITopSellersProps> = () => {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <Box px={'15vw'} pt={'2.7vw'}>
      <Text align={'center'} fontSize={'2.8vw'} fontWeight={'extrabold'}>
        {t('Top Sellers')}
      </Text>
      <SimpleGrid columns={3}>
        <Center></Center>
        <Center>
          <Text fontSize={'1.5vw'} fontWeight={'medium'}>
            {t('in 7 days')}
          </Text>
        </Center>
        <Flex alignItems={'center'} justifyContent={'right'}>
          <Button
            variant={'ghost'}
            colorScheme={'primary'}
            fontSize={['1vw', '1vw', '1.2vw']}
            w={'12vw'}
            h={'3.5vw'}
            borderRadius={'0.5vw'}
            onClick={() => router.push('/top-aot?tab=sellers')}
          >
            {t('All Rankings')}
            <ArrowForwardIcon ml={'1vw'} />
          </Button>
        </Flex>
      </SimpleGrid>
      <VStack spacing={'3vw'} my={'2vw'}>
        {[...Array(5)].map((_, idx) => (
          <TopSeller key={`top_sellers_item__${idx}`} listNumber={idx + 1} />
        ))}
      </VStack>
    </Box>
  )
}

export default TopSellers
