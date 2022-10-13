import { SimpleGrid, Skeleton } from '@chakra-ui/react'

const BuyCardsSkeleton = () => {
  return (
    <SimpleGrid columns={[2, 2, 4]} spacing={['3vw', '3vw', '1vw']}>
      {[1, 2, 3, 4].map((_, idx) => (
        <Skeleton key={`cardItemSkeleton__${idx}`} width="100%" height={['105vw', '105vw', '35.1vw']} />
      ))}
    </SimpleGrid>
  )
}

export default BuyCardsSkeleton
