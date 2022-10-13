import {
  BinanceWalletIcon,
  MathWalletIcon,
  MetamaskIcon,
  SafepalIcon,
  TokenPocketIcon,
  TrustWalletIcon,
  WalletConnectIcon,
} from '@app/components/Icons'
import { ConnectorNames } from '@app/utils/web3react'
import { Icon } from '@chakra-ui/icons'

export interface Wallet {
  connectorId: ConnectorNames
  label: string
  icon: typeof Icon
}

export const walletSelections: Wallet[] = [
  {
    connectorId: ConnectorNames.Injected,
    label: 'Metamask',
    icon: MetamaskIcon,
  },
  {
    connectorId: ConnectorNames.Injected,
    label: 'TrustWallet',
    icon: TrustWalletIcon,
  },
  {
    connectorId: ConnectorNames.Injected,
    label: 'MathWallet',
    icon: MathWalletIcon,
  },
  {
    connectorId: ConnectorNames.Injected,
    label: 'TokenPocket',
    icon: TokenPocketIcon,
  },
  {
    connectorId: ConnectorNames.WalletConnect,
    label: 'WalletConnect',
    icon: WalletConnectIcon,
  },
  {
    connectorId: ConnectorNames.BSC,
    label: 'Binance Chain Wallet',
    icon: BinanceWalletIcon,
  },
  {
    connectorId: ConnectorNames.Injected,
    label: 'SafePal Wallet',
    icon: SafepalIcon,
  },
]
