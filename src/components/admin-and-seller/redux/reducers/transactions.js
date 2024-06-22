import Api from "@/services/withAuthActivities/tx";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pending, reject } from "../globalExtraReducers";

// we have future and recent transactions. the future ones, are stored in the global reducers. some fields of future ones, like operating properties are here since they are singleton
const initialState = {

    //common between recent and future transactions properties
    selectedItem: {},
    isModalShowMoreOpen: false,
    operatingError: '',
    isRecentTableOperating: false,

    isModalDoneOpen: false,

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
export const updateRecentTXDoneToServer = createAsyncThunk(
    "Transactions/updateRecentTXDoneToServer",
    async (id) => {
        const { TXDone } = Api
        return await TXDone({ id })
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
        setIsModalDoneOpen(state, action) {
            state.isModalDoneOpen = action.payload
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
        },
        setIsRecentTableOperating(state, action) {
            state.isRecentTableOperating = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(getRecentTXFromServer.pending, pending);
        builder.addCase(getRecentTXFromServer.fulfilled, (state, action) => {
            state.recentTX = action.payload.transactions
            state.itemsCountRecentTX = action.payload.transactionsCount
            state.lastPageRecentTX = Math.ceil(action.payload?.transactionsCount / state.itemsPerPageRecentTX)
            state.loadingRecentTX = false
        });
        builder.addCase(getRecentTXFromServer.rejected, reject);
        builder.addCase(updateRecentTXDoneToServer.fulfilled, (state, action) => {
            state.recentTX = state.recentTX.map(item => {
                if (item._id === action.payload.transaction._id)
                    item.done = !item.done
                return item
            })
        });
    }
});

export const { setIsModalShowMoreOpen, setIsModalDoneOpen, setOperatingError, setSelectedItem, setCurrentPageRecentTX, setError, setItemsCountRecentTX, setLastPageRecentTX, setLoading, setIsRecentTableOperating } = transactionSlice.actions;

export default transactionSlice.reducer;