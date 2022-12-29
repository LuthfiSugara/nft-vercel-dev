import { createSlice } from "@reduxjs/toolkit";

interface NFTState {
    loading: boolean,
    all_nft: [],
    total: number,
}

const initialState: NFTState = { 
    loading: false,
    all_nft: [],
    total: 0,
};

const nftSlice = createSlice({
    name: 'nft',
    initialState,
    reducers: {
        getAllNft(state, action){
            return {
                ...state,
                loading: false,
                all_nft: action.payload
            }
        },
        getTotal(state, action){
            return {
                ...state,
                loading: false,
                total: 5,
            }
        }
    }
});

export const { getAllNft } = nftSlice.actions;
export default nftSlice.reducer;
