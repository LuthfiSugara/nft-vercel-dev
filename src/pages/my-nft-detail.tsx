import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import MyNFTDetailPageContent from '@app/content/MarketMakers/MyNFTDetail'
import { useTranslation } from '@app/context'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function MyNFTDetailPage() {
  const { t } = useTranslation()
  const router = useRouter()
  // Redirection in Page Level
  useEffect(() => {
    const { nftid } = router.query
    if (!nftid) {
      return
    }
  }, [router])
  return (
    <Layout>
      <SEO title={t('My NFT Detail')} />
      <MyNFTDetailPageContent />
    </Layout>
  )
}
