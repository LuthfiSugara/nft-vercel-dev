import { useTranslation } from '@app/context'
import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import Link from 'next/link'
import { Box } from '@chakra-ui/react'
import Home from '@app/content/Home'

export default function HomePage() {
  const { t } = useTranslation()
  return (
    <Layout>
      <SEO title={t('NFT Market Place')} />
      <Home />
    </Layout>
  )
}
