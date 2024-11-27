import Api from "@/services/withAuthActivities/tx";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reject } from "../globalExtraReducers";

// we have future and recent transactions. the future ones, are stored in the global reducers. some fields of future ones, like operating properties are here since they are singleton
const initialState = {

    //common between recent and future transactions properties
    selectedItem: {},
    isModalShowMoreOpen: false,
    isModalCancelOpen: false,
    operatingError: '',

    //recent transactions properties
    recentTX: [],
    loadingRecentTX: false,
    errorRecentTX: null,
    currentPageRecentTX: 1,
    lastPageRecentTX: 1,
    itemsCountRecentTX: 0,
    itemsPerPageRecentTX: 20
};

export const getRecentTXFromServer = createAsyncThunk(
    "Transactions/getRecentTXFromServer",
    async ({ page, perPage, which }) => {
        const { getAllTXs, getAllMyTXs } = Api
        if (which === "Seller")
            return await getAllMyTXs({ page, perPage, isFutureOrder: false })
        return await getAllTXs({ page, perPage, isFutureOrder: false })
    }
)
export const updateRecentTXStatusToServer = createAsyncThunk(
    "Transactions/updateRecentTXStatusToServer",
    async ({ newStatus, id }) => {
        const { TXStatus } = Api
        await TXStatus({ id, newStatus })
        return { newStatus, id }
    }
)
export const cancelRecentTXToServer = createAsyncThunk(
    "Transactions/cancelRecentTXToServer",
    async ({ reason, id }) => {
        const { TXCancelBySeller } = Api
        await TXCancelBySeller({ id, reason })
        return { reason, id }
    }
)

const transactionSlice = createSlice({
    name: "Transactions",
    initialState,
    reducers: {
        setSelectedItem(state, action) {
            state.selectedItem = action.payload
        },
        setIsModalShowMoreOpen(state, action) {
            state.isModalShowMoreOpen = action.payload
        },
        setIsModalCancelOpen(state, action) {
            state.isModalCancelOpen = action.payload
        },
        setOperatingError(state, action) {
            state.operatingError = action.payload
        },
        setLoading(state, action) {
            state.loadingRecentTX = action.payload
        },
        setError(state, action) {
            state.errorRecentTX = action.payload
        },
        setCurrentPageRecentTX(state, action) {
            const { payload } = action
            if (typeof payload === "number") state.currentPageRecentTX = action.payload;
            else
                switch (payload) {
                    case "INC":
                        state.currentPageRecentTX++;
                        break;
                    case "DEC":
                        state.currentPageRecentTX--;
                        break;
                }
        },
        setLastPageRecentTX(state, action) {
            state.lastPageRecentTX = Math.ceil(action.payload / state.itemsPerPageRecentTX)
        },
        setItemsCountRecentTX(state, action) {
            state.itemsCountRecentTX = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getRecentTXFromServer.pending, (state) => {
            state.loadingRecentTX = true
        });
        builder.addCase(getRecentTXFromServer.fulfilled, (state, action) => {
            state.recentTX = action.payload.transactions
            state.itemsCountRecentTX = action.payload.transactionsCount
            state.lastPageRecentTX = Math.ceil(action.payload?.transactionsCount / state.itemsPerPageRecentTX)
            state.loadingRecentTX = false
        });
        builder.addCase(getRecentTXFromServer.rejected, reject);
        builder.addCase(updateRecentTXStatusToServer.fulfilled, (state, action) => {
            state.recentTX.forEach(item => {
                if (item._id === action.payload.id) item.status = action.payload.newStatus
                return item
            })
        });
        builder.addCase(cancelRecentTXToServer.fulfilled, (state, action) => {
            state.recentTX.forEach(item => {
                if (item._id === action.payload.id) item.status = 'Canceled'
                return item
            })
        });
    }
});

export const { setIsModalShowMoreOpen, setIsModalCancelOpen, setOperatingError, setSelectedItem, setCurrentPageRecentTX, setError, setItemsCountRecentTX, setLastPageRecentTX, setLoading } = transactionSlice.actions;

export default transactionSlice.reducer;