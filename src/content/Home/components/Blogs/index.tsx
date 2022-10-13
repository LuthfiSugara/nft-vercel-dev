import { Box, Heading, Text } from '@chakra-ui/react'
import BlogsItems from './components/BlogsItems'

const Blogs: React.FC = () => {
  return (
    <Box 
      pos={'relative'} 
      display={'flex'} 
      justifyContent={'left'} 
      px={['8vw', '8vw', '12vw']}
      pt={['40vw', '40vw', '15vw']} 
      pb={['70vw', '70vw', '20vw']} 
    >
      <Box>
        <Box pb={['15vw', '15vw', '6vw']}>
          <Heading 
            letterSpacing={'wider'} 
            fontSize={['15vw', '15vw', '5vw']}
            fontWeight={'bold'}
            color={'#FFD9AC'}
            textShadow={'-2px -2px 0 #888, 2px -2px 0 #888, -2px 2px 0 #888, 2px 2px 0 #888'}
          >
            Blogs
          </Heading>
          <Text 
            letterSpacing={'wider'}
            fontSize={['9vw', '9vw', '3vw']} 
            fontWeight={'bold'} 
            color="primary.900" 
            mt={['-10vw', '-10vw', '-3vw']}
          >
              Latest Blogs
          </Text>
        </Box>
        <BlogsItems />
      </Box>
    </Box>
  )
}

export default Blogs