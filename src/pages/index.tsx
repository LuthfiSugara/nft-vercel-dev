import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import Home from '@app/content/Home'

export default function HomePage() {
  return (
    <Layout>
      <SEO />
      <Home />
    </Layout>
  )
}
