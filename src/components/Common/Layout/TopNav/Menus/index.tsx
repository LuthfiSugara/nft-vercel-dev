import { HStack } from '@chakra-ui/react'
import * as React from 'react'
import { menus } from './config'
import Menu from './Menu'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IMenusProps {}

const Menus: React.FunctionComponent<IMenusProps> = (props) => {
  return (
    <HStack spacing={'4vw'} mx={'5vw'} w={'fit-content'}>
      {menus.map((_, idx) => (
        <Menu key={`header-menu-item-${idx}`} title={_.title} path={_.path} />
      ))}
    </HStack>
  )
}

export default Menus
