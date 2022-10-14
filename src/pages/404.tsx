import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import { useTranslation } from '@app/context'
import { Button, Center, Container, Heading, Link, Text, VStack } from '@chakra-ui/react'

export default function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <Layout>
      <SEO title={'404 | Not Found'} description={t('Oops, page not found.')} />
      <Container color={'gicv.dark'} maxW="100%" h="80vh">
        <Center h="full">
          <VStack>
            <Heading fontSize="5xl">404</Heading>
            <Text mb="16px">{t('Oops, page not found.')}</Text>
            <Button colorScheme="primary" color="white" as={Link} variant="solid" href="/">
              {t('Back Home')}
            </Button>
          </VStack>
        </Center>
      </Container>
    </Layout>
  )
}
