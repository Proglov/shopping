import Api from "@/services/withAuthActivities/seller";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reject } from "../globalExtraReducers";

// we have unconfirmed and confirmed sellers. the unconfirmed ones, are stored in the global reducers. some fields of unconfirmed ones, like operating properties are here since they are singleton
const initialState = {

    //common between invalidated and confirmed sellers properties
    selectedId: {},
    isModalDeleteOpen: false,
    operatingError: '',
    isConfirmedTableOperating: false,

    //only invalidated sellers
    isModalConfirmOpen: false,

    //confirmed sellers properties
    confirmedSellers: [],
    loadingConfirmedSellers: false,
    errorConfirmedSellers: null,
    currentPageConfirmedSellers: 1,
    lastPageConfirmedSellers: 1,
    itemsCountConfirmedSellers: 0,
    itemsPerPageConfirmedSellers: 20
};

export const getConfirmedSellersFromServer = createAsyncThunk(
    "Sellers/getConfirmedSellersFromServer",
    async ({ page, perPage }) => {
        const { getAllSellers } = Api
        return await getAllSellers({ page, perPage, validated: true })
    }
)
export const deleteConfirmedSellerFromServer = createAsyncThunk(
    "Sellers/deleteConfirmedSellerFromServer",
    async (id) => {
        const { deleteSeller } = Api
        const res = await deleteSeller({ id })
        return res
    }
)

const sellersSlice = createSlice({
    name: "Sellers",
    initialState,
    reducers: {
        addSeller(state, action) {
            state.confirmedSellers.unshift(action.payload)
            state.itemsCountConfirmedSellers++;
        },
        setSelectedId(state, action) {
            state.selectedId = action.payload
        },
        setIsModalDeleteOpen(state, action) {
            state.isModalDeleteOpen = action.payload
        },
        setIsModalConfirmOpen(state, action) {
            state.isModalConfirmOpen = action.payload
        },
        setOperatingError(state, action) {
            state.operatingError = action.payload
        },
        setLoading(state, action) {
            state.loadingConfirmedSellers = action.payload
        },
        setError(state, action) {
            state.errorConfirmedSellers = action.payload
        },
        setCurrentPageConfirmedSellers(state, action) {
            const { payload } = action

            if (typeof payload === "number") state.currentPageConfirmedSellers = action.payload;
            else
                switch (payload) {
                    case "INC":
                        state.currentPageConfirmedSellers++;
                        break;
                    case "DEC":
                        state.currentPageConfirmedSellers--;
                        break;
                }
        },
        setLastPageConfirmedSellers(state, action) {
            state.lastPageConfirmedSellers = Math.ceil(action.payload / state.itemsPerPageConfirmedSellers)
        },
        setItemsCountConfirmedSellers(state, action) {
            state.itemsCountConfirmedSellers = action.payload
        },
        setIsConfirmedTableOperating(state, action) {
            state.isConfirmedTableOperating = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(getConfirmedSellersFromServer.pending, (state) => {
            state.loadingConfirmedSellers = true
        });
        builder.addCase(getConfirmedSellersFromServer.fulfilled, (state, action) => {
            state.confirmedSellers = action.payload.sellers
            state.itemsCountConfirmedSellers = action.payload.allSellersCount
            state.lastPageConfirmedSellers = Math.ceil(action.payload?.allSellersCount / state.itemsPerPageConfirmedSellers)
            state.loadingConfirmedSellers = false
        });
        builder.addCase(getConfirmedSellersFromServer.rejected, reject);
        builder.addCase(deleteConfirmedSellerFromServer.fulfilled, (state, action) => {
            state.confirmedSellers = state.confirmedSellers.filter(item => item._id !== action.payload.id)
            state.itemsCountConfirmedSellers--;
        });
    }
});

export const { setIsModalDeleteOpen, setIsModalConfirmOpen, setOperatingError, setSelectedId, setCurrentPageConfirmedSellers, setError, setItemsCountConfirmedSellers, setLastPageConfirmedSellers, setLoading, addSeller, setIsConfirmedTableOperating } = sellersSlice.actions;

export default sellersSlice.reducer;