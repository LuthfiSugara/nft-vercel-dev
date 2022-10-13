import { ChainId, Token } from '@aulyaaryansyah/legionswap-sdk-mainnet'
import { serializeToken } from '@app/store/user/hooks/helpers'
import { SerializedToken } from './types'

const { MAINNET, TESTNET } = ChainId

interface TokenList {
  [symbol: string]: Token
}

interface SerializedTokenList {
  [symbol: string]: SerializedToken
}

export const mainnetTokens = {
  wbnb: new Token(
    MAINNET,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.com/'
  ),
  // bnb here points to the wbnb contract. Wherever the currency BNB is required, conditional checks for the symbol 'BNB' can be used
  bnb: new Token(MAINNET, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'BNB', 'BNB', 'https://www.binance.com/'),
  cake: new Token(
    MAINNET,
    '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://pancakeswap.finance/'
  ),
  /**
   * @todo Replace with mainnet token
   */
  legion: new Token(MAINNET, '0xCdefEc2ba233D5B639535a4bbA3B9E4eBe91550E', 18, 'LGN', 'Legion'),
  busd: new Token(
    MAINNET,
    '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    18,
    'BUSD',
    'Binance USD',
    'https://raw.githubusercontent.com/aulyaaryansyah-git/token-icons/master/busd.png'
  ),
  usdt: new Token(
    MAINNET,
    '0x55d398326f99059fF775485246999027B3197955',
    18,
    'USDT',
    'Tether USD',
    'https://raw.githubusercontent.com/aulyaaryansyah-git/token-icons/master/usdt.png'
  ),
  eth: new Token(
    MAINNET,
    '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    18,
    'ETH',
    'Binance-Peg Ethereum Token',
    'https://ethereum.org/en/'
  ),
  soldier: new Token(MAINNET, '0x7708116Dd08F954F096182D1357f5C4F67444340', 18, 'SOLDIER', 'Soldier Token', ''),
  ada: new Token(
    MAINNET,
    '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47',
    18,
    'ADA',
    'Binance-Peg Cardano Token',
    'https://www.cardano.org/'
  ),
  bake: new Token(
    MAINNET,
    '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    18,
    'BAKE',
    'Bakeryswap Token',
    'https://www.bakeryswap.org/'
  ),
  tko: new Token(
    MAINNET,
    '0x9f589e3eabe42ebC94A44727b3f3531C0c877809',
    18,
    'TKO',
    'Tokocrypto Token',
    'https://www.tokocrypto.com/'
  ),
  wgict: new Token(
    MAINNET,
    '0x27B2D695eF01d10EE96582a23db201B0Aa338639',
    8,
    'WGICT',
    'GICT Token',
    'https://raw.githubusercontent.com/aulyaaryansyah-git/token-icons/master/wgict.png'
  ),
  qsd: new Token(
    MAINNET,
    '0x07AaA29E63FFEB2EBf59B33eE61437E1a91A3bb2',
    18,
    'QSD',
    'QIAN second generation dollar',
    'https://chemix.io/home'
  ),
}

export const testnetTokens = {
  qsd: new Token(
    TESTNET,
    '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://pancakeswap.finance/'
  ),
  wbnb: new Token(
    TESTNET,
    '0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.com/'
  ),
  bnb: new Token(TESTNET, '0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F', 18, 'BNB', 'BNB', 'https://www.binance.com/'),
  cake: new Token(
    TESTNET,
    '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://pancakeswap.finance/'
  ),
  legion: new Token(TESTNET, '0xCdefEc2ba233D5B639535a4bbA3B9E4eBe91550E', 18, 'LGN', 'Legion'),
  wgict: new Token(
    TESTNET,
    '0x27B2D695eF01d10EE96582a23db201B0Aa338639',
    8,
    'WGICT',
    'GICT Token',
    'https://raw.githubusercontent.com/aulyaaryansyah-git/token-icons/master/wgict.png'
  ),
  busd: new Token(TESTNET, '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee', 18, 'BUSD', 'Binance USD', ''),
  soldier: new Token(TESTNET, '0x7708116Dd08F954F096182D1357f5C4F67444340', 18, 'SOLDIER', 'Soldier Token', ''),
  bake: new Token(
    TESTNET,
    '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    18,
    'BAKE',
    'Bakeryswap Token',
    'https://www.bakeryswap.org/'
  ),
}

const tokens = (): TokenList => {
  const chainId = process.env.CHAIN_ID

  // If testnet - return list comprised of testnetTokens wherever they exist, and mainnetTokens where they don't
  if (parseInt(chainId, 10) === ChainId.TESTNET) {
    return Object.keys(mainnetTokens).reduce((accum, key) => {
      return { ...accum, [key]: testnetTokens[key] || mainnetTokens[key] }
    }, {})
  }

  return mainnetTokens
}

export const serializeTokens = (): SerializedTokenList => {
  const unserializedTokens = tokens()
  const serializedTokens = Object.keys(unserializedTokens).reduce((accum, key) => {
    return { ...accum, [key]: serializeToken(unserializedTokens[key]) }
  }, {})

  return serializedTokens
}

export default tokens()
