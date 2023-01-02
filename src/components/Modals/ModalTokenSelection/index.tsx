import {
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Modal,
  Text,
  Button,
  ModalFooter,
  Divider,
} from '@chakra-ui/react'
import { useAllTokens, useIsUserAddedToken, useToken } from '@app/hooks/Tokens'
import { useCallback, useMemo, useState } from 'react'
import { useActiveWeb3React, useFoundOnInactiveList } from '@app/hooks'
import useDebounce from '@app/hooks/useDebounce'
import useTokenComparator from '../../Shared/SearchModal/sorting'
import { filterTokens, useSortedTokensByQuery } from '../../Shared/SearchModal/filtering'
import BackButton from '@app/components/Buttons/BackButton'
import ModalTokenSelectionDefaultView from './components/ModalTokenSelectionDefaultView'
import { InjectedModalProps } from '@app/context'
import { Currency } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { useTranslation } from '@app/context/Localization'
// import dynamic from 'next/dynamic'
// import ComponentLoader from '@app/components/Utils/ComponentLoader'

// const ModalTokenSelectionManageView = dynamic(() => import('./components/ModalTokenSelectionManageView'), {
//   ssr: false,
//   loading: ComponentLoader,
// })
// const ModalTokenSelectionImportView = dynamic(() => import('./components/ModalTokenSelectionImportView'), {
//   ssr: false,
//   loading: ComponentLoader,
// })

export enum ModalTokenSelectionView {
  DEFAULT = 'DEFAULT',
  IMPORT = 'IMPORT',
  MANAGE = 'MANAGE',
}

interface ModalTokenSelectionProps extends InjectedModalProps {
  setSelected: (e: Currency) => void
  opponent?: Currency
  showCommonBases?: boolean
  selectedCurrency: Currency
}

export default function ModalTokenSelection({
  isOpen,
  onDismiss,
  setSelected,
  opponent,
  selectedCurrency,
  showCommonBases,
}: ModalTokenSelectionProps) {
  const allTokens = useAllTokens()
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const [searchQuery, setSearchQuery] = useState('')
  const [modalView, setModalView] = useState(ModalTokenSelectionView.DEFAULT)
  // const [importToken, setImportToken] = useState()
  const onSelect = useCallback(
    (token) => {
      onDismiss()
      setSelected(token)
    },
    [onDismiss, setSelected]
  )
  const onClose = useCallback(() => {
    onDismiss()
    setSearchQuery('')
    setModalView(ModalTokenSelectionView.DEFAULT)
  }, [onDismiss])
  const debouncedQuery = useDebounce(searchQuery, 200)
  const searchToken = useToken(debouncedQuery)
  const searchTokenIsAdded = useIsUserAddedToken(searchToken)
  const filteredTokens = useMemo(() => {
    return filterTokens(Object.values(allTokens), debouncedQuery)
  }, [allTokens, debouncedQuery])
  const [invertSearchOrder] = useState(false)
  const showETH = useMemo(() => {
    const s = debouncedQuery.toLowerCase().trim()
    return s === '' || s === 'b' || s === 'bn' || s === 'bnb'
  }, [debouncedQuery])
  const tokenComparator = useTokenComparator(invertSearchOrder)
  const sortedTokens = useMemo(() => {
    return filteredTokens.sort(tokenComparator)
  }, [filteredTokens, tokenComparator])
  const filteredSortedTokens = useSortedTokensByQuery(sortedTokens, debouncedQuery)
  const inactiveTokens = useFoundOnInactiveList(debouncedQuery)
  const filteredInactiveTokens = useSortedTokensByQuery(inactiveTokens, debouncedQuery)
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent width={['90vw', null]} border="none">
        <ModalCloseButton />
        <ModalHeader pt="4" display="flex" alignItems="center">
          {modalView === ModalTokenSelectionView.IMPORT || modalView === ModalTokenSelectionView.MANAGE ? (
            <BackButton handleBack={() => setModalView(ModalTokenSelectionView.DEFAULT)} mr="2" />
          ) : null}
          <Text letterSpacing="normal">
            {modalView === ModalTokenSelectionView.DEFAULT
              ? t('Select a Token')
              : modalView === ModalTokenSelectionView.IMPORT
              ? t('Import Tokens')
              : t('Manage Tokens')}
          </Text>
        </ModalHeader>
        <Divider />
        <ModalBody height="full">
          {modalView === ModalTokenSelectionView.DEFAULT ? (
            <ModalTokenSelectionDefaultView
              filteredInactiveTokens={filteredInactiveTokens}
              filteredSortedTokens={filteredSortedTokens}
              searchTokenIsAdded={searchTokenIsAdded}
              onUserSearchToken={setSearchQuery}
              setImportToken={"setImportToken"}
              selectedCurrency={selectedCurrency}
              setModalView={setModalView}
              searchToken={searchToken}
              onSelect={onSelect}
              opponent={opponent}
              chainId={chainId}
              showCommonBases={showCommonBases}
              showETH={showETH}
            />
          ) : modalView === ModalTokenSelectionView.IMPORT ? (
            <Text>ModalTokenSelectionView</Text>
            // <ModalTokenSelectionImportView token={importToken} onTokenSelect={onSelect} setModalView={setModalView} />
          ) : (
            <Text>ModalTokenSelectionView</Text>
            // <ModalTokenSelectionManageView setModalView={setModalView} onTokenSelect={onSelect} />
          )}
        </ModalBody>
        {!(modalView === ModalTokenSelectionView.MANAGE) && (
          <ModalFooter p="4">
            <Button
              variant="ghost"
              w="full"
              colorScheme="primary"
              rounded="2xl"
              onClick={() => setModalView(ModalTokenSelectionView.MANAGE)}
            >
              {t('Manage Tokens')}
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
}
