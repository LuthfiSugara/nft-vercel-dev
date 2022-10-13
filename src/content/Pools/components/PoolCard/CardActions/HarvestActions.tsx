import React, { useEffect } from 'react'
import { Flex, Button, Skeleton } from '@chakra-ui/react'
import BigNumber from 'bignumber.js'
import { useTranslation } from '@app/context' 
import { getFullDisplayBalance, getBalanceNumber, formatNumber } from '@app/utils/formatBalance'
import Balance from '@app/components/Balance'
import { useModal } from '@app/context/Modal/useModal'
import CollectModal from '../Modals/CollectModal'
import { Token } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { useWeb3React } from '@web3-react/core'
import { fetchPoolsUserDataAsync } from '@app/store/pools'
import { useAppDispatch } from '@app/store/typed'

interface HarvestActionsProps {
  earnings: BigNumber
  earningToken: Token
  sousId: number
  earningTokenPrice: number
  isBnbPool: boolean
  isLoading?: boolean
}

const HarvestActions: React.FC<HarvestActionsProps> = ({
  earnings,
  earningToken,
  sousId,
  isBnbPool,
  earningTokenPrice,
  isLoading = false,
}) => {
  const { t } = useTranslation()
  const earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals)
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3)

  const earningTokenDollarBalance = getBalanceNumber(earnings.multipliedBy(earningTokenPrice), earningToken.decimals)

  const fullBalance = getFullDisplayBalance(earnings, earningToken.decimals)
  const hasEarnings = earnings.toNumber() > 0
  const isCompoundPool = sousId === 0

  const { account } = useWeb3React()
  const dispatch = useAppDispatch()

  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      fullBalance={fullBalance}
      earningToken={earningToken}
      earningsDollarValue={earningTokenDollarBalance}
      sousId={sousId}
      isBnbPool={isBnbPool}
      isCompoundPool={isCompoundPool}
    />,
    true,
    true,
    'collectModal'
  )

  useEffect(() => {
    dispatch(fetchPoolsUserDataAsync(account))
  }, [earnings, earningToken])

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex flexDirection="column">
        {isLoading ? (
          <Skeleton width={['36vw', '36vw', '13vw', '10vw']} height={['7.5vw', '7.5vw', '3.3vw', '2.5vw']} />
        ) : (
          <>
            {hasEarnings ? (
              <>
                <Balance fontSize={['5vw', '5vw', '1.7vw', '1.2vw']} decimals={2} value={earningTokenBalance} />
                {/* {earningTokenPrice > 0 && (
                  <Balance
                    display="inline"
                    fontSize="12px"
                    color="textSubtle"
                    decimals={2}
                    prefix="~"
                    value={earningTokenDollarBalance}
                    unit=" USD"
                  />
                )} */}
              </>
            ) : (
              <>
                <Balance fontSize={['5vw', '5vw', '1.7vw', '1.2vw']} value={0} />
                {/* <Text fontSize="12px" color="textDisabled">
                  0 USD
                </Text> */}
              </>
            )}
          </>
        )}
      </Flex>
      <Button 
        colorScheme="primary" 
        color="white" 
        fontSize={['4.5vw', '4.5vw', '1.4vw', '1vw']}
        borderRadius={['2vw', '2vw', '0.5vw']}
        disabled={!hasEarnings} 
        onClick={onPresentCollect}
        py={['5vw', '5vw', '1.7vw', '1.4vw']}
        px={['4.5vw', '4.5vw', '1.8vw', '1.5vw']}
      >
        {isCompoundPool ? t('Collect') : t('Harvest')}
      </Button>
    </Flex>
  )
}

export default HarvestActions
