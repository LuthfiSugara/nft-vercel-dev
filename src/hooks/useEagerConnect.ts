import { useEffect } from 'react'
import { useAuth } from '@app/hooks'
import { connectorLocalStorageKey } from '@app/config'
import { ConnectorNames } from '@app/utils/web3react'
import Cookies from 'js-cookie'
import AppStorage from '@app/utils/AppStorage'

const _binanceChainListener = async () =>
  new Promise<void>((resolve) =>
    Object.defineProperty(window, 'BinanceChain', {
      get() {
        return this.bsc
      },
      set(bsc) {
        this.bsc = bsc

        resolve()
      },
    })
  )

const useEagerConnect = () => {
  const { login } = useAuth()

  useEffect(() => {
    const connectorIdFromCookie = Cookies.get(connectorLocalStorageKey) as ConnectorNames
    const connectorIdFromLS: ConnectorNames = AppStorage.getItem(connectorLocalStorageKey)
    const connectorId = connectorIdFromLS || connectorIdFromCookie

    if (connectorId) {
      const isConnectorBinanceChain = connectorId === ConnectorNames.BSC
      const isBinanceChainDefined = Reflect.has(window, 'BinanceChain')

      // Currently BSC extension doesn't always inject in time.
      // We must check to see if it exists, and if not, wait for it before proceeding.
      if (isConnectorBinanceChain && !isBinanceChainDefined) {
        _binanceChainListener().then(() => login(connectorId))
        return
      }

      login(connectorId)
    }
  }, [login])
}

export default useEagerConnect
