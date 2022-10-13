import React from 'react'
import styled from 'styled-components'

interface SpacerProps {
  size?: 'sm' | 'md' | 'lg'
}

const Spacer: React.FC<SpacerProps> = () => {
  // const { spacing } = useContext(ThemeContext)

  // let s: number
  // switch (size) {
  //   case 'lg':
  //     s = spacing[6]
  //     break
  //   case 'sm':
  //     s = spacing[2]
  //     break
  //   case 'md':
  //   default:
  //     s = spacing[4]
  // }

  return <StyledSpacer size={16} />
}

interface StyledSpacerProps {
  size: number
}

const StyledSpacer = styled.div<StyledSpacerProps>`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`

export default Spacer
