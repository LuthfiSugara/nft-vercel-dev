import { useState } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import MyNFTCardsContainer from '@app/content/MarketMakers/MyNFT/components/MyNFTContainer/MyNFTCardsContainer'
import MyNFTCardsSkeleton from '@app/content/MarketMakers/MyNFT/components/MyNFTContainer/MyNFTCardsContainer/MyNFTCards/Skeleton'
import PaginationButton from '@app/content/MarketMakers/MyNFT/components/MyNFTContainer/MyNFTCardsContainer/PaginationButton'
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import PaginationNavButton from '@app/content/MarketMakers/MyNFT/components/MyNFTContainer/MyNFTCardsContainer/PaginationNavButton'
import PaginationNavDoubleButton from '@app/content/MarketMakers/MyNFT/components/MyNFTContainer/MyNFTCardsContainer/PaginationNavDoubleButton'
import { useFetchOwnerNftQuery } from '@app/store/myNft/my-nft-slice'
import MyNFTClaimAll from './MyNFTClaimAll'
// import MyNFTFilter from '@app/content/MarketMakers/MyNFT/components/MyNFTFilter'
// import { useTranslation } from '@app/context'

interface IMyNFTContainer {
  account: string
}

const MyNFTContainer: React.FC<IMyNFTContainer> = ({ account }) => {
  const middlePage = 3
  const row = 8
  const [startPage, setStartPage] = useState<number>(1)
  const [endPage, setEndPage] = useState<number>(middlePage)
  const [start, setStart] = useState<number>(1)
  const { data: ownerNFTAll = { data: { total: 0, records: [] } }, isFetching: isOwnerNFTFetching } =
    useFetchOwnerNftQuery({
      address: account,
      start: start,
      row: row,
    })

  const totalNFT = ownerNFTAll.data.total ? Number(ownerNFTAll.data.total) : 0
  const ownerNFT = ownerNFTAll.data.records ? ownerNFTAll.data.records : []
  const lastPage = totalNFT % row == 0 ? Math.floor(totalNFT / row) : Math.floor(totalNFT / row + 1)

  // const [claimedStatus, setClaimedStatus] = useState('All')
  // const [isAscending, setIsAscending] = useState(true)
  // const { t } = useTranslation()

  return (
    <Box px={[0, 0, '3vw']} pt={0} pb={['7vw', '7vw', '3vw']}>
      <Flex justifyContent={'right'} alignItems={'center'} mt={0} mb={['5vw', '5vw', 0]}>
        <MyNFTClaimAll account={account} />
      </Flex>
      <Flex justifyContent={'center'} gridGap={['1vw', '1vw', '0.5vw']}>
        <PaginationNavDoubleButton
          disabled={totalNFT && start > 2 ? false : true}
          onClick={() => {
            setStart(1)
            setStartPage(1)
            setEndPage(middlePage)
          }}
        >
          <ArrowLeftIcon />
        </PaginationNavDoubleButton>

        <PaginationNavButton
          disabled={totalNFT && start > 1 ? false : true}
          isActive={true}
          onClick={() => {
            start > 1 && setStart(start - 1)
            start === startPage && startPage > 1 && setStartPage(startPage - 1)
            start === startPage && startPage > 1 && setEndPage(endPage - 1)
          }}
        >
          <ChevronLeftIcon />
        </PaginationNavButton>

        {/* <PaginationButton
              isActive={start === 1 ? true : false}
              onClick={() => {
                setStart(1)
                setStartPage(1)
                setEndPage(middlePage)
              }}
              display={startPage === 1 ? 'none' : 'unset'}
            >
              1
            </PaginationButton>

            <PaginationButton isActive={false} disabled={true} display={startPage < 3 ? 'none' : 'unset'}>
              ...
            </PaginationButton> */}

        {lastPage < 6 ? (
          [...Array(lastPage)].map((_, idx) => (
            <PaginationButton key={idx} isActive={start === idx + 1 ? true : false} onClick={() => setStart(idx + 1)}>
              {idx + 1}
            </PaginationButton>
          ))
        ) : (
          <>
            {[...Array(endPage)].map((_, idx) => (
              <PaginationButton
                key={idx}
                isActive={start === idx + 1 ? true : false}
                onClick={() => setStart(idx + 1)}
                display={idx < endPage - middlePage ? 'none' : 'unset'}
              >
                {idx + 1}
              </PaginationButton>
            ))}
            <PaginationButton isActive={false} disabled={true} display={endPage > lastPage - 2 ? 'none' : 'unset'}>
              ...
            </PaginationButton>
            <PaginationButton
              isActive={start === lastPage ? true : false}
              onClick={() => {
                setStart(lastPage)
                setStartPage(lastPage - 8)
                setEndPage(lastPage)
              }}
              display={endPage === lastPage ? 'none' : 'unset'}
            >
              {lastPage}
            </PaginationButton>
          </>
        )}
        <PaginationNavButton
          disabled={totalNFT && start < lastPage ? false : true}
          isActive={true}
          onClick={() => {
            start < lastPage && setStart(start + 1)
            start === endPage && endPage < lastPage && setEndPage(endPage + 1)
            start === endPage && endPage < lastPage && setStartPage(startPage + 1)
          }}
        >
          <ChevronRightIcon />
        </PaginationNavButton>
        <PaginationNavDoubleButton
          disabled={totalNFT && start < lastPage - 1 ? false : true}
          onClick={() => {
            setStart(lastPage)
            setStartPage(lastPage - 8)
            setEndPage(lastPage)
          }}
        >
          <ArrowRightIcon />
        </PaginationNavDoubleButton>
      </Flex>
      <Flex justifyContent={'left'} alignItems={'center'} mt={['5vw', '5vw', 0]} mb={['2.5vw', '2.5vw', '2vw']}>
        <Text color={'legion.dark'} fontSize={['4.5vw', '4.5vw', '1.5vw']} fontWeight={'bold'}>
          Total {totalNFT} NFT
        </Text>
      </Flex>
      {!isOwnerNFTFetching ? <MyNFTCardsContainer ownerNFT={ownerNFT} /> : <MyNFTCardsSkeleton />}
    </Box>
  )
}

export default MyNFTContainer
