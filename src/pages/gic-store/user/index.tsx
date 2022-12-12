import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import GICStoreUser from '@app/content/GicStoreUser';
import React from 'react'

const Index = () => {
    return (
        <Layout>
            <SEO />
            <GICStoreUser />
        </Layout>
    )
}

export default Index