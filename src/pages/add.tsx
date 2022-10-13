import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import TradePageContent from '@app/content/Trade'
import LiquidityContent from '@app/content/Liquidity'
import AddLiquidityContent from '@app/content/Liquidity/AddLiquidityContent'
import { useTranslation } from '@app/context'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function AddLiquidityPage() {
  const { t } = useTranslation()
  const router = useRouter()
  // Redirection in Page Level
  useEffect(() => {
    const { currencyIdA, currencyIdB } = router.query
    if (!currencyIdA || !currencyIdA) {
      return
    }
    if (currencyIdA?.toString().toLowerCase() === currencyIdB?.toString().toLowerCase()) {
      router.replace(`/add?currencyIdA=${currencyIdA?.toString()}`, undefined, { shallow: true })
    }
  }, [router])
  return (
    <Layout>
      <SEO title={t('Add Liquidity')} />
      <TradePageContent>
        <LiquidityContent>
          <AddLiquidityContent />
        </LiquidityContent>
      </TradePageContent>
    </Layout>
  )
}
