import { useTranslation } from '@app/context'
import { Input, VStack } from '@chakra-ui/react'

const ListManageView = () => {
  const { t } = useTranslation()
  return (
    <VStack spacing={2} align="stretch">
      <Input placeholder={t('https:// or ipfs:// or ENS name')} rounded="2xl" boxShadow="innner" />
      {/* <Flex align="center" p="2" gridGap="2">
        <Image src="/images/logo.png" alt="asd" />
        <Box>
          <Text fontWeight="medium">{t('Legionswap Extended')}</Text>
          <Text fontSize="sm">232 Tokens</Text>
        </Box>
        <Switch ml="auto" />
      </Flex>
      <Flex align="center" p="2" gridGap="2">
        <Image src="/images/logo.png" alt="asd" />
        <Box>
          <Text fontWeight="medium">Legionswap Top 100</Text>
          <Text fontSize="sm">100 Tokens</Text>
        </Box>
        <Switch ml="auto" />
      </Flex> */}
    </VStack>
  )
}

export default ListManageView
