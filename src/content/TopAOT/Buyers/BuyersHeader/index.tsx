import { useTranslation } from '@app/context'
import { Center, Flex, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'

const BuyersHeader = () => {
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
      <GridItem colSpan={5}></GridItem>
      <GridItem colSpan={3}>
        <Flex h={'full'} alignItems={'center'}>
          {t('NFTs Bought')}
        </Flex>
      </GridItem>
      <GridItem colSpan={3}>
        <Flex h={'full'} alignItems={'center'} justifyContent={'right'}>
          {t('Total Purchase')}
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default BuyersHeader
