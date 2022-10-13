import { useDisclosure } from '@chakra-ui/react'
import React, { cloneElement, isValidElement, useCallback, useState } from 'react'
import { ModalContext } from '.'

export const ModalProvider: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalNode, setModalNode] = useState<React.ReactNode>(null)
  const [nodeId, setNodeId] = useState('')
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true)
  const handlePresent = useCallback(
    (node: React.ReactNode, newNodeId: string) => {
      setModalNode(node)
      onOpen()
      setNodeId(newNodeId)
    },
    [onOpen]
  )

  const handleDismiss = useCallback(() => {
    setModalNode(undefined)
    onClose()
    setNodeId('')
  }, [onClose])

  const handleOverlayDismiss = useCallback(() => {
    closeOnOverlayClick && handleDismiss()
  }, [closeOnOverlayClick, handleDismiss])
  return (
    <ModalContext.Provider
      value={{
        nodeId,
        isOpen,
        modalNode,
        setModalNode,
        setCloseOnOverlayClick,
        onPresent: handlePresent,
        onDismiss: handleOverlayDismiss,
      }}
    >
      {isOpen
        ? isValidElement(modalNode) &&
          cloneElement(modalNode, {
            isOpen,
            // isModalOpen: isOpen,
            // onClose: handleOverlayDismiss,
            // onModalClose: handleOverlayDismiss,
            onDismiss: handleOverlayDismiss,
          })
        : null}
      {children}
    </ModalContext.Provider>
  )
}
