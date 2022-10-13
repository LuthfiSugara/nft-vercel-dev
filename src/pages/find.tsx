import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import LiquidityContent from '@app/content/Liquidity'
import PoolFinder from '@app/content/PoolFinder'
import TradePageContent from '@app/content/Trade'
import { useTranslation } from '@app/context'

export default function FindPage() {
  const { t } = useTranslation()
  return (
    <Layout>
      <SEO title={t('Import Pool')} description={t('Import an existing pool')} />
      <TradePageContent withSwitcher={false}>
        <LiquidityContent>
          <PoolFinder />
        </LiquidityContent>
      </TradePageContent>
    </Layout>
  )
}
