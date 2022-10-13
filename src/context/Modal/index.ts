import React, { createContext, ReactNode } from 'react'

export type DismissHandler = () => void

export interface ModalContextValue {
  isOpen: boolean
  nodeId: string
  modalNode: ReactNode
  setModalNode: React.Dispatch<React.SetStateAction<React.ReactNode>>
  onPresent: (node: React.ReactNode, newNodeId: string) => void
  onDismiss: DismissHandler
  setCloseOnOverlayClick: React.Dispatch<React.SetStateAction<boolean>>
}

export type InjectedModalProps = Partial<Pick<ModalContextValue, 'isOpen' | 'onDismiss'>>

export const ModalContext = createContext<ModalContextValue | undefined>(undefined)
