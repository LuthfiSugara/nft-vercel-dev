import React from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'
import MyNFTCard from '../../../MyNFTCard'

const MyNFTCards = ({ ownerNFT }) => {
  return (
    <SimpleGrid columns={[2, 2, 4]} spacing={['3vw', '3vw', '1vw']}>
      {ownerNFT.map((_, idx) => {
        const imageUrl = _.image
        const accounttypename = _.accounttypename
        const mmid = _.mmid
        const batchname = _.batchname
        const type = _.type.name
        const nftid = _.nftid
        return (
          <Box key={`ownerNFTItem__${idx}`}>
            <MyNFTCard
              imageUrl={imageUrl}
              accounttypename={accounttypename}
              mmid={mmid}
              batchname={batchname}
              type={type}
              nftid={nftid}
            />
          </Box>
        )
      })}
    </SimpleGrid>
  )
}

export default MyNFTCards
