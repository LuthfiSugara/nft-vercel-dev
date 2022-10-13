import {
  HStack,
  Text,
  VStack,
  Select,
  Input,
  //  Menu, MenuButton, Button, MenuList, MenuItem
} from '@chakra-ui/react'
// import { ArrowDownIcon } from '@chakra-ui/icons'

const SortTable = () => {
  return (
    <HStack spacing={8}>
      <VStack align="flex-start" width="40">
        <Text>Sort By</Text>
        <Select bg="legion.light" display="flex" gridGap="4" rounded="2xl">
          <option style={{ backgroundColor: '#303030' }} value="Hot">
            Hot
          </option>
          <option style={{ backgroundColor: '#303030' }} value="APR">
            APR
          </option>
          <option style={{ backgroundColor: '#303030' }} value="Multiplier">
            Multiplier
          </option>
          <option style={{ backgroundColor: '#303030' }} value="Earned">
            Earned
          </option>
        </Select>
        {/* <Menu>
          <MenuButton as={Button} rightIcon={<ArrowDownIcon />} w="full" border="none">
            Sort By
          </MenuButton>
          <MenuList bg="legion.light" >
            <MenuItem value="Hot">Hot</MenuItem>
            <MenuItem value="APR">APR</MenuItem>
            <MenuItem value="Multiplier">Multiplier</MenuItem>
            <MenuItem value="Earned">Earned</MenuItem>
          </MenuList>
        </Menu> */}
      </VStack>
      <VStack align="flex-start">
        <Text>Search</Text>
        <Input rounded="2xl" bg="legion.light" placeholder="Search farms" />
      </VStack>
    </HStack>
  )
}

export default SortTable
