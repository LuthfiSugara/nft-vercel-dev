import { Text } from '@chakra-ui/react'
import { FC } from 'react'

const PageHeading: FC = ({ children }) => {
  return (
    <Text fontSize={['7vw', '7vw', '3vw']} fontWeight="extrabold" color={'legion.dark'}>
      {children}
    </Text>
  )
}

export default PageHeading
