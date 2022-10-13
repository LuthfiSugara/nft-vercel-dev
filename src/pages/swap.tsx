import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import TradePageContent from '@app/content/Trade'
import ExchangeContent from '@app/content/Swap'
import { useTranslation } from '@app/context'

export default function TradeExchangePage() {
  const { t } = useTranslation()
  return (
    <Layout>
      <SEO title={t('Exchange')} />
      <TradePageContent>
        <ExchangeContent />
      </TradePageContent>
    </Layout>
  )
}
