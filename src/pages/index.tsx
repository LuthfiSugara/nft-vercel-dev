import { useTranslation } from '@app/context'
import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'

export default function HomePage() {
  const { t } = useTranslation()
  return (
    <Layout>
      <SEO title={t('NFT Market Place')} />
    </Layout>
  )
}
