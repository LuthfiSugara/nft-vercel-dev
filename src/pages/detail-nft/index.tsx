import React from 'react'
import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import NFTDetail from '@app/content/NFTDetail'

const Index = () => {
  return (
    <Layout>
      <SEO />
      <NFTDetail />
    </Layout>
  )
}

export default Index;
