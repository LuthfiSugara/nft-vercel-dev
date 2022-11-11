import { useTranslation } from '@app/context'
import { Center, Flex, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'

const CollectionsHeader = () => {
  const { t } = useTranslation()
  return (
    <Grid
      templateColumns={'repeat(12,1fr)'}
      borderBottom={'0.12vw solid'}
      borderColor={'gicv.gray.100'}
      color={'gicv.gray.600'}
      pb={'1vw'}
      pr={'2vw'}
    >
      <GridItem colSpan={1}>
        <Center>{t('Rank')}</Center>
      </GridItem>
      <GridItem colSpan={3}></GridItem>
      <GridItem colSpan={2}>
        <Flex h={'full'} alignItems={'center'}>
          {t('Owner')}
        </Flex>
      </GridItem>
      <GridItem colSpan={2}>
        <Flex h={'full'} alignItems={'center'}>
          {t('NFTs Sold')}
        </Flex>
      </GridItem>
      <GridItem colSpan={2}>
        <Flex h={'full'} alignItems={'center'} justifyContent={'right'}>
          {t('Volume')}
        </Flex>
      </GridItem>
      <GridItem colSpan={2}>
        <Flex h={'full'} alignItems={'center'} justifyContent={'right'}>
          {t('Floor Price')}
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default CollectionsHeader
