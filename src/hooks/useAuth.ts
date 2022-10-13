import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { ConnectorNames, connectorsByName } from '@app/utils/web3react'
import { connectorLocalStorageKey } from '@app/config'
import { setupNetwork } from '../utils/wallet'
import useToastApp from './useToastApp'
import AppStorage from '../utils/AppStorage'
import { useTranslation } from '@app/context/Localization'
import Cookies from 'js-cookie'
import { useAppDispatch } from '@app/store/typed'
import { clearAllTransactions } from '@app/store/transactions/slice'

const useAuth = () => {
  const { chainId, activate, deactivate } = useWeb3React()
  const { toastError } = useToastApp()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const login = useCallback(
    (connectorID: ConnectorNames) => {
      const connector = connectorsByName[connectorID]
      if (connector) {
        Cookies.set(connectorLocalStorageKey, connectorID, { path: '', expires: 365 })
        AppStorage.setItem(connectorLocalStorageKey, connectorID)
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork()
            if (hasSetup) {
              activate(connector)
            }
          } else {
            AppStorage.removeItem(connectorLocalStorageKey)
            Cookies.remove(connectorLocalStorageKey)
            if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
              toastError(t('Provider Error'), t('No provider was found'))
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                connector.walletConnectProvider = null
              }
              toastError(t('Authorization Error'), t('Please authorize to access your account'))
            } else {
              toastError(error.name, error.message)
              console.error(error.name, error.message)
            }
          }
        })
      } else {
        toastError({
          title: t('Unable to find connector'),
          description: t('Connector config is wrong'),
        })
      }
    },
    [activate, t, toastError]
  )

  const logout = useCallback(() => {
    deactivate()
    if (AppStorage.getItem('walletconnect')) {
      connectorsByName.walletconnect.close()
      connectorsByName.walletconnect.walletConnectProvider = null
    }
    AppStorage.removeItem(connectorLocalStorageKey)
    Cookies.remove(connectorLocalStorageKey)
    if (chainId) {
      dispatch(clearAllTransactions({ chainId }))
    }
  }, [deactivate, chainId, dispatch])

  return { login, logout }
}

export default useAuth
