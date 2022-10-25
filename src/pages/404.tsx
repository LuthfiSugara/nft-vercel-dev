import Layout from '@app/components/Common/Layout'
import SEO from '@app/components/Common/Seo'
import { useTranslation } from '@app/context'
import { Button, Center, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function NotFoundPage() {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <Layout>
      <SEO title={'404 | Not Found'} description={t('Oops, page not found.')} />
      <Center h={'80vh'}>
        <VStack spacing={'2vw'}>
          <VStack>
            <Text fontSize={'5vw'} fontWeight={'extrabold'}>
              404
            </Text>
            <Text fontSize={'1vw'}>{t('Oops, page not found.')}</Text>
          </VStack>
          <Button
            colorScheme={'primary'}
            fontSize={['1vw', '1vw', '1.2vw']}
            px={['1vw', '1vw', '2.5vw']}
            h={'3.5vw'}
            borderRadius={'0.5vw'}
            onClick={() => router.push('/')}
          >
            Back Home
          </Button>
        </VStack>
      </Center>
    </Layout>
  )
}
