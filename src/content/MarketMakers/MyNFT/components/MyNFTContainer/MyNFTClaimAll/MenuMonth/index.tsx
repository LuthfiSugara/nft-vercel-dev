import { Box, BoxProps, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Dispatch, SetStateAction } from 'react'
import toMonthName from '@app/utils/toMonthName'

interface IMenuMonthProps extends BoxProps {
  month: number
  setMonth: Dispatch<SetStateAction<number>>
}

const MenuMonth: React.FunctionComponent<IMenuMonthProps> = ({ month, setMonth, ...props }) => {
  return (
    <Box {...props}>
      <Menu>
        <MenuButton
          bg={'legion.primary'}
          borderRadius={['2vw', '2vw', '0.5vw']}
          fontSize={['3vw', '3vw', '1vw']}
          maxH={['9vw', '9vw', '2vw']}
          w={['18vw', '18vw', '6.6vw']}
          py={['1.5vw', '1.5vw', '1.5vw']}
          px={['3vw', '3vw', '1vw']}
          _hover={{ bg: 'legion.primary', color: 'legion.white' }}
          _active={{ bg: 'legion.primary', color: 'legion.white' }}
          as={Button}
          rightIcon={<ChevronDownIcon fontSize={['4vw', '4vw', '1.5vw']} />}
        >
          {toMonthName(month)}
        </MenuButton>
        <MenuList
          overflow={'hidden'}
          bg={'legion.white'}
          color={'legion.black'}
          minW={['20vw', '20vw', '6.6vw']}
          borderRadius={['2vw', '2vw', '0.5vw']}
        >
          {[...Array(12)].map((_, idx) => (
            <MenuItem
              key={`monthOption__${idx}`}
              onClick={() => {
                setMonth(idx + 1)
              }}
              _hover={{ bg: 'legion.gray.300' }}
              py={['2vw', '2vw', '0.5vw']}
              justifyContent={'center'}
              fontSize={['3.5vw', '3.5vw', '1vw']}
              fontWeight={'extrabold'}
            >
              {toMonthName(idx + 1)}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default MenuMonth
