import CardImportToken from '@app/components/Cards/CardImportToken'
import ExternalLink from '@app/components/Link/ExternalLink'
import CurrencyLogo from '@app/components/Currency/CurrencyLogo'
import { useActiveWeb3React, useToken } from '@app/hooks'
import { useRemoveUserAddedToken } from '@app/store/user/hooks'
import { getBscScanLink, isAddress } from '@app/utils'
import { Button, IconButton, Input, Flex, Link, Text, VStack } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useCallback, useMemo, useRef, useState } from 'react'
import { ModalTokenSelectionView } from '../..'
import useUserAddedTokens from '@app/store/user/hooks/useUserAddedTokens'
import { useTranslation } from '@app/context'

const TokensManageView = ({ setModalView, onTokenSelect }) => {
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')

  // manage focus on modal show
  const inputRef = useRef<HTMLInputElement>()
  const handleInput = useCallback((event) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
  }, [])

  // if they input an address, use it
  const searchToken = useToken(searchQuery)

  // all tokens for local list
  const userAddedTokens = useUserAddedTokens()
  const removeToken = useRemoveUserAddedToken()

  const handleRemoveAll = useCallback(() => {
    if (chainId && userAddedTokens) {
      userAddedTokens.map((token) => {
        return removeToken(chainId, token.address)
      })
    }
  }, [removeToken, userAddedTokens, chainId])

  const tokenList = useMemo(() => {
    return (
      chainId &&
      userAddedTokens.map((token) => (
        <Flex key={token.address} justify="space-between" align="center" p="2">
          <Flex gridGap="2">
            <CurrencyLogo currency={token} size={24} />
            <Link isExternal href={getBscScanLink(token.address, 'address', chainId)} color="textSubtle" ml="10px">
              {token.symbol}
            </Link>
          </Flex>
          <Flex>
            <IconButton
              aria-label="Close"
              variant="text"
              onClick={() => removeToken(chainId, token.address)}
              icon={<DeleteIcon />}
            />
            <ExternalLink href={getBscScanLink(token.address, 'address', chainId)} />
          </Flex>
        </Flex>
      ))
    )
  }, [userAddedTokens, chainId, removeToken])

  const isAddressValid = searchQuery === '' || isAddress(searchQuery)

  return (
    <VStack spacing={2} align="stretch">
      <Input
        placeholder="0x0000"
        ref={inputRef}
        rounded="2xl"
        boxShadow="innner"
        onChange={handleInput}
        isInvalid={!isAddressValid}
        value={searchQuery}
      />
      {!isAddressValid && <Text color="red.300">{t('Enter valid token address')}</Text>}
      {searchToken && (
        <CardImportToken
          token={searchToken}
          showImportView={() => setModalView(ModalTokenSelectionView.IMPORT)}
          setImportToken={onTokenSelect}
        />
      )}
      {tokenList}
      <Flex justify="space-between" align="center">
        <Text color="textSubtle">
          {userAddedTokens?.length} {userAddedTokens.length === 1 ? t('Custom Token') : t('Custom Tokens')}
        </Text>
        {userAddedTokens.length > 0 && (
          <Button variant="ghost" colorScheme="primary" onClick={handleRemoveAll}>
            {t('Clear all')}
          </Button>
        )}
      </Flex>
    </VStack>
  )
}

export default TokensManageView
