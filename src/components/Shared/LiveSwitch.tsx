import { HStack, ButtonGroup, Button, Switch, Text } from '@chakra-ui/react'
import { useState } from 'react'

// interface LiveSwitchProps {
//   handleCurrentState?: (e: string) => void
// }

export default function LiveSwitch() {
  const [table, setTable] = useState('live')
  const handleSwitchLive = (val = '') => {
    setTable(val)
    // handleCurrentState(val)
  }
  return (
    <HStack spacing={4}>
      <ButtonGroup rounded="3xl" bg="legion.dark" variant="ghost" size="sm">
        <Button
          isActive={table === 'live'}
          _active={{ bg: 'legion.primary' }}
          onClick={() => handleSwitchLive('live')}
          rounded="3xl"
          px="4"
          fontWeight="bold"
          letterSpacing="wide"
        >
          Live
        </Button>
        <Button
          isActive={table === 'finished'}
          _active={{ bg: 'legion.primary' }}
          onClick={() => handleSwitchLive('finished')}
          rounded="3xl"
          px="4"
          fontWeight="bold"
          letterSpacing="wide"
        >
          Finished
        </Button>
      </ButtonGroup>
      <HStack spacing={2}>
        <Switch _checked={{ bgColor: 'legion.primary' }} />
        <Text fontWeight="bold" letterSpacing="wide">
          Staked Only
        </Text>
      </HStack>
    </HStack>
  )
}
