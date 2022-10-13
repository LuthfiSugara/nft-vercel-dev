import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

interface ExternalLinkProps extends Omit<IconButtonProps, 'aria-label'> {
  href?: string
}

const ExternalLink = ({ href }: ExternalLinkProps) => (
  <IconButton
    aria-label={'Go to ' + href}
    title={'Go to ' + href}
    as="a"
    href={href}
    variant="link"
    icon={<ExternalLinkIcon />}
  />
)

export default ExternalLink
