import { InfoIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { Tooltip, TooltipProps, useDisclosure } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface QuestionHelperProps extends Omit<TooltipProps, 'children'> {
  icon?: 'outline' | 'fill'
  children?: ReactNode
}

const QuestionHelper = ({ icon = 'outline', ...props }: QuestionHelperProps) => {
  const { onToggle, isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Tooltip placement="left-end" hasArrow bg="gicv.secondary" p="3" rounded="2xl" {...props} isOpen={isOpen}>
      {icon === 'outline' ? (
        <InfoOutlineIcon onClick={onToggle} onMouseEnter={onOpen} onMouseLeave={onClose} />
      ) : (
        <InfoIcon onClick={onToggle} onMouseEnter={onOpen} onMouseLeave={onClose} />
      )}
    </Tooltip>
  )
}

export default QuestionHelper
