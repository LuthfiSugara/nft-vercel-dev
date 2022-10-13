import { FC } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@app/config/theme'
import { Provider } from 'react-redux'
import store from '@app/store'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from '@app/utils/web3react'
import ListUpdater from '@app/store/lists/updater'
import MulticallUpdater from '@app/store/multicall/updater'
import TransactionUpdater from '@app/store/transactions/updater'
import { ModalProvider } from '@app/context/Modal/Provider'
import { SidebarProvider } from './context/Sidebar/Provider'
import { LanguageProvider } from './context/Localization'
import { RefreshContextProvider } from './context/RefreshContext'

const Updaters = () => (
  <>
    <ListUpdater />
    <TransactionUpdater />
    <MulticallUpdater />
  </>
)

const AppWrapper: FC = ({ children }) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <LanguageProvider>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <RefreshContextProvider>
            <ModalProvider>
              <SidebarProvider>
                <Updaters />
                {children}
              </SidebarProvider>
            </ModalProvider>
          </RefreshContextProvider>
        </ChakraProvider>
      </Provider>
    </LanguageProvider>
  </Web3ReactProvider>
)

export default AppWrapper
