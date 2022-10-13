import React from 'react'
import styled from 'styled-components'
import { Button } from '@chakra-ui/react'

interface PercentageButtonProps {
  color: string
  onClick: () => void
}

const StyledButton = styled(Button)`
  flex-grow: 1;
`

const PercentageButton: React.FC<PercentageButtonProps> = ({ children, color, onClick }) => {
  return (
    <StyledButton scale="xs" mx="2px" p="4px 16px" color={color} variant="solid" onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export default PercentageButton
