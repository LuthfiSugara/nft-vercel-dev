import PageHeading from '@app/components/Shared/PageHeading'
import { Grid, Container, Box, Heading, Text } from '@chakra-ui/react'

export default function AnnouncementPageContent() {
  return (
    <Container maxW="full">
      <Box>
        <PageHeading>Announcement</PageHeading>
        <Text color="legion.secondary" fontSize="xl" fontWeight="bold">
          Get interesting information from LEGION
        </Text>
      </Box>
      <Grid mt="12" height="400px" templateColumns={['1fr', '1fr', 'repeat(2, 1fr)']} columnGap={24} rowGap={[12, 24]}>
        <Box height="400px" rounded="3xl" p="6" bg="legion.light">
          <Heading>Facebook</Heading>
        </Box>
        <Box height="400px" rounded="3xl" p="6" bg="legion.light">
          <Heading>Twitter</Heading>
        </Box>
      </Grid>
    </Container>
  )
}
