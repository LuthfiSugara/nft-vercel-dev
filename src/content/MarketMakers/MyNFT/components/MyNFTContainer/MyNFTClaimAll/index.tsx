import { FunctionComponent, useState } from 'react'
import { Button, Flex, VStack } from '@chakra-ui/react'
import MenuYear from './MenuYear'
import MenuMonth from './MenuMonth'
import CardActions from './CardActions'
import { useFetchDisplayClaimAllQuery } from '@app/store/myNft/my-nft-slice'
import { useTranslation } from '@app/context'

interface IMyNFTClaimAllProps {
  account: string
}

const MyNFTClaimAll: FunctionComponent<IMyNFTClaimAllProps> = ({ account }) => {
  const { t } = useTranslation()
  const [month, setMonth] = useState(Number(new Date().getMonth()) + 1)
  const [year, setYear] = useState(Number(new Date().getFullYear()))
  const {
    data: displayClaimAll = { data: { nftid: [], month: undefined, year: undefined, detail: [] } },
    isFetching: isFetchingDisplayClaimAll,
  } = useFetchDisplayClaimAllQuery({ address: account, month: month, year: year })
  return (
    <VStack
      bgColor={'legion.light'}
      spacing={['1.5vw', '1.5vw', '0.5vw']}
      p={['1.5vw', '1.5vw', '0.5vw']}
      borderRadius={['3vw', '3vw', '1vw']}
      w={['42vw', '42vw', '15vw']}
    >
      <Flex>
        <MenuMonth month={month} setMonth={setMonth} mr={['1.5vw', '1.5vw', '0.4vw']} />
        <MenuYear year={year} setYear={setYear} />
      </Flex>
      {isFetchingDisplayClaimAll ? (
        <Button
          textTransform={'capitalize'}
          borderRadius={['2vw', '2vw', '0.5vw']}
          colorScheme={'primary'}
          color={'legion.white'}
          fontSize={['5vw', '5vw', '2vw']}
          fontWeight={'bold'}
          w={'100%'}
          maxH={['10vw', '10vw', '3vw']}
          py={['6vw', '6vw', '2vw']}
          isDisabled={true}
          isLoading={true}
        >
          {t('Loading')}
        </Button>
      ) : (
        <CardActions
          account={account}
          nftid={displayClaimAll.data.nftid}
          month={displayClaimAll.data.month}
          year={displayClaimAll.data.year}
          detail={displayClaimAll.data.detail}
        />
      )}
    </VStack>
  )
}

export default MyNFTClaimAll
