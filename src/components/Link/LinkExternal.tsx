import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Button, ButtonProps, Link } from '@chakra-ui/react'

interface LinkExternalProps extends ButtonProps {
  href: string
}

const LinkExternal = (props: LinkExternalProps) => {
  return <Button colorScheme="primary" variant="link" as={Link} rightIcon={<ExternalLinkIcon />} {...props} />
}

export default LinkExternal
