import React from 'react'
import styled from 'styled-components'
import { parseUnits } from 'ethers/lib/utils'
import { useTranslation } from '@app/context'
import { formatBigNumber } from '@app/utils/formatBalance'
import { Flex, Text, Button, Input, InputProps } from '@chakra-ui/react'
import Link from 'next/link'

interface ModalInputProps {
  max: string
  symbol: string
  onSelectMax?: () => void
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  value: string
  addLiquidityUrl?: string
  inputTitle?: string
  decimals?: number
  onDismiss?: () => void
}

// const getBoxShadow = ({ isWarning = false, theme }) => {
//   if (isWarning) {
//     return theme.colors.gicv.warning
//   }

//   return theme.colors.gicv.info
// }

const StyledTokenInput = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  background-color: inherit;
  border-radius: 16px;
  color: inherit;
  padding: 8px 16px 8px 0;
  width: 100%;
`

const StyledInput = styled(Input)`
  box-shadow: none;
  width: 60px;
  margin: 0;
  padding: 0 8px;
  width: auto;
`

const StyledErrorMessage = styled(Text)`
  /* position: absolute; */
  /* bottom: -22px; */
  a {
    display: inline;
  }
`

const ModalInput: React.FC<ModalInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  addLiquidityUrl,
  inputTitle,
  decimals = 18,
  onDismiss,
}) => {
  const { t } = useTranslation()
  const isBalanceZero = max === '0' || !max

  const displayBalance = (balance: string) => {
    if (isBalanceZero) {
      return '0'
    }

    const balanceUnits = parseUnits(balance, decimals)
    return formatBigNumber(balanceUnits, decimals, decimals)
  }

  return (
    <div style={{ position: 'relative' }}>
      <StyledTokenInput>
        {/* <StyledTokenInput> */}
        <Flex justifyContent="space-between">
          <Text fontSize="14px">{inputTitle}</Text>
          <Text fontSize="14px">{t('Balance: %balance%', { balance: displayBalance(max) })}</Text>
        </Flex>
        <Flex alignItems="flex-end" justifyContent="space-around" mt="14px">
          <StyledInput
            pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
            inputMode="decimal"
            step="any"
            min="0"
            onChange={onChange}
            placeholder="0"
            value={value}
          />
          <Button colorScheme="primary" color="white" size="md" scale="sm" mx="10px" onClick={onSelectMax}>
            {t('Max')}
          </Button>
          <Text fontSize="16px">{symbol}</Text>
        </Flex>
      </StyledTokenInput>
      {isBalanceZero && (
        <StyledErrorMessage fontSize="14px" color="failure">
          {t('No tokens to stake')}:{' '}
          {addLiquidityUrl && (
            <Link href={addLiquidityUrl}>
              <a onClick={onDismiss}>{t('Get %symbol%', { symbol })}</a>
            </Link>
          )}
        </StyledErrorMessage>
      )}
    </div>
  )
}

export default ModalInput
