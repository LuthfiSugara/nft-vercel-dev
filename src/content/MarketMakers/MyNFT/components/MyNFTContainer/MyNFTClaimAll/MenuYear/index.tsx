import { Box, BoxProps, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Dispatch, SetStateAction } from 'react'

interface IMenuYearProps extends BoxProps {
  year: number
  setYear: Dispatch<SetStateAction<number>>
}

const MenuYear: React.FunctionComponent<IMenuYearProps> = ({ year, setYear, ...props }) => {
  return (
    <Box {...props}>
      <Menu>
        <MenuButton
          bg={'legion.primary'}
          borderRadius={['2vw', '2vw', '0.5vw']}
          fontSize={['3vw', '3vw', '1vw']}
          maxH={['9vw', '9vw', '2vw']}
          w={['20vw', '20vw', '7vw']}
          py={['1.5vw', '1.5vw', '1.5vw']}
          px={['3vw', '3vw', '1vw']}
          _hover={{ bg: 'legion.primary', color: 'legion.white' }}
          _active={{ bg: 'legion.primary', color: 'legion.white' }}
          as={Button}
          rightIcon={<ChevronDownIcon fontSize={['4vw', '4vw', '1.5vw']} />}
        >
          {year}
        </MenuButton>
        <MenuList
          overflow={'hidden'}
          bg={'legion.white'}
          color={'legion.black'}
          minW={['20vw', '20vw', '7vw']}
          borderRadius={['2vw', '2vw', '0.5vw']}
        >
          {[...Array(5)].map((_, idx) => (
            <MenuItem
              key={`yearOption__${idx}`}
              onClick={() => {
                setYear(Number(new Date().getFullYear() - idx))
              }}
              _hover={{ bg: 'legion.gray.300' }}
              py={['2vw', '2vw', '0.5vw']}
              justifyContent={'center'}
              fontSize={['3.5vw', '3.5vw', '1vw']}
              fontWeight={'extrabold'}
            >
              {Number(new Date().getFullYear() - idx)}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default MenuYear
