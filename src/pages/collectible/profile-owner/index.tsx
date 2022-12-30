import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import ProfileOwnerItems from '@app/content/Collectible/Profile-owner-items'

export default function Index() {
  return (
    <Layout>
      <SEO />
      <ProfileOwnerItems />
    </Layout>
  )
}
