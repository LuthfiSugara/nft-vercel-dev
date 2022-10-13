import { SimpleGrid, Skeleton } from '@chakra-ui/react'

const MyNFTCardsSkeleton = () => {
  return (
    <SimpleGrid columns={[2, 2, 4]} spacing={['3vw', '3vw', '1vw']}>
      {[1, 2, 3, 4].map((_, idx) => (
        <Skeleton key={`cardItemSkeleton__${idx}`} width="100%" height={['83vw', '83vw', '28.65vw']} />
      ))}
    </SimpleGrid>
  )
}

export default MyNFTCardsSkeleton
