import React from 'react'
import styled from 'styled-components'
import Spacer from './Spacer'

const ModalActions: React.FC = ({ children }) => {
  const l = React.Children.toArray(children).length
  return (
    <StyledModalActions>
      {React.Children.map(children, (child, i) => (
        <>
          <StyledModalAction>{child}</StyledModalAction>
          {i < l - 1 && <Spacer />}
        </>
      ))}
    </StyledModalActions>
  )
}

const StyledModalActions = styled.div`
  align-items: center;
  background-color: inherit;
  display: flex;
  margin: 0;
  padding: 0;
`

const StyledModalAction = styled.div`
  flex: 1;
`

export default ModalActions
