import { useTranslation } from '@app/context'
import { WarningTwoIcon } from '@chakra-ui/icons'
import { Alert, AlertIcon, AlertTitle, AlertDescription, VStack } from '@chakra-ui/react'
import { memo } from 'react'

const NoLiquidityBanner = () => {
  const { t } = useTranslation()
  return (
    <Alert status="warning" borderColor="legion.primary" borderWidth="1px" alignItems="start" rounded="lg">
      <AlertIcon boxSize="5" as={WarningTwoIcon} />
      <VStack flex="1" align="start">
        <AlertTitle fontWeight="bold">{t('You are the first liquidity provider.')}</AlertTitle>
        <AlertDescription display="block" maxWidth="sm">
          {t('The ratio of tokens you add will set the price of this pool.')}
        </AlertDescription>
        <AlertDescription display="block" maxWidth="sm">
          {t('Once you are happy with the rate click supply to review.')}
        </AlertDescription>
      </VStack>
    </Alert>
  )
}

export default memo(NoLiquidityBanner)
