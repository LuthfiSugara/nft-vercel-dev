import { Box } from '@chakra-ui/react'

const CarouselBox = ({children}) => {
    return (
      <Box maxW='md' borderRadius='2.5rem' overflow='hidden' marginInline={3}>
          {children}
      </Box>
    )
  }

  export default CarouselBox;