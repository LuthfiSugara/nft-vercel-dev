import { useActiveWeb3React, useIsTokenActive, useIsUserAddedToken } from '@app/hooks'
import { useCombinedInactiveList } from '@app/store/lists/hooks'
import { Token } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import ListLogo from '../Logo/ListLogo'
import CurrencyLogo from '../Currency/CurrencyLogo'
import { Button, Box, Flex, Text } from '@chakra-ui/react'

interface CardImportTokenProps {
  token: Token
  showImportView: () => void
  setImportToken: (token: Token) => void
}

const CardImportToken = ({ token, showImportView, setImportToken }: CardImportTokenProps) => {
  // globals
  const { chainId } = useActiveWeb3React()

  // check if token comes from list
  const inactiveTokenList = useCombinedInactiveList()
  const list = chainId && inactiveTokenList?.[chainId]?.[token.address]?.list

  // check if already active on list or local storage tokens
  const isAdded = useIsUserAddedToken(token)
  const isActive = useIsTokenActive(token)
  return (
    <Flex align="center">
      <Flex gridColumnGap="4" flex="1">
        <CurrencyLogo currency={token} size={40} />
        <Box ml="2">
          <Text fontWeight="bold">{token.symbol}</Text>
          <Text fontSize="xs" fontWeight="medium">
            {token.name}
          </Text>
        </Box>
        {list && list.logoURI && (
          <Flex>
            <Text mr="4px" color="textSubtle">
              {'via'} {list.name}
            </Text>
            <ListLogo logoURI={list.logoURI} size="12px" />
          </Flex>
        )}
      </Flex>
      {!isActive && !isAdded ? (
        <Button
          colorScheme="primary"
          color="white"
          onClick={() => {
            if (setImportToken) {
              setImportToken(token)
            }
            showImportView()
          }}
        >
          Import
        </Button>
      ) : (
        <Text>Active</Text>
      )}
    </Flex>
  )
}

export default CardImportToken
