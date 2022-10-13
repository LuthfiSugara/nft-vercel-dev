import ComponentLoader from '@app/components/Utils/ComponentLoader'
import { useTranslation } from '@app/context'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const ListManageView = dynamic(() => import('./ListManageView'), { ssr: false, loading: ComponentLoader })
const TokensManageView = dynamic(() => import('./TokensManageView'), { ssr: false, loading: ComponentLoader })

const ModalTokenSelectionManageView = ({ setModalView, onTokenSelect }) => {
  const { t } = useTranslation()
  return (
    <Tabs variant="solid-rounded" colorScheme="primary" isFitted mt="4">
      <TabList>
        <Tab>{t('Lists')}</Tab>
        <Tab>{t('Token')}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel px="0" py="4">
          <ListManageView />
        </TabPanel>
        <TabPanel px="0" py="4">
          <TokensManageView setModalView={setModalView} onTokenSelect={onTokenSelect} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default ModalTokenSelectionManageView
