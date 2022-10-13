import { IconButton } from '@chakra-ui/react'
import { memo } from 'react'
import { ModalTokenHistory } from '../Modals'
import { useModal } from '@app/context/Modal/useModal'
import { TimeIcon } from '@chakra-ui/icons'

const OpenHistoryButton = () => {
  const [onOpenHistoryModal] = useModal(<ModalTokenHistory />)
  return (
    <IconButton onClick={onOpenHistoryModal} icon={<TimeIcon boxSize={5} />} aria-label="History" title="History" />
  )
}

export default memo(OpenHistoryButton)
