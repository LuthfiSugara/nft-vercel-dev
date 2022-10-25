import { Icon } from '@chakra-ui/react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import theme from '@app/config/theme'

export const CustomRightArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <Icon
      as={BsChevronRight}
      className={className}
      fontSize={['1vw', '1vw', '3vw']}
      fontWeight={'extrabold'}
      color={theme.colors.gicv.black}
      right={'-6vw'}
      _hover={{
        color: `${theme.colors.gicv.black}`,
      }}
      sx={{ ...style }}
      onClick={onClick}
    />
  )
}

export const CustomLeftArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <Icon
      as={BsChevronLeft}
      className={className}
      fontSize={['1vw', '1vw', '3vw']}
      fontWeight={'extrabold'}
      color={theme.colors.gicv.black}
      left={'-6vw'}
      _hover={{
        color: `${theme.colors.gicv.black}`,
      }}
      sx={{ ...style }}
      onClick={onClick}
    />
  )
}
