import Layout from '@app/components/Common/Layout'
import { Box } from '@chakra-ui/react'
import Link from 'next/link'
import * as React from 'react'

const index = () => {
  return (
    <Layout>
      <Box mt={'5vw'}>
        <Link href={'/about/testing'} passHref>
          <div>params</div>
        </Link>
      </Box>
    </Layout>
  )
}

export default index
