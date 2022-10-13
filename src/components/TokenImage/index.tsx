// import React from 'react'
// import {
//   TokenPairImage as UIKitTokenPairImage,
//   TokenPairImageProps as UIKitTokenPairImageProps,
//   TokenImage as UIKitTokenImage,
//   ImageProps,
// } from '@pancakeswap/uikit'
// import tokens from '@app/config/constants/tokens'
// import { Token } from '@aulyaaryansyah/legionswap-sdk-mainnet'

// interface TokenPairImageProps {
//   primaryToken: Token
//   secondaryToken: Token
// }

// const getImageUrlFromToken = (token: Token) => {
//   const address = token.symbol === 'BNB' ? tokens.wbnb.address : token.address
//   return `/images/tokens/${address}.svg`
// }

// export const TokenPairImage: React.FC<TokenPairImageProps> = ({ primaryToken, secondaryToken, ...props }) => {
//   return (
//     <UIKitTokenPairImage
//       primarySrc={getImageUrlFromToken(primaryToken)}
//       secondarySrc={getImageUrlFromToken(secondaryToken)}
//       {...props}
//     />
//   )
// }

// interface TokenImageProps extends ImageProps {
//   token: Token
// }

// export const TokenImage: React.FC<TokenImageProps> = ({ token, ...props }) => {
//   return <UIKitTokenImage src={getImageUrlFromToken(token)} {...props} />
// }

import React from 'react'

const index = () => {
  return (
    <div>
      
    </div>
  )
}

export default index
