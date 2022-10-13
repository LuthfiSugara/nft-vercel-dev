import { Button } from '@chakra-ui/react'
import React from 'react'

const PaginationNavButton = ({ children, ...props }) => {
  return (
    <Button
      minW={0}
      p={0}
      height={['8vw', '8vw', '2.6vw']}
      width={['10vw', '10vw', '3.5vw']}
      variant="solid"
      backgroundColor={'legion.light'}
      color={'legion.white'}
      fontSize={['4.5vw', '4.5vw', '1.5vw']}
      fontWeight={'bold'}
      borderRadius={['1.5vw', '1.5vw', '0.3vw']}
      _hover={{
        backgroundColor: 'legion.light',
        color: 'legion.white',
      }}
      _active={{
        backgroundColor: 'legion.light',
        color: 'legion.white',
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default PaginationNavButton
