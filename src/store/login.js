import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "@/services/withAuthActivities/user"
import Api2 from "@/services/withAuthActivities/seller"


// if the last time the user logged in is longer than one day, they need to get in again!
export const checkIfCheckLoginIsRequired = () => {
    const nowTime = (new Date()).getTime()
    const lastLogin = parseInt(localStorage.getItem("lastLogin"))
    return (nowTime - lastLogin) > 86400000
}

const initialState = ""

export const checkAndSetLoginStatus = createAsyncThunk(
    "login/checkAndSetLoginStatus",
    async () => {
        const { getMe } = Api
        const { getMeSeller } = Api2
        try {
            const res = await getMe()
            if (res?.user == null) throw new Error('not user')
            return 'user'
        } catch (error) {
            try {
                const response = await getMeSeller()
                if (response?.seller == null) throw new Error('not seller')
                return 'seller'
            } catch (err) {
                return ''
            }
        }
    }
)

export const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        CheckLogin: () => {
            return localStorage.getItem("login");
        },
        SetLogin: (_state, action) => {
            const newState = action.payload.status;
            localStorage.setItem("login", newState);
            if (newState !== '') localStorage.setItem("token", action.payload.token);
            else localStorage.removeItem("token");
            localStorage.setItem("lastLogin", (new Date().getTime()));
            return newState;
        }
    },
    extraReducers: builder => {
        builder.addCase(checkAndSetLoginStatus.fulfilled, (_state, action) => {
            localStorage.setItem("login", action.payload);
            if (action.payload === '') {
                localStorage.removeItem("token");
            }
            return action.payload
        });
    }
});

export const { SetLogin, CheckLogin } = LoginSlice.actions;

export default LoginSlice.reducer;