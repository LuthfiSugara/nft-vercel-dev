import React from 'react'
import { Heading, Text, Flex } from '@chakra-ui/react'
import { Token } from '@aulyaaryansyah/legionswap-sdk-mainnet' 
import { useTranslation } from '@app/context' 
// import { TokenPairImage } from '@app/components/TokenImage' 


const StyledCardHeader: React.FC<{
  earningToken: Token
  stakingToken: Token
  isAutoVault?: boolean
  isFinished?: boolean
  isStaking?: boolean
}> = ({ earningToken, stakingToken, isFinished = false, isAutoVault = false }) => {
  const { t } = useTranslation()
  const isLegionPool = earningToken.symbol === 'LEGION' && stakingToken.symbol === 'LEGION'

  const getHeadingPrefix = () => {
    if (isAutoVault) {
      // vault
      return t('Auto')
    }
    if (isLegionPool) {
      // manual legion
      return t('Manual')
    }
    // all other pools
    return t('Earn')
  }

  const getSubHeading = () => {
    if (isAutoVault) {
      return t('Automatic restaking')
    }
    if (isLegionPool) {
      return t('Earn LEGION, stake LEGION')
    }
    return t('Stake %symbol%', { symbol: stakingToken.symbol })
  }

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column">
          <Heading fontSize={['7vw', '7vw', '2.5vw', '2vw']} color={isFinished ? 'textDisabled' : 'body'}>
            {`${getHeadingPrefix()} ${earningToken.symbol}`}
          </Heading>
          <Text fontSize={['4.5vw', '4.5vw', '1.6vw', '1.3vw']} color={isFinished ? 'textDisabled' : 'textSubtle'}>{getSubHeading()}</Text>
        </Flex>
        {/* {isAutoVault ? (
          <></>
        ) : (
          <TokenPairImage primaryToken={earningToken} secondaryToken={stakingToken} width={64} height={64} />
        )} */}
      </Flex>
    </>
  )
}

export default StyledCardHeader
