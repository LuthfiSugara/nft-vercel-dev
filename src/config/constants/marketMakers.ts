import { serializeTokens } from './tokens'
import { SerializedMarketMakerConfig } from './types'

const serializedTokens = serializeTokens()

const marketMakers: SerializedMarketMakerConfig[] = [
  {
    mmptId: 0,
    purchasingToken: serializedTokens.wgict,
    contractAddress: {
      // 97: '0x6F486Bea9A7E100CC9Aa853C299cef37a197AC1B',
      97: '0xEba61cfa9cb168fc3A98B4c047609ac9669dC23a',
      56: '0x308b1226843e01CA4353bB8c65523211281e7F1A',
    },
  },
]

export default marketMakers
