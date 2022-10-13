import { VStack, Menu, Flex, Input, Text, Box, Button } from '@chakra-ui/react'
import CurrencyList from '@app/components/Currency/CurrencyList'
import CurrencyLogo from '@app/components/Currency/CurrencyLogo'
import { memo } from 'react'
import { ModalTokenSelectionView } from '..'
import CurrencyCommonBases from '@app/components/Currency/CurrencyCommonBases'
import { useTranslation } from '@app/context/Localization'

const ModalTokenSelectionDefaultView = ({
  onUserSearchToken,
  searchToken,
  searchTokenIsAdded,
  filteredInactiveTokens,
  filteredSortedTokens,
  showETH,
  onSelect,
  opponent,
  setModalView,
  setImportToken,
  showCommonBases,
  chainId,
  selectedCurrency,
}) => {
  const { t } = useTranslation()
  return (
    <VStack align="stretch" spacing={4}>
      <Input
        variant="filled"
        rounded="xl"
        placeholder={t('Search name or paste address')}
        onChange={(e) => onUserSearchToken(e.target.value)}
      />
      {showCommonBases && <CurrencyCommonBases onSelect={onSelect} chainId={chainId} />}
      <Menu>
        {searchToken && !searchTokenIsAdded ? (
          <Flex>
            <Flex flex="1">
              <CurrencyLogo currency={searchToken} size={40} />
              <Box ml="2">
                <Text fontWeight="bold">{searchToken.symbol}</Text>
                <Text fontSize="xs" fontWeight="medium">
                  {searchToken.name}
                </Text>
              </Box>
            </Flex>
            <Button
              colorScheme="primary"
              color="white"
              rounded="xl"
              onClick={() => {
                setModalView(ModalTokenSelectionView.IMPORT)
                setImportToken(searchToken)
              }}
            >
              {t('Import')}
            </Button>
          </Flex>
        ) : filteredSortedTokens?.length > 0 || filteredInactiveTokens?.length > 0 ? (
          <CurrencyList
            showETH={showETH}
            breakIndex={filteredSortedTokens.length ? filteredSortedTokens.length : undefined}
            currencies={
              filteredInactiveTokens ? filteredSortedTokens.concat(filteredInactiveTokens) : filteredSortedTokens
            }
            onSelect={onSelect}
            selectedCurrency={selectedCurrency}
            disabledToken={opponent}
          />
        ) : (
          <Text textAlign="center" py="8">
            {t('No results found.')}
          </Text>
        )}
      </Menu>
    </VStack>
  )
}

export default memo(ModalTokenSelectionDefaultView)
