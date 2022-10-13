/* eslint-disable react/display-name */
import ToastWrapper from '@app/components/Utils/Toast'
import { useToast, UseToastOptions } from '@chakra-ui/react'
import { ReactNode, useCallback } from 'react'

const baseToastConfig: UseToastOptions = {
  position: 'top-right',
  isClosable: true,
}

export interface ToasterOptions {
  title?: string | ReactNode
  description?: ReactNode
}

type Toaster = (title?: string | ReactNode, description?: ReactNode) => void

const useToastApp = () => {
  const toast = useToast()
  const toastError: Toaster = useCallback(
    (title, description) =>
      toast({
        ...baseToastConfig,
        render: (props) => <ToastWrapper {...props} title={title} description={description} type="error" />,
      }),
    [toast]
  )
  const toastSuccess: Toaster = useCallback(
    (title, description) =>
      toast({
        ...baseToastConfig,
        render: (props) => <ToastWrapper {...props} title={title} description={description} type="success" />,
      }),
    [toast]
  )
  const toastInfo: Toaster = useCallback(
    (title, description) =>
      toast({
        ...baseToastConfig,
        render: (props) => <ToastWrapper {...props} title={title} description={description} type="info" />,
      }),
    [toast]
  )
  const toastWarning: Toaster = useCallback(
    (title, description) =>
      toast({
        ...baseToastConfig,
        render: (props) => <ToastWrapper {...props} title={title} description={description} type="warning" />,
      }),
    [toast]
  )
  return {
    toastError,
    toastInfo,
    toastSuccess,
    toastWarning,
  }
}

export default useToastApp
