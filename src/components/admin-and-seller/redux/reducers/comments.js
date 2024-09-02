import Api from "@/services/withAuthActivities/comment";
import Api2 from "@/services/withoutAuthActivities/comment";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pending, reject } from "../globalExtraReducers";

// we have unconfirmed and confirmed comments. the unconfirmed ones, are stored in the global reducers. some fields of unconfirmed ones, like operating properties are here since they are singleton
const initialState = {

    //common between invalidated and confirmed comments properties
    selectedId: {},
    isModalDeleteOpen: false,
    operatingError: '',
    isConfirmedTableOperating: false,

    //only invalidated comments
    isModalConfirmOpen: false,

    //confirmed comments properties
    confirmedComments: [],
    loadingConfirmedComments: false,
    errorConfirmedComments: null,
    currentPageConfirmedComments: 1,
    lastPageConfirmedComments: 1,
    itemsCountConfirmedComments: 0,
    itemsPerPageConfirmedComments: 2
};

export const getConfirmedCommentsFromServer = createAsyncThunk(
    "Comments/getConfirmedCommentsFromServer",
    async ({ page, perPage }) => {
        const { getAllComments } = Api2
        return await getAllComments({ page, perPage, validated: true })
    }
)
export const deleteConfirmedCommentFromServer = createAsyncThunk(
    "Comments/deleteConfirmedCommentFromServer",
    async (id) => {
        const { deleteComment } = Api
        const res = await deleteComment({ id })
        return res
    }
)

const commentSlice = createSlice({
    name: "Comments",
    initialState,
    reducers: {
        addComment(state, action) {
            state.confirmedComments.unshift(action.payload)
            state.itemsCountConfirmedComments++;
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
            state.loadingConfirmedComments = action.payload
        },
        setError(state, action) {
            state.errorConfirmedComments = action.payload
        },
        setCurrentPageConfirmedComments(state, action) {
            const { payload } = action

            if (typeof payload === "number") state.currentPageConfirmedComments = action.payload;
            else
                switch (payload) {
                    case "INC":
                        state.currentPageConfirmedComments++;
                        break;
                    case "DEC":
                        state.currentPageConfirmedComments--;
                        break;
                }
        },
        setLastPageConfirmedComments(state, action) {
            state.lastPageConfirmedComments = Math.ceil(action.payload / state.itemsPerPageConfirmedComments)
        },
        setItemsCountConfirmedComments(state, action) {
            state.itemsCountConfirmedComments = action.payload
        },
        setIsConfirmedTableOperating(state, action) {
            state.isConfirmedTableOperating = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(getConfirmedCommentsFromServer.pending, pending);
        builder.addCase(getConfirmedCommentsFromServer.fulfilled, (state, action) => {
            state.confirmedComments = action.payload.comments
            state.itemsCountConfirmedComments = action.payload.allCommentsCount
            state.lastPageConfirmedComments = Math.ceil(action.payload?.allCommentsCount / state.itemsPerPageConfirmedComments)
            state.loadingConfirmedComments = false
        });
        builder.addCase(getConfirmedCommentsFromServer.rejected, reject);
        builder.addCase(deleteConfirmedCommentFromServer.fulfilled, (state, action) => {
            state.confirmedComments = state.confirmedComments.filter(item => item._id !== action.payload.id)
            state.itemsCountConfirmedComments--;
        });
    }
});

export const { setIsModalDeleteOpen, setIsModalConfirmOpen, setOperatingError, setSelectedId, setCurrentPageConfirmedComments, setError, setItemsCountConfirmedComments, setLastPageConfirmedComments, setLoading, addComment, setIsConfirmedTableOperating } = commentSlice.actions;

export default commentSlice.reducer;