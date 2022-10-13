import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import LiquidityContent from '@app/content/Liquidity'
import RemoveLiquidityContent from '@app/content/Liquidity/RemoveLiquidityContent'
import TradePageContent from '@app/content/Trade'
import { useTranslation } from '@app/context'
import { GetServerSideProps } from 'next'

export default function RemoveLiquidityPage({ currencies }: { currencies?: string[] | undefined }) {
  const { t } = useTranslation()
  return (
    <Layout>
      <SEO title={t('Remove Liquidity')} />
      <TradePageContent withSwitcher={false}>
        <LiquidityContent>
          <RemoveLiquidityContent currencyIdA={currencies[0]} currencyIdB={currencies[1]} />
        </LiquidityContent>
      </TradePageContent>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params.currency && Array.isArray(params.currency)) {
    const currencies = params.currency
    if (currencies.length === 1) {
      return {
        redirect: {
          destination: '/liquidity',
          permanent: false,
        },
      }
    }
    if (currencies.length === 2) {
      return {
        props: {
          currencies,
        },
      }
    }
  }
  return {
    redirect: {
      destination: '/liquidity',
      permanent: false,
    },
  }
}
