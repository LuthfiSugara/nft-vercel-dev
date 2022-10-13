import { Button } from '@chakra-ui/react'
import React from 'react'

const PaginationButton = ({ children, isActive = false, ...props }) => {
  return (
    <Button
      minW={0}
      p={0}
      height={['8vw', '8vw', '2.6vw']}
      width={['10vw', '10vw', '3.5vw']}
      variant="solid"
      backgroundColor={isActive ? 'legion.gray.100' : 'legion.white'}
      color={'legion.dark'}
      fontSize={['3.5vw', '3.5vw', '1.2vw']}
      fontWeight={'bold'}
      borderRadius={['1.5vw', '1.5vw', '0.3vw']}
      _hover={{
        backgroundColor: isActive ? 'legion.gray.100' : 'legion.white',
        color: 'legion.dark',
      }}
      _active={{
        backgroundColor: isActive ? 'legion.gray.100' : 'legion.white',
        color: 'legion.dark',
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default PaginationButton
