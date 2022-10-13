import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
// import HomePageContent from '@app/content/Home'
import DashboardPageContent from '@app/content/MarketMakers/Dashboard'
import { useTranslation } from '@app/context'

export default function HomePage() {
  const { t } = useTranslation()
  return (
    <Layout>
      {/* <SEO />
      <HomePageContent /> */}
      <SEO title={t('NFT Market Maker')} />
      <DashboardPageContent />
    </Layout>
  )
}
