import React from 'react'
import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import DetailNFTOnSale from '@app/content/Collectible/Profile-owner-items/TabOnSale/DetailNft'

const Index = () => {
  return (
    <Layout>
      <SEO />
      <DetailNFTOnSale />
    </Layout>
  )
}

export default Index
