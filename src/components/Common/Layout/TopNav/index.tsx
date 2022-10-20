/* eslint-disable react/no-children-prop */
import { HStack } from '@chakra-ui/react'
import * as React from 'react'
import Menus from './Menus'
import SearchBar from './SearchBar'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ITopNavProps {}

const TopNav: React.FunctionComponent<ITopNavProps> = (props) => {
  return (
    <HStack>
      <Menus />
      <SearchBar />
    </HStack>
  )
}

export default TopNav
