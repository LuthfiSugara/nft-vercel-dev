import { MetaDataNFT } from "./metadata";

export const ALL_NFT = "ALL_NFT";

export interface NFTResponse {
    _id: string,
    token_address: string,
    token_id: number,
    block_number_minted: number,
    token_hash: string,
    amount: number,
    contract_type: string,
    name: string,
    symbol: string,
    token_uri: string,
    metadata: Array<MetaDataNFT>,
    last_token_uri_sync: string,
    last_metadata_sync: string,
    chain: string,
    __v: number
    created_at: string,
    updated_at: string,
}

export interface GetALlNFT {
    type: typeof ALL_NFT;
    payload?: Array<NFTResponse>;
}

export type NFTDispatch = GetALlNFT;