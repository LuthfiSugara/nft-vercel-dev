/**
 * @type {import("next").NextConfig}
 */

const config = {
  env: {
    CHAIN_ID: process.env.CHAIN_ID,
    RPC_NODE_1: process.env.RPC_NODE_1,
    RPC_NODE_2: process.env.RPC_NODE_2,
    RPC_NODE_3: process.env.RPC_NODE_3,
    GLOBAL_API: process.env.GLOBAL_API,
    EXTERNAL_API_GIC: process.env.EXTERNAL_API_GIC,
    APP_URL: process.env.APP_URL,
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/farms',
        destination: '/404',
        permanent: true,
      },
      {
        source: '/pools',
        destination: '/404',
        permanent: true,
      },
    ]
  },
  images: {
    disableStaticImages: false,
    domains: [
      'api.gicindonesia.com',
      'api.staging.gicindonesia.com',
      'gicverse.indoapigic.com',
      'gicv.legionswap.com',
      'mybo.gicindonesia.com',
      'bo.staging.gicindonesia.com',
      'pancakeswap.finance',
      'assets.trustwalletapp.com',
      'exchange.pancakeswap.finance',
      'front-marketplace.legionswap.com',
      'localhost',
    ],
  },
}

module.exports = config
