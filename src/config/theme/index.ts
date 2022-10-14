import { extendTheme } from '@chakra-ui/react'
import { customStyles } from './styles'
import { customColors } from './colors'
import { customComponents } from './components'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: customStyles,
  colors: customColors,
  components: customComponents,
  fonts: {
    heading: `"Montserrat","Kanit", sans-serif`,
  },
  fontWeights: {
    semibold: 600,
    bold: 600,
  },
})

export default theme
