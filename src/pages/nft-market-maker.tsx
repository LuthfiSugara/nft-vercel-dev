import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import DashboardPageContent from '@app/content/MarketMakers/Dashboard'
// import ExchangeContent from '@app/content/Swap'
import { useTranslation } from '@app/context'

export default function MarketMakerDashboardPage() {
  const { t } = useTranslation()
  return (
    <Layout>
      <SEO title={t('NFT Market Maker')} />
      <DashboardPageContent />
    </Layout>
  )
}
