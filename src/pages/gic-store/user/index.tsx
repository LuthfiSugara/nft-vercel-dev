import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import GICStoreUser from '@app/content/GicStoreUser';
import React from 'react'
import { useAppSelector } from '@app/store/typed'

const Index = () => {
    const nft = useAppSelector((state) => state.nft);

    console.log("total : ", nft.total);
    console.log("loading : ", nft.loading);

    return (
        <Layout>
            <SEO />
            <GICStoreUser />
        </Layout>
    )
}

export default Index