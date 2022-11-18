import * as React from 'react'
import { useTranslation } from '@app/context'
import { Text, VStack } from '@chakra-ui/react'
import FeaturedCollection from './FeaturedCollection'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IFeaturedCollectionsProps {}

const FeaturedCollections: React.FunctionComponent<IFeaturedCollectionsProps> = () => {
  const { t } = useTranslation()
  return (
    <>
      <Text fontSize={'2.8vw'} fontWeight={'extrabold'}>
        {t('Featured Collections')}
      </Text>
      <VStack spacing={'3vw'} mt={'2vw'}>
        <FeaturedCollection />
        <FeaturedCollection />
        <FeaturedCollection />
      </VStack>
    </>
  )
}

export default FeaturedCollections
