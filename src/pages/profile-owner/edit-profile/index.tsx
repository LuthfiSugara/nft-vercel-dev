import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import EditProfile from '@app/content/Collectible/Profile-owner-items/EditProfile'

export default function Index() {
  return (
    <Layout>
      <SEO />
      <EditProfile />
    </Layout>
  )
}
