import * as React from 'react'
import { useTranslation } from '@app/context'
import { Text, HStack, Flex, Button, Box } from '@chakra-ui/react'
import TopCollection from './TopCollection'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ITopCollectionsProps {}

const TopCollections: React.FunctionComponent<ITopCollectionsProps> = (props) => {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <>
      <HStack justifyContent={'space-between'} mt={'7vw'}>
        <Flex>
          <Text fontSize={'2.8vw'} fontWeight={'extrabold'}>
            {t('Top Collections')}
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
      <HStack spacing={'1.2vw'} overflowX={'scroll'} mt={'1vw'} mb={'10vw'} pt={'2vw'} pb={'3vw'}>
        <Flex>
          <Text fontSize={'4vw'} fontWeight={'extrabold'} color={'gicv.gray.700'} mr={'0.7vw'}>
            1
          </Text>
          <TopCollection />
        </Flex>
        <Flex>
          <Text fontSize={'4vw'} fontWeight={'extrabold'} color={'gicv.gray.700'} mr={'0.7vw'}>
            2
          </Text>
          <TopCollection />
        </Flex>
        <Flex>
          <Text fontSize={'4vw'} fontWeight={'extrabold'} color={'gicv.gray.700'} mr={'0.7vw'}>
            3
          </Text>
          <TopCollection />
        </Flex>
      </HStack>
    </>
  )
}

export default TopCollections
