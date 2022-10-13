import { Box } from '@chakra-ui/react'

export default function LiquidityContent({ children }) {
  return (
    <Box display="flex" rounded="3xl" width="430px" height="auto" overflow="hidden">
      {children}
    </Box>
  )
}
