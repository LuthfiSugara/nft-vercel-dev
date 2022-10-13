import { ExternalAPIGicMethods, GlobalAPIMethods } from '../../config/methods'

export const GlobalAPIFetch = {
  DisplayHeaderBuy: () => GlobalAPIMethods.GET('/displaymm-active'),
  DisplayBuy: (batchid: number) => GlobalAPIMethods.POST('/displaymm', { batchid: batchid }),
  OwnerNFT: (address: string, start: string, row: string) =>
    GlobalAPIMethods.GET(`/ownernft/${address}/start/${start}/row/${row}`),
  DisplayClaimReward: (nftid: number, mmid: number, year: number) =>
    GlobalAPIMethods.POST('/displayreward', { nftid: nftid, mmid: mmid, year: year }),
  DisplayClaimRewardSpecial: (nftid: number, batchid: number, year: number) =>
    GlobalAPIMethods.POST('/displayrewardspecial', { nftid: nftid, batchid: batchid, year: year }),
  GenerateImage: (nftId: number) => GlobalAPIMethods.GET(`/generateimage/${nftId}`),
}

export const ExternalAPIGicFetch = {
  MMDetails: (mmid: number) => ExternalAPIGicMethods.GET(`/api/v1/external/gic-verse/mm/${mmid}`),
  MMOpenPositions: (mmid: number, page: number, limit: number) =>
    ExternalAPIGicMethods.GET(`api/v1/external/gic-verse/mm/${mmid}/open-positions?page=${page}&limit=${limit}`),
  MMOrderHistories: (mmid: number, page: number, limit: number) =>
    ExternalAPIGicMethods.GET(`api/v1/external/gic-verse/mm/${mmid}/histories?page=${page}&limit=${limit}`),
}
