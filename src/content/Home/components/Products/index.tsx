import { Box, Grid, Heading, Text } from '@chakra-ui/react'
import { homeProductsItems } from '@app/mocks'
import ProductsItem from './components/ProductsItem'

const Products: React.FC = () => {
  return (
    <Box 
      pos={'relative'} 
      display={'flex'} 
      justifyContent={['center', 'center', 'left', 'left']} 
      px={[0, 0, '12vw']}
      pt={['40vw', '40vw', '24vw']} 
    >
      <Box>
        <Box pb={['15vw', '15vw', '6vw']}>
          <Heading 
            letterSpacing={'wider'} 
            fontSize={['15vw', '15vw', '5vw']}
            fontWeight={'bold'}
            color={'#FFEFDC'}
            textShadow={'-2px -2px 0 #888, 2px -2px 0 #888, -2px 2px 0 #888, 2px 2px 0 #888'}
          >
              Products
          </Heading>
          <Text 
            letterSpacing={'wider'}
            fontSize={['9vw', '9vw', '3vw']} 
            fontWeight={'bold'} 
            color="primary.900" 
            mt={['-10vw', '-10vw', '-3vw']}
          >
            Our Products
          </Text>
        </Box>
        <Grid
          templateRows={['repeat(4, 1fr)', 'repeat(4, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)']}
          templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)']}
          gap={['9vw', '9vw', '2vw']}
        >
          {
            homeProductsItems.map((product, idx) => (
              <ProductsItem product={product} key={`products-item__${product.label}__${idx}`}></ProductsItem>
            ))
          }
        </Grid>
      </Box>
    </Box>
  )
}

export default Products