import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import AnnouncementPageContent from '@app/content/Announcement'

export default function AnnouncementPage() {
  return (
    <Layout>
      <SEO title="Announcement" />
      <AnnouncementPageContent />
    </Layout>
  )
}
