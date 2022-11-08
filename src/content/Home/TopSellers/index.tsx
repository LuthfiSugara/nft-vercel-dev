import * as React from 'react'
import { useTranslation } from '@app/context'
import { Text, HStack, Flex, Button, Box, SimpleGrid, VStack } from '@chakra-ui/react'
import TopSeller from './TopSeller'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { withCustomScrollBar } from '@app/config/theme/withCustomScrollbar'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ITopSellersProps {}

const TopSellers: React.FunctionComponent<ITopSellersProps> = (props) => {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <>
      <HStack justifyContent={'space-between'} mt={'7vw'}>
        <Flex>
          <Text fontSize={'2.8vw'} fontWeight={'extrabold'}>
            {t('Top Sellers')}
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
          onClick={() => router.push('/top-sellers')}
        >
          {t('More')}
          <ArrowForwardIcon ml={'1vw'} />
        </Button>
      </HStack>
      <Flex overflowX={'scroll'} mt={'2vw'} pb={'1vw'} sx={withCustomScrollBar()}>
        {[...Array(15)].map((_, idp) => (
          <Box key={`top__sellers__horizontal__${idp}`}>
            {idp % 3 === 0 && (
              <Flex direction={'column'} w={'22vw'} mr={'2vw'}>
                {[...Array(3)].map((_, idc) => (
                  <HStack key={`top__sellers__vertical__${idc}`} justifyContent={'space-between'} mb={'1.5vw'}>
                    <Text fontSize={'2.2vw'} fontWeight={'extrabold'} color={'gicv.gray.700'}>
                      {idp + 1 + idc}
                    </Text>
                    <TopSeller />
                  </HStack>
                ))}
              </Flex>
            )}
          </Box>
        ))}
      </Flex>
    </>
  )
}

export default TopSellers
