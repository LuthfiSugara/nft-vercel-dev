import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import EditProfile from '@app/content/Collectible/Profile-owner-items/EditProfile'

const Index = () => {
  return (
    <Layout>
      <SEO />
      <EditProfile />
    </Layout>
  )
}

export default Index;
