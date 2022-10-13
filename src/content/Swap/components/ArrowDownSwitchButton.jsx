import { ArrowDownIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

const ArrowDownSwitchButton = ({ onSwitch }) => {
  return (
    <IconButton
      icon={<ArrowDownIcon boxSize={4} />}
      p="2"
      rounded="full"
      aria-label="switch"
      onClick={() => onSwitch()}
      title="Switch"
    />
  )
}

export default ArrowDownSwitchButton
