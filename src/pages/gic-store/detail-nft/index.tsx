import React from 'react'
import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import NFTDetail from '@app/content/NFTDetail'

export default function DetailNFT() {
    return (
        <Layout>
            <SEO/>
            <NFTDetail />
        </Layout>
    )
}