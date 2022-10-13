import { WarningTwoIcon } from '@chakra-ui/icons'
import { Alert, AlertIcon, AlertTitle, AlertDescription, VStack, AlertProps } from '@chakra-ui/react'
import { memo, ReactNode } from 'react'

interface WarningBannerProps extends Omit<AlertProps, 'title'> {
  title: ReactNode
  description: ReactNode
}

const WarningBanner = ({ title = '', description = '', ...rest }: WarningBannerProps) => {
  return (
    <Alert status="warning" borderColor="legion.primary" borderWidth="1px" alignItems="start" rounded="lg" {...rest}>
      <AlertIcon boxSize="5" as={WarningTwoIcon} />
      <VStack flex="1" align="start">
        <AlertTitle fontWeight="bold">{title}</AlertTitle>
        <AlertDescription display="block" maxWidth="sm">
          {description}
        </AlertDescription>
      </VStack>
    </Alert>
  )
}

export default memo(WarningBanner)
