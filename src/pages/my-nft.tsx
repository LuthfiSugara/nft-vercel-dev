import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import MyNFTPageContent from '@app/content/MarketMakers/MyNFT'
// import ExchangeContent from '@app/content/Swap'
import { useTranslation } from '@app/context'

export default function MyNFTPage() {
  const { t } = useTranslation()
  return (
    <Layout>
      <SEO title={t('My NFT')} />
      <MyNFTPageContent>{/* <ExchangeContent /> */}</MyNFTPageContent>
    </Layout>
  )
}
