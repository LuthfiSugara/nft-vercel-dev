import { ArrowBackIcon } from '@chakra-ui/icons'
import { IconButton, IconButtonProps } from '@chakra-ui/react'

interface BackButtonProps extends Omit<IconButtonProps, 'aria-label'> {
  handleBack: () => void
  label?: string
}

const BackButton = ({ handleBack, label = 'Go Back', ...rest }: BackButtonProps) => {
  return (
    <IconButton
      variant="ghost"
      onClick={handleBack}
      icon={<ArrowBackIcon boxSize={6} />}
      aria-label={label}
      title={label}
      {...rest}
    />
  )
}

export default BackButton
