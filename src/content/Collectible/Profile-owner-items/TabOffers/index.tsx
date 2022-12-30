import CardOwnerOffers from '@app/components/Cards/CardOwnerOffers'
import { Box,  Grid, GridItem  } from '@chakra-ui/react'

const TabOffers: React.FunctionComponent = () => {
  return (
    <Box justifyContent="center" py={4} px={20}>
      <Grid templateColumns="repeat(7, 1fr)" gap={6}>
        <GridItem
          w="100%"
          py={2}
          fontFamily="Montserrat"
          fontStyle="normal"
          fontWeight="700"
          fontSize="14px"
          color="#6C757D"
        >
          Offers
        </GridItem>
        <GridItem w="20%"></GridItem>
        <GridItem
          w="100%"
          py={2}
          fontFamily="Montserrat"
          fontStyle="normal"
          fontWeight="700"
          fontSize="14px"
          color="#6C757D"
        >
          Price
        </GridItem>

        <GridItem
          w="100%"
          py={2}
          fontFamily="Montserrat"
          fontStyle="normal"
          fontWeight="700"
          fontSize="14px"
          color="#6C757D"
        >
          Floor Price
        </GridItem>
        <GridItem
          w="100%"
          py={2}
          fontFamily="Montserrat"
          fontStyle="normal"
          fontWeight="700"
          fontSize="14px"
          color="#6C757D"
        >
          Floor Difference
        </GridItem>
        <GridItem
          w="100%"
          py={2}
          fontFamily="Montserrat"
          fontStyle="normal"
          fontWeight="700"
          fontSize="14px"
          color="#6C757D"
        >
          From
        </GridItem>
        <GridItem
          w="100%"
          py={2}
          fontFamily="Montserrat"
          fontStyle="normal"
          fontWeight="700"
          fontSize="14px"
          color="#6C757D"
        >
          Received
        </GridItem>
      </Grid>

      <br />
      <Box>
        <CardOwnerOffers />
        <br />
        <hr />
        <br />
        <CardOwnerOffers />
        <br />
        <hr />
        <br />
        <CardOwnerOffers />
        <br />
        <hr />
        <br />
        <CardOwnerOffers />
        <br />
        <hr />
        <br />
      </Box>
    </Box>
  )
}

export default TabOffers
