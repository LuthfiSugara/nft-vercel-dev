import { useTranslation } from '@app/context'
import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import { useToastApp } from '@app/hooks'
import { useEffect } from 'react'

export default function HomePage() {
  const { t } = useTranslation()
  const { toastError } = useToastApp()
  const x = 1
  useEffect(() => {
    if (x === 1) {
      toastError(t('Provider Error'), t('No provider was found'))
    }
  }, [])
  return (
    <Layout>
      <SEO title={t('NFT Market Place')} />
    </Layout>
  )
}
