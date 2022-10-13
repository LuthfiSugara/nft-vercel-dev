type EthereumEvent = 'connect' | 'chainChanged' | 'accountsChanged' | 'networkChanged'

declare interface Window {
  ethereum?: {
    isMetamask?: boolean
    request?: (...args: any[]) => Promise<void>
    on?: (event: EthereumEvent, listener: (...args: any[]) => void) => void
    removeListener?: (event: EthereumEvent, listener: (...args: any[]) => void) => void
  }
  BinanceChain?: {
    bnbSign?: (address: string, message: string) => Promise<{ publicKey: string; signature: string }>
    on?: (event: EthereumEvent, listener: (...args: any[]) => void) => void
  }
}
