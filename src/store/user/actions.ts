import { SerializedToken } from '@app/config/constants/types'

export interface SerializedPair {
  token0: SerializedToken
  token1: SerializedToken
}

export enum FarmStakedOnly {
  ON_FINISHED = 'onFinished',
  TRUE = 'true',
  FALSE = 'false',
}

export enum ViewMode {
  TABLE = 'TABLE',
  CARD = 'CARD',
}
