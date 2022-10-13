import { useEffect, useRef, useState } from 'react'

const isBrowser = typeof window !== 'undefined'

const useScrollEvent = () => {
  const [scrollTop, setScrollTop] = useState(false)
  const [scrollBottom, setScrollBottom] = useState(false)
  const prevScrollPos = useRef(0)
  useEffect(() => {
    if (isBrowser) {
      const handleScroll = () => {
        const bodyOffset = document.body.getBoundingClientRect()
        if (prevScrollPos.current > bodyOffset.top) {
          setScrollTop(false)
          setScrollBottom(true)
        } else {
          setScrollTop(true)
          setScrollBottom(false)
        }
        prevScrollPos.current = bodyOffset.top
      }

      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])
  return { scrolling: scrollBottom, scrollTop, scrollBottom }
}

export default useScrollEvent
