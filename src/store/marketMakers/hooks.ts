import { useEffect } from 'react'
import { useAppDispatch } from '../typed'
import useRefresh from '@app/hooks/useRefresh'
import { fetchMarketMakersUserDataAsync } from '.'
import { useSelector } from 'react-redux'
import { State, DeserializedMarketMaker } from '@app/store/typed'
import { transformMarketMaker } from './helpers'

export const useFetchUserMarketMakers = (account) => {
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchMarketMakersUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])
}

export const useMarketMakers = (): { marketMakers: DeserializedMarketMaker[]; userDataLoaded: boolean } => {
  const { marketMakers, userDataLoaded } = useSelector((state: State) => ({
    marketMakers: state.marketMakers.data,
    userDataLoaded: state.marketMakers.userDataLoaded,
  }))
  return { marketMakers: marketMakers.map(transformMarketMaker), userDataLoaded }
}
