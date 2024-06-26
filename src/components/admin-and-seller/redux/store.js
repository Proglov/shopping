import { configureStore } from '@reduxjs/toolkit'
import globalReducer from "./reducers/global"
import subcategoriesReducer from "./reducers/subcategories"
import productsReducer from "./reducers/products"
import usersReducer from "./reducers/users"
import sellersReducer from "./reducers/sellers"
import commentsReducer from "./reducers/comments"
import transactionsReducer from "./reducers/transactions"

export const storeAdmin = configureStore({
    reducer: {
        products: productsReducer,
        users: usersReducer,
        sellers: sellersReducer,
        subcategories: subcategoriesReducer,
        global: globalReducer,
        transactions: transactionsReducer,
        comments: commentsReducer,
    }
})