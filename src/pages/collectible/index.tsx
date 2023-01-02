import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import Collectible from '@app/content/Collectible'

const index = () => {
  return (
    <Layout>
      <SEO />
      <Collectible />
    </Layout>
  )
}

export default index
