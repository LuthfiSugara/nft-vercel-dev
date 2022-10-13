import React from 'react'
import styled from 'styled-components'
import { useFarmUser } from '@app/store/farms/hooks'
import { useTranslation } from '@app/context' 
import { Text } from '@chakra-ui/react'
import { Token } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { getBalanceNumber } from '@app/utils/formatBalance'
// import { TokenPairImage } from '@app/components/TokenImage'

export interface FarmProps {
  label: string
  pid: number
  token: Token
  quoteToken: Token
}

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
  }
`

const TokenWrapper = styled.div`
  padding-right: 8px;
  width: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 40px;
  }
`

const Farm: React.FunctionComponent<FarmProps> = ({ label, pid }) => {
  const { stakedBalance } = useFarmUser(pid)
  const { t } = useTranslation()
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const handleRenderFarming = (): JSX.Element => {
    if (rawStakedBalance) {
      return (
        <Text color="secondary" fontSize="12px" bold textTransform="uppercase">
          {t('Farming')}
        </Text>
      )
    }

    return null
  }

  return (
    <Container>
      <TokenWrapper>
        {/* <TokenPairImage variant="inverted" primaryToken={token} secondaryToken={quoteToken} width={40} height={40} /> */}
      </TokenWrapper>
      <div>
        {handleRenderFarming()}
        <Text>{label}</Text>
      </div>
    </Container>
  )
}

export default Farm
