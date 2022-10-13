import { useEffect, useRef } from 'react'
import useIsWindowVisible from '@app/hooks/useIsWindowVisible'
import { setBlock } from './slice'
import { useAppDispatch, useAppSelector } from '@app/store/typed'
import { simpleRpcProvider } from '@app/utils/providers'

export const usePollBlockNumber = () => {
  const timer = useRef(null)
  const dispatch = useAppDispatch()
  const isWindowVisible = useIsWindowVisible()

  useEffect(() => {
    if (isWindowVisible) {
      timer.current = setInterval(async () => {
        const blockNumber = await simpleRpcProvider.getBlockNumber()
        dispatch(setBlock(blockNumber))
      }, 6000)
    } else {
      clearInterval(timer.current)
    }

    return () => clearInterval(timer.current)
  }, [dispatch, timer, isWindowVisible])
}

export const useBlock = () => {
  return useAppSelector((state) => state.block)
}

export const useInitialBlock = () => {
  return useAppSelector((state) => state.block.initialBlock)
}
