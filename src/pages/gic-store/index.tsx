import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import GICStore from '@app/content/GICStore'

export default function GICStorePage() {
  return (
    <Layout>
      <SEO />
      <GICStore />
    </Layout>
  )
}
