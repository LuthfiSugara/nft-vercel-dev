import { InjectedModalProps, useTranslation } from '@app/context'
import { FetchStatus, useGetBnbBalance } from '@app/hooks/useTokenBalance'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'
import { parseUnits } from 'ethers/lib/utils'
import dynamic from 'next/dynamic'
import WalletInfo from '../Menu/UserMenu/WalletInfo'
import ComponentLoader from '../Utils/ComponentLoader'

const WalletTransactions = dynamic(() => import('../Menu/UserMenu/WalletTransaction'), {
  ssr: false,
  loading: ComponentLoader,
})

export const LOW_BNB_BALANCE = parseUnits('2', 'gwei')

const ModalWalletAccount = ({ onDismiss, isOpen }: InjectedModalProps) => {
  const { balance, fetchStatus } = useGetBnbBalance()
  const hasLowBnbBalance = fetchStatus === FetchStatus.SUCCESS && balance.lte(LOW_BNB_BALANCE)
  const { t } = useTranslation()
  return (
    <Modal isCentered isOpen={isOpen} size="2xl" onClose={onDismiss}>
      <ModalOverlay />
      <ModalContent width={['90vw', 'sm']}>
        <ModalCloseButton />
        <ModalHeader>{t('Your Wallet')}</ModalHeader>
        <ModalBody borderTop="1px" borderTopColor="brand.bg.8" p="0">
          <Tabs variant="solid-rounded" colorScheme="primary" isFitted mt="4">
            <TabList bg="legion.light" p="4">
              <Tab>{t('Wallet')}</Tab>
              <Tab>{t('Transactions')}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel px="6" py="4">
                <WalletInfo hasLowBnbBalance={hasLowBnbBalance} onDismiss={onDismiss} />
              </TabPanel>
              <TabPanel px="6" py="4">
                <WalletTransactions />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalWalletAccount
