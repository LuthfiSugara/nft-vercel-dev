import { mode } from '@chakra-ui/theme-tools'
import { withCustomScrollBar } from './withCustomScrollbar'

export const customStyles = {
  global: (props) => ({
    body: {
      fontFamily: `"Montserrat","Kanit", sans-serif`,
      bg: mode('white', 'black')(props),
      color: mode('black', 'white')(props),
      ...withCustomScrollBar('6px'),
    },
  }),
}
