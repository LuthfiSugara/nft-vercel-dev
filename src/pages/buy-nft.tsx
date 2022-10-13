import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import BuyNFTPageContent from '@app/content/MarketMakers/BuyNFT'
// import ExchangeContent from '@app/content/Swap'
import { useTranslation } from '@app/context'

export default function BuyNFTPage() {
  const { t } = useTranslation()
  return (
    <Layout>
      <SEO title={t('Buy NFT')} />
      <BuyNFTPageContent>{/* <ExchangeContent /> */}</BuyNFTPageContent>
    </Layout>
  )
}
