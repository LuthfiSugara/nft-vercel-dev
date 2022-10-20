/* eslint-disable react/no-children-prop */
import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import * as React from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ISearchBarProps {}

const SearchBar: React.FunctionComponent<ISearchBarProps> = (props) => {
  return (
    <InputGroup w={'30vw'} h={'2.5vw'}>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray" />}
        fontSize={'1vw'}
        w={'2vw'}
        h={'2.5vw'}
        py={0}
        px={'1.5vw'}
      />
      <Input
        type="text"
        placeholder="Search by Item and Creator"
        bgColor={'gicv.secondary'}
        borderRadius={'0.5vw'}
        borderColor={'gray'}
        fontSize={'0.8vw'}
        pl={'3vw'}
        h={'2.5vw'}
      />
    </InputGroup>
  )
}

export default SearchBar
