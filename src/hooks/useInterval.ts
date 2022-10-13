import { useEffect, useRef } from 'react'

export default function useInterval<T extends () => void>(callback: T, delay: number, leading = true) {
  const savedCallback = useRef<T>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      const { current } = savedCallback
      if (current) {
        // @ts-ignore
        current()
      }
    }

    if (delay !== null) {
      if (leading) tick()
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
    return undefined
  }, [delay, leading])
}
