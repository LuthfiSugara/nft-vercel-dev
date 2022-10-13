import { isAddress } from '@app/utils'
import useENSAddress from './useENSAddress'
import useENSName from './useENSName'

/**
 * Given a name or address, does a lookup to resolve to an address and name
 */
export default function useENS(nameOrAddress: string | null) {
  const validated = isAddress(nameOrAddress)
  const reverseLookup = useENSName(validated || undefined)
  const lookup = useENSAddress(nameOrAddress)

  return {
    loading: reverseLookup.loading || lookup.loading,
    address: validated || lookup.address,
    name: reverseLookup.ENSName ? reverseLookup.ENSName : !validated && lookup.address ? nameOrAddress || null : null,
  }
}
