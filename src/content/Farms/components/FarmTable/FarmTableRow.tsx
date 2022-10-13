import { Td, Tr, Text, Button, Image, useDisclosure, Skeleton } from '@chakra-ui/react'
import { memo, useEffect, useMemo } from 'react'
// import { useCurrency } from '@app/hooks'
// import NoSSR from '@app/components/Shared/NoSsr'
import ActionPanel from './Actions/ActionPanel'
import { useWeb3React } from '@web3-react/core'
import { useFarmUser } from '@app/store/farms/hooks'
import { BIG_ZERO } from '@app/utils/bigNumber'
import { getBalanceAmount } from '@app/utils/formatBalance'
import BigNumber from 'bignumber.js'
import { fetchFarmUserDataAsync } from '@app/store/farms'
import { useAppDispatch } from '@app/store/typed'
import { useTranslation } from '@app/context'
import Apr, { AprProps } from './Apr'
import Multiplier, { MultiplierProps } from './Multiplier'
import Liquidity, { LiquidityProps } from './Liquidity'
import { FarmWithStakedValue } from '../FarmCard/FarmCard'
import { FarmProps } from './Farm'
import { EarnedProps } from './Earned'

export interface RowProps {
  apr: AprProps
  farm: FarmProps
  earned: EarnedProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
}

interface RowPropsWithLoading extends RowProps {
  userDataReady: boolean
}

const FarmTableRow: React.FunctionComponent<RowPropsWithLoading> = (props) => {
  const { details, userDataReady } = props
  const { t } = useTranslation()
  const { isOpen, onToggle } = useDisclosure()
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const { allowance, stakedBalance } = useFarmUser(details.pid)
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  let earnings = BIG_ZERO
  // let earningsBusd = 0
  let displayBalance = useMemo(() => {
    return(
      userDataReady ? earnings.toLocaleString() : <Skeleton width={60} />
    )
  }, [userDataReady, earnings]) 
  const earningsBigNumber = new BigNumber(details.userData.earnings)
  // const legionPrice = usePriceLegionBusd()
  // const { format } = useCurrency()

  // If user didn't connect wallet default balance will be 0
  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceAmount(earningsBigNumber)
    // earningsBusd = earnings.multipliedBy(legionPrice).toNumber()
    displayBalance = earnings.toFixed(3, BigNumber.ROUND_DOWN)
  }
  
  useEffect(() => {
    dispatch(fetchFarmUserDataAsync({ account, pids: [details.pid] }))
  }, [displayBalance, dispatch, account, details.pid])
  return (
    <>
      <Tr fontWeight="bold" width="full" px={['0', '8']} borderBottom={"1px solid rgba(255,255,255,0.2)"}>
        <Td pl={[4, 12]} pr={[0, 'inherit']}>
          <Text>{details.lpSymbol}</Text>
        </Td>
        <Td pr={[0, 'inherit']} letterSpacing="wider">
          <Text color="legion.secondary" fontSize={['xs', 'md']}>
            Earned
          </Text>
          <Text>{isApproved && stakedBalance.gt(0) ? displayBalance : 0}</Text>
        </Td>
        <Td display={['none', 'table-cell']}>
          <Text color="legion.secondary" fontSize={['xs', 'md']}>APR</Text>
          <Apr {...props.apr} />
        </Td>
        <Td display={['none', 'table-cell']}>
          <Text color="legion.secondary">Liquidity</Text>
          <Liquidity {...props.liquidity} />
        </Td>
        <Td display={['none', 'table-cell']}>
          <Text color="legion.secondary">{t('Multiplier')}</Text>
          <Multiplier {...props.multiplier} />
        </Td>
        <Td pr={[0, 4]}>
          <Button
            variant={'ghost'}
            onClick={onToggle}
            display="flex"
            alignItems="center"
            justifyContent={['center', 'space-between']}
          >
            <Text display={['none', 'block']} mr="4">
              Details
            </Text>
            <Image
              src={'/svg/chevron-down-icon.svg'}
              transform={`rotate(${isOpen ? 180 : 0}deg)`}
              transition="transform"
              transitionDuration="200ms"
              alt={isOpen ? 'Close' : 'Open'}
            />
          </Button>
        </Td>
      </Tr>
      <Tr>
        <Td colSpan={6} p={0}>
          <ActionPanel {...props} expanded={isOpen} />
        </Td>
      </Tr>
    </>
  )
}

export default memo(FarmTableRow)
