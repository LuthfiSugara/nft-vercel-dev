import { useContext } from 'react'
import { RefreshContext } from '@app/context/RefreshContext'

const useRefresh = () => {
  const { fast, slow } = useContext(RefreshContext)
  return { fastRefresh: fast, slowRefresh: slow }
}

export default useRefresh
