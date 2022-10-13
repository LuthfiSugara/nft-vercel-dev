import { ToastContainer } from '@app/components/Toast'
import useToast from '@app/hooks/useToast'
import React from 'react'

const ToastListener = () => {
  const { toasts, remove } = useToast()

  const handleRemove = (id: string) => remove(id)

  return <ToastContainer toasts={toasts} onRemove={handleRemove} />
}

export default ToastListener
