import { useEffect, useState } from 'react'

const isBrowser = typeof window !== 'undefined'

const VISIBILITY_STATE_SUPPORTED = isBrowser && 'visibilityState' in document

function isWindowVisible() {
  return isBrowser && (!VISIBILITY_STATE_SUPPORTED || document.visibilityState !== 'hidden')
}

/**
 * Returns whether the window is currently visible to the user.
 */
export default function useIsWindowVisible() {
  const [isVisible, setIsVisible] = useState(isWindowVisible())

  useEffect(() => {
    if (!VISIBILITY_STATE_SUPPORTED) return undefined

    const handleVisibilityChange = () => {
      setIsVisible(isWindowVisible())
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [setIsVisible])

  return isVisible
}
