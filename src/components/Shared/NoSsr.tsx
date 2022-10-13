import { ReactNode, useEffect, useState } from 'react'

interface NoSSRProps {
  children: ReactNode
}

const NoSSR = ({ children }: NoSSRProps) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return null
  }
  return <>{children}</>
}

export default NoSSR
