import { useMemo } from 'react'
import contenthashToUri from '@app/utils/contenthashToUri'
import { parseENSAddress } from '@app/utils/ENS/parseENSAddress'
import uriToHttp from '@app/utils/uriToHttp'
import useENSContentHash from './ENS/useENSContentHash'

export default function useHttpLocations(uri?: string) {
  const ens = useMemo(() => (uri ? parseENSAddress(uri) : undefined), [uri])
  const resolvedContentHash = useENSContentHash(ens?.ensName)
  return useMemo(() => {
    if (ens) {
      return resolvedContentHash.contenthash ? uriToHttp(contenthashToUri(resolvedContentHash.contenthash)) : []
    }
    return uri ? uriToHttp(uri) : []
  }, [ens, resolvedContentHash.contenthash, uri])
}
