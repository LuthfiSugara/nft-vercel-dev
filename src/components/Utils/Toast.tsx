import { ToasterOptions } from '@app/hooks/useToastApp'
import { CheckCircleIcon, InfoOutlineIcon, NotAllowedIcon, WarningTwoIcon } from '@chakra-ui/icons'
import { Box, CloseButton, Flex, Text, RenderProps, UseToastOptions } from '@chakra-ui/react'

type ToastWrapperProps = RenderProps & ToasterOptions & { type: UseToastOptions['status'] }

const ToastWrapper = ({ id, description, title, type, onClose }: ToastWrapperProps) => {
  return (
    <Flex bg="brand.bg.5" id={id.toString()} rounded="2xl" w="sm">
      <Box
        roundedTopLeft="2xl"
        roundedBottomLeft="2xl"
        bg={
          type === 'success'
            ? 'gicv.success'
            : type === 'error'
            ? 'gicv.error'
            : type === 'warning'
            ? 'gicv.warning'
            : type === 'info'
            ? 'gicv.info'
            : 'inherit'
        }
        p="4"
      >
        {type === 'success' && <CheckCircleIcon w={5} h={5} />}
        {type === 'info' && <InfoOutlineIcon w={5} h={5} />}
        {type === 'warning' && <WarningTwoIcon w={5} h={5} />}
        {type === 'error' && <NotAllowedIcon w={5} h={5} />}
      </Box>
      <Box px="4" py="3">
        <Text fontWeight="bold">{title}</Text>
        <Box>{description}</Box>
      </Box>
      <CloseButton position="absolute" top="4" right="4" onClick={onClose} />
    </Flex>
  )
}

export default ToastWrapper
