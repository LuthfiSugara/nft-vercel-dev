import { GridItem, Text, Flex, Skeleton } from '@chakra-ui/react'
import { RowProps } from '@app/content/Farms/components/FarmTable/FarmTableRow'
import { useEffect, useState } from 'react'
import Balance from '@app/components/Balance'

export interface ITableProps {
  data: RowProps[]
}

const TotalValueLocked: React.FC<ITableProps> = (props) => {
  const { data } = props
  const [tvl, setTvl] = useState(0)

  const calcTotalValueLocked = () => {
    let totalValueLocked = 0
    data.map(data => {
      const liquidity = data.liquidity.liquidity
      liquidity !=undefined ? (totalValueLocked += Number(liquidity)
      ) : (
        totalValueLocked += 0
      )
    })
    setTvl(totalValueLocked)
  }


  useEffect(() => {
    calcTotalValueLocked()
  }, [data])

  return (
    <GridItem position={'relative'} rowStart={[4, 3]}>
      <Flex direction="column" justifyContent="space-between" bg="legion.dark" px="8" py="8" rounded="3xl">
        <Text fontWeight={600} fontSize="24px" lineHeight="36px">
          Total Value Locked (TVL)
        </Text>
        <Flex direction="column" alignItems="stretch">
          {tvl > 0 ? (
            <Balance
              decimals={0}
              fontSize="24px"
              prefix={'$'}
              lineHeight="1.1"
              value={tvl}
            />
          ) : (
            <Skeleton width="128px" height="36px" />
          )}
          <Text color="legion.secondary">Across all Farms and Pools</Text>
        </Flex>
      </Flex>
    </GridItem>
  )
}

export default TotalValueLocked
