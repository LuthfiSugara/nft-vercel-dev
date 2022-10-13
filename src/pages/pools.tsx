import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import PoolsPageContent from '@app/content/Pools'

export default function PoolsPage() {
  return (
    <Layout>
      <SEO title="Pools" />
      <PoolsPageContent />
    </Layout>
  )
}
