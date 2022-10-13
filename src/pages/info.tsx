import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import { Heading } from '@chakra-ui/react'

export default function InfoPage() {
  return (
    <Layout>
      <SEO title="Info" />
      <Heading>Info Page</Heading>
    </Layout>
  )
}
