import { Box, BoxProps } from '@chakra-ui/react'
import * as React from 'react'

interface IContainerProps extends BoxProps {
  children: React.ReactNode
}

const Container: React.FunctionComponent<IContainerProps> = (props) => {
  return (
    <Box px={['1vw', '1vw', '10vw']} {...props}>
      {props.children}
    </Box>
  )
}

export default Container
