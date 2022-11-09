import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import TopCollections from '@app/content/TopCollections'

export default function TopCollectionsPage() {
  return (
    <Layout>
      <SEO />
      <TopCollections />
    </Layout>
  )
}
