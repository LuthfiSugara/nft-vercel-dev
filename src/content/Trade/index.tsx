import { Box, Center } from '@chakra-ui/react'
import TradeSwitcher from '@app/components/Switchers/TradeSwitcher'
import Background from './components/Background'

export default function TradePageContent({ children, withSwitcher = true }) {
  return (
    <Box maxW="100%" py={100}>
      <Background>
        {withSwitcher && (
          <Center>
            <TradeSwitcher />
          </Center>
        )}
        <Center pos={'relative'} mt={8} mx={2}>{children}</Center>
      </Background>
    </Box>
  )
}
