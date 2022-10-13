import { Box } from '@chakra-ui/react'
import MyNFTHero from './components/MyNFTHero'
import { useActiveWeb3React } from '@app/hooks'
import MyNFTContainer from './components/MyNFTContainer'

const MyNFTPageContent: React.FC = () => {
  const { account } = useActiveWeb3React()

  return (
    <Box
      // display={['none', 'none', 'inherit']}
      bg={'legion.bg'}
      minHeight={'100vh'}
      py={['20vw', '20vw', '7vw']}
      px={['3vw', '3vw', '4vw']}
    >
      <Box>
        <MyNFTHero />
      </Box>
      {account && <MyNFTContainer account={account} />}
    </Box>
  )
}

export default MyNFTPageContent
