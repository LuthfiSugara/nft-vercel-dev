import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import TradePageContent from '@app/content/Trade'
import LiquidityContent from '@app/content/Liquidity'
import DefaultLiquidityContent from '@app/content/Liquidity/DefaultLiquidityContent'
import { useTranslation } from '@app/context'

export default function TradeLiquidityPage() {
  const { t } = useTranslation()
  return (
    <Layout>
      <SEO title={t('Liquidity')} />
      <TradePageContent>
        <LiquidityContent>
          <DefaultLiquidityContent />
        </LiquidityContent>
      </TradePageContent>
    </Layout>
  )
}
