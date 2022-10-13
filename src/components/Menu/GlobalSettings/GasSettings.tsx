import React from 'react'
import { useTranslation } from '@app/context/Localization'
import { GAS_PRICE_GWEI, GAS_PRICE } from '@app/store/user/hooks/helpers'
import { useGasPriceManager } from '@app/store/user/hooks'
import { Button, Flex, Text } from '@chakra-ui/react'
import QuestionHelper from '@app/components/Shared/QuestionHelper'

const GasSettings = () => {
  const { t } = useTranslation()
  const [gasPrice, setGasPrice] = useGasPriceManager()

  return (
    <Flex flexDirection="column">
      <Flex mb="12px" alignItems="center" gridColumnGap={2}>
        <Text>{t('Default Transaction Speed (GWEI)')}</Text>
        <QuestionHelper
          label={t(
            'Adjusts the gas price (transaction fee) for your transaction. Higher GWEI = higher speed = higher fees'
          )}
          placement="top-end"
          ml="4px"
        />
      </Flex>
      <Flex flexWrap="wrap">
        <Button
          mt="4px"
          mr="4px"
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.default)
          }}
          variant="ghost"
          isActive={gasPrice === GAS_PRICE_GWEI.default}
          colorScheme={'primary'}
        >
          {t('Standard (%gasPrice%)', { gasPrice: GAS_PRICE.default })}
        </Button>
        <Button
          mt="4px"
          mr="4px"
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.fast)
          }}
          variant="ghost"
          isActive={gasPrice === GAS_PRICE_GWEI.fast}
          colorScheme={'primary'}
        >
          {t('Fast (%gasPrice%)', { gasPrice: GAS_PRICE.fast })}
        </Button>
        <Button
          mr="4px"
          mt="4px"
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.instant)
          }}
          variant="ghost"
          isActive={gasPrice === GAS_PRICE_GWEI.instant}
          colorScheme={'primary'}
        >
          {t('Instant (%gasPrice%)', { gasPrice: GAS_PRICE.instant })}
        </Button>
      </Flex>
    </Flex>
  )
}

export default GasSettings
