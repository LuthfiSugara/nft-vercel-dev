import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import TopSellers from '@app/content/TopSellers'

export default function TopSellersPage() {
  return (
    <Layout>
      <SEO />
      <TopSellers />
    </Layout>
  )
}
