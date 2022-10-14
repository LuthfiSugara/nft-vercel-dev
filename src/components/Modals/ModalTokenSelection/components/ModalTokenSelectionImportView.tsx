import ListLogo from '@app/components/Logo/ListLogo'
import { useTranslation } from '@app/context'
import { useActiveWeb3React } from '@app/hooks'
import { useCombinedInactiveList } from '@app/store/lists/hooks'
import { useAddUserToken } from '@app/store/user/hooks'
import { getBscScanLink } from '@app/utils'
import truncateHash from '@app/utils/truncateHash'
import { WarningIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { ModalTokenSelectionView } from '..'

const ModalTokenSelectionImportView = ({ token, onTokenSelect, setModalView }) => {
  const [confirmed, setConfirmed] = useState(false)
  const { chainId } = useActiveWeb3React()
  const addToken = useAddUserToken()
  const handleImport = useCallback(() => {
    if (token) {
      addToken(token)
      setModalView(ModalTokenSelectionView.DEFAULT)
      if (onTokenSelect) {
        onTokenSelect(token)
      }
    }
  }, [token, onTokenSelect, addToken, setModalView])
  // use for showing import source on inactive tokens
  const inactiveTokenList = useCombinedInactiveList()
  const list = chainId && inactiveTokenList?.[chainId]?.[token.address]?.list
  const { t } = useTranslation()
  // const address = token.address ? `${truncateHash(token.address)}` : null
  return (
    <Box>
      <Divider />
      <Alert
        status="warning"
        variant="left-accent"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        rounded="lg"
        mb="4"
      >
        <AlertIcon boxSize="24px" mr={0} mt={22} mb={4} />
        <AlertDescription maxWidth="sm" fontSize="sm" mb={2}>
          {t(
            'Anyone can create a BEP20 token on BSC with any name, including creating fake versions of existing tokens and tokens that claim to represent projects that do not have a token.'
          )}
        </AlertDescription>
        <AlertDescription maxWidth="sm" fontSize="sm">
          {t('If you purchase an arbitrary token, you may be unable to sell it back.')}
        </AlertDescription>
      </Alert>
      {token && (
        <Box>
          {list !== undefined ? (
            <Tag variant="outline" colorScheme="green" scale="sm" w="full" p="2">
              {list.logoURI ? (
                <TagLeftIcon>
                  <ListLogo logoURI={list.logoURI} size="12px" />
                </TagLeftIcon>
              ) : null}
              <TagLabel>
                {t('via')} {list.name}
              </TagLabel>
            </Tag>
          ) : (
            <Tag variant="outline" colorScheme="red" w="full" p="2">
              <TagLeftIcon as={WarningIcon} />
              <TagLabel>{t('Unknown Source')}</TagLabel>
            </Tag>
          )}
          <Text mt="2">
            {token.name} ({token.symbol})
          </Text>
          {chainId && (
            <Flex mb="4">
              <Text flex="1">{truncateHash(token.address)}</Text>
              <Button
                as="a"
                variant="link"
                backgroundColor="inherit"
                color="gicv.primary"
                cursor="pointer"
                target="_blank"
                rel="noopener noreferrer"
                href={getBscScanLink(token.address, 'address')}
              >
                {t('View on BscScan')}
              </Button>
            </Flex>
          )}
          <Flex>
            <Checkbox onChange={() => setConfirmed((prev) => !prev)} flex="1" colorScheme="yellow">
              {t('I understand')}
            </Checkbox>
            <Button
              colorScheme="primary"
              color="white"
              onClick={handleImport}
              p="6"
              rounded="2xl"
              size="md"
              disabled={!confirmed}
            >
              {t('Import')}
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  )
}

export default ModalTokenSelectionImportView
