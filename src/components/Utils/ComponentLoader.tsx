import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Center, Spinner } from '@chakra-ui/react'
import { LoadableBaseOptions } from 'next/dynamic'

const ComponentLoader: LoadableBaseOptions['loading'] = ({ error, isLoading, retry }) => {
  error && console.error(error)
  return (
    <Center w="ful" h="full" py="8">
      {error ? (
        <Alert
          status="error"
          display="flex"
          flexDir="column"
          height="200px"
          alignItems="center"
          justifyContent="center"
          rounded="2xl"
          variant="left-accent"
          gridGap={2}
        >
          <AlertIcon boxSize={10} />
          <AlertTitle fontSize="lg" mt={2}>
            Failed to load resource
          </AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
          <Button colorScheme="primary" color="white" onClick={retry}>
            Retry
          </Button>
        </Alert>
      ) : isLoading ? (
        <Spinner />
      ) : null}
    </Center>
  )
}

export default ComponentLoader
