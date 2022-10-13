import { Box, TableContainer, Table, Tbody } from '@chakra-ui/react'
import FarmTableRow, { RowProps } from './FarmTableRow'
import { DeserializedFarm } from '@app/store/typed'

export interface FarmWithStakedValue extends DeserializedFarm {
  apr?: number
  lpRewardsApr?: number
}

export interface ITableProps {
  data: RowProps[]
  userDataReady: boolean
}

const FarmTable: React.FC<ITableProps> = (props) => {
  const { data, userDataReady } = props

  return (
    <Box maxWidth={{ md: '800px', lg: 'full' }} overflow="auto" py={[0, '2']} mt="8" rounded="2xl" bg="legion.dark">
      <TableContainer>
        <Table bg="legion.dark" variant="unstyled">
          <Tbody>
            {data.map((data, idx) => (
              <FarmTableRow {...data} userDataReady={userDataReady} key={idx} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default FarmTable
