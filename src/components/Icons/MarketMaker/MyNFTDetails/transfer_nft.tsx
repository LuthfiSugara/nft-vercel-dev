import { Icon, IconProps } from '@chakra-ui/icons'
import React from 'react'

const TransferIcon = (props: IconProps) => {
  return (
    <Icon width="1.5vw" height="1.5vw" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.375 1.5L1.75 4.125L4.375 6.75"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.625 10.25L19.25 12.875L16.625 15.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M1.75 4.125H19.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.75 12.875H19.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export default TransferIcon
