import Layout from '@app/components/Common/Layout'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import * as React from 'react'

const Index = (props) => {
  const { slug } = useRouter().query
  return (
    <Layout>
      <Box mt={'5vw'}>
        <div>{slug}</div>
      </Box>
    </Layout>
  )
}

export default Index
