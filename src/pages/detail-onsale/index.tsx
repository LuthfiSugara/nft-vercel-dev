import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import DetailOnSale from '@app/content/DetailOnSale'
import React from 'react'

const Index = () => {
  return (
    <Layout>
      <SEO />
      <DetailOnSale />
    </Layout>
  )
}

export default Index
