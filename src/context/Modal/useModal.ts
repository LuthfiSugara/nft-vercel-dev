import { get } from 'lodash'
import { useCallback, useContext, useEffect } from 'react'
import { DismissHandler, InjectedModalProps, ModalContext } from '.'

export const useModal = <P extends InjectedModalProps = InjectedModalProps>(
  Modal:
    | React.ComponentType<Omit<P, keyof InjectedModalProps>>
    | React.ReactNode
    | ((props: Omit<P, keyof InjectedModalProps>) => JSX.Element),
  closeOnOverlayClick = true,
  updateOnPropsChange = false,
  modalId = 'defaultId'
): [DismissHandler, DismissHandler] => {
  const { isOpen, modalNode, nodeId, onDismiss, onPresent, setCloseOnOverlayClick, setModalNode } =
    useContext(ModalContext)
  const onPresentCallback = useCallback(() => {
    onPresent(Modal, modalId)
  }, [Modal, modalId, onPresent])

  // Updates the "Modal" component if props are changed
  // Use carefully since it might result in unnecessary rerenders
  // Typically if Modal is staic there is no need for updates, use when you expect props to change
  useEffect(() => {
    // NodeId is needed in case there are 2 useModal hooks on the same page and one has updateOnPropsChange
    if (updateOnPropsChange && isOpen && nodeId === modalId) {
      const modalProps = get(Modal, 'props')
      const oldModalProps = get(modalNode, 'props')
      // Note: I tried to use lodash isEqual to compare props but it is giving false-negatives too easily
      // For example ConfirmSwapModal in exchange has ~500 lines prop object that stringifies to same string
      // and online diff checker says both objects are identical but lodash isEqual thinks they are different
      // Do not try to replace JSON.stringify with isEqual, high risk of infinite rerenders
      // TODO: Find a good way to handle Modal updates, this whole flow is just backwards-compatible workaround,
      // would be great to simplify the logic here
      if (modalProps && oldModalProps && JSON.stringify(modalProps) !== JSON.stringify(oldModalProps)) {
        setModalNode(Modal)
      }
    }
  }, [updateOnPropsChange, nodeId, modalId, isOpen, Modal, modalNode, setModalNode])

  useEffect(() => {
    setCloseOnOverlayClick(closeOnOverlayClick)
  }, [closeOnOverlayClick, setCloseOnOverlayClick])

  return [onPresentCallback, onDismiss]
}
