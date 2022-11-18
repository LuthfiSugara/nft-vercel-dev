import Layout from '@app/components/Common/Layout'
import { Box } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'

const Index = () => {
  const { slug } = useRouter().query
  return (
    <Layout>
      <Box mt={'5vw'}>
        <Link href={'/about'} passHref>
          <div>{slug}</div>
        </Link>
      </Box>
    </Layout>
  )
}

export default Index
