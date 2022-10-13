import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import FarmsPageContent from '@app/content/Farms'

export default function FarmsPages() {
  return (
    <Layout>
      <SEO title="Farms" />
      <FarmsPageContent />
    </Layout>
  )
}
