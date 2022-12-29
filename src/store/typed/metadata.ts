export const META_DATA_NFT = "META_DATA";

export interface MetaData {
    allItem: number,
    totalItem: number,
    totalPages: number,
    itemPerPage: number,
    currentPage: number,
}

export interface MetaDataAttributesNft {
    trait_type: string,
    value: string,
    max_value: number,
    display_type: string,
}

export interface MetaDataNFT {
    name: string,
    description: string,
    image: string,
    attributes: Array<MetaDataAttributesNft>,
    owner: string,
    token_id: number,
}