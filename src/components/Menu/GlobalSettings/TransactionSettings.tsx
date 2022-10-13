import React, { useState } from 'react'
import { useTranslation } from '@app/context/Localization'
import { useUserSlippageTolerance, useUserTransactionTTL } from '@app/store/user/hooks'
import { Alert, AlertIcon, Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import QuestionHelper from '@app/components/Shared/QuestionHelper'

enum SlippageError {
  InvalidInput = 'InvalidInput',
  RiskyLow = 'RiskyLow',
  RiskyHigh = 'RiskyHigh',
}

enum DeadlineError {
  InvalidInput = 'InvalidInput',
}

const TransactionSettings = () => {
  const [userSlippageTolerance, setUserSlippageTolerance] = useUserSlippageTolerance()
  const [ttl, setTtl] = useUserTransactionTTL()
  const [slippageInput, setSlippageInput] = useState('')
  const [deadlineInput, setDeadlineInput] = useState('')

  const { t } = useTranslation()

  const slippageInputIsValid =
    slippageInput === '' || (userSlippageTolerance / 100).toFixed(2) === Number.parseFloat(slippageInput).toFixed(2)
  const deadlineInputIsValid = deadlineInput === '' || (ttl / 60).toString() === deadlineInput

  let slippageError: SlippageError | undefined
  if (slippageInput !== '' && !slippageInputIsValid) {
    slippageError = SlippageError.InvalidInput
  } else if (slippageInputIsValid && userSlippageTolerance < 50) {
    slippageError = SlippageError.RiskyLow
  } else if (slippageInputIsValid && userSlippageTolerance > 500) {
    slippageError = SlippageError.RiskyHigh
  } else {
    slippageError = undefined
  }

  let deadlineError: DeadlineError | undefined
  if (deadlineInput !== '' && !deadlineInputIsValid) {
    deadlineError = DeadlineError.InvalidInput
  } else {
    deadlineError = undefined
  }

  const parseCustomSlippage = (value: string) => {
    setSlippageInput(value)

    try {
      const valueAsIntFromRoundedFloat = Number.parseInt((Number.parseFloat(value) * 100).toString())
      if (!Number.isNaN(valueAsIntFromRoundedFloat) && valueAsIntFromRoundedFloat < 5000) {
        setUserSlippageTolerance(valueAsIntFromRoundedFloat)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const parseCustomDeadline = (value: string) => {
    setDeadlineInput(value)

    try {
      const valueAsInt: number = Number.parseInt(value) * 60
      if (!Number.isNaN(valueAsInt) && valueAsInt > 0) {
        setTtl(valueAsInt)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" mb="24px">
        <Flex mb="12px" gridColumnGap={4} align="center">
          <Text>{t('Slippage Tolerance')}</Text>
          <QuestionHelper
            label={t(
              'Setting a high slippage tolerance can help transactions succeed, but you may not get such a good price. Use with caution.'
            )}
            placement="top-start"
            ml="4px"
          />
        </Flex>
        <Flex flexWrap="wrap">
          <Button
            mt="4px"
            mr="4px"
            size="sm"
            rounded="3xl"
            onClick={() => {
              setSlippageInput('')
              setUserSlippageTolerance(10)
            }}
            colorScheme="primary"
            color="white"
            bgColor={userSlippageTolerance === 10 ? 'legion.primary' : 'legion.light'}
          >
            0.1%
          </Button>
          <Button
            mt="4px"
            mr="4px"
            size="sm"
            rounded="3xl"
            onClick={() => {
              setSlippageInput('')
              setUserSlippageTolerance(50)
            }}
            colorScheme="primary"
            color="white"
            bgColor={userSlippageTolerance === 50 ? 'legion.primary' : 'legion.light'}
          >
            0.5%
          </Button>
          <Button
            mr="4px"
            mt="4px"
            size="sm"
            rounded="3xl"
            onClick={() => {
              setSlippageInput('')
              setUserSlippageTolerance(100)
            }}
            colorScheme="primary"
            color="white"
            bgColor={userSlippageTolerance === 100 ? 'legion.primary' : 'legion.light'}
          >
            1.0%
          </Button>
          <Flex alignItems="center">
            <Box width="76px" mt="4px">
              <Input
                size="sm"
                rounded="3xl"
                placeholder={(userSlippageTolerance / 100).toFixed(2)}
                value={slippageInput}
                onBlur={() => {
                  parseCustomSlippage((userSlippageTolerance / 100).toFixed(2))
                }}
                onChange={(e) => parseCustomSlippage(e.target.value)}
                isInvalid={!slippageInputIsValid && [10, 50, 100].includes(userSlippageTolerance)}
              />
            </Box>
            <Text color="primary" ml="2px">
              %
            </Text>
          </Flex>
        </Flex>
        {!!slippageError && (
          <Alert
            status={slippageError === SlippageError.InvalidInput ? 'error' : 'warning'}
            size="sm"
            mt="4"
            fontSize="sm"
            variant="left-accent"
          >
            <AlertIcon />
            {slippageError === SlippageError.InvalidInput
              ? t('Enter a valid slippage percentage')
              : slippageError === SlippageError.RiskyLow
              ? t('Your transaction may fail')
              : t('Your transaction may be frontrun')}
          </Alert>
        )}
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mb="24px">
        <Flex alignItems="center" gridColumnGap="2" align="center">
          <Text>{t('Tx deadline (mins)')}</Text>
          <QuestionHelper
            label={t('Your transaction will revert if it is left confirming for longer than this time.')}
            placement="top-start"
            ml="4px"
          />
        </Flex>
        <Flex>
          <Box width="52px" mt="4px">
            <Input
              scale="sm"
              color={deadlineError ? 'legion.error' : undefined}
              onBlur={() => {
                parseCustomDeadline((ttl / 60).toString())
              }}
              placeholder={(ttl / 60).toString()}
              value={deadlineInput}
              onChange={(e) => parseCustomDeadline(e.target.value)}
            />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TransactionSettings
