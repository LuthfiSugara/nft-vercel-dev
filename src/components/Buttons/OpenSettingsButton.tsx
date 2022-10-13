import { IconButton } from '@chakra-ui/react'
import { memo } from 'react'
import { ModalTokenSettings } from '../Modals'
import { useModal } from '@app/context/Modal/useModal'
import { SettingsIcon } from '../Icons'

const OpenSettingsButton = () => {
  const [onOpenSettingsModal] = useModal(<ModalTokenSettings />)
  return <IconButton aria-label="Filter" onClick={onOpenSettingsModal} icon={<SettingsIcon />} />
}

export default memo(OpenSettingsButton)
