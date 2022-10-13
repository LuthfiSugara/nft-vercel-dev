import { mode } from '@chakra-ui/theme-tools'
import { withCustomScrollBar } from './withCustomScrollbar'

export const customStyles = {
  global: (props) => ({
    body: {
      fontFamily: `"Montserrat","Kanit", sans-serif`,
      bg: mode('white', '#FFF1E0')(props),
      color: mode('#25282B', 'white')(props),
      ...withCustomScrollBar('6px'),
    },
  }),
}
