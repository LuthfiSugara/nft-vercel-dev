import { useRouter } from 'next/router'
import { useMemo } from 'react'

export default function useParsedQueryString() {
  const { query } = useRouter()
  return useMemo(() => query, [query])
}
