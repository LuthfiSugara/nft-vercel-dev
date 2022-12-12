import * as React from 'react'
import { useTranslation } from '@app/context'
import { Box, Button, Center, Flex, Text, VStack } from '@chakra-ui/react'
import TopCollection from './TopCollection'
import { useRouter } from 'next/router'
import { ArrowForwardIcon } from '@chakra-ui/icons'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ITopCollectionsProps {}

const TopCollections: React.FunctionComponent<ITopCollectionsProps> = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Box px={'15vw'} pt={'2.7vw'}>
      <Text align={'center'} fontSize={['3.8vw', '2.8vw']} fontWeight={'extrabold'}>
        {t('Top Collections')}
      </Text>
      <Flex 
        width={'100%'}
        direction={{ base: 'column', md: 'row' }}
      >
        <Center w={['100%', '100%', '25%']}></Center>
        <Center w={['100%', '100%', '50%']}>
          <Text fontSize={['2.5vw', '1.5vw']} fontWeight={'medium'}>
            {t('in 7 days')}
          </Text>
        </Center>
        <Center w={['100%', '100%', '25%']}>
          <Button
            variant={'ghost'}
            colorScheme={'primary'}
            fontSize={['2vw', '1vw', '1.2vw']}
            w={'12vw'}
            h={'3.5vw'}
            borderRadius={'0.5vw'}
            onClick={() => router.push('/top-aot?tab=collections')}
          >
            {t('All Rankings')}
            <ArrowForwardIcon ml={'1vw'} />
          </Button>
        </Center>
      </Flex>
      <VStack spacing={'3vw'} my={'2vw'}>
        {[...Array(5)].map((_, idx) => (
          <TopCollection key={`top_collections_item__${idx}`} listNumber={idx + 1} />
        ))}
      </VStack>
    </Box>
  )
}

export default TopCollections
