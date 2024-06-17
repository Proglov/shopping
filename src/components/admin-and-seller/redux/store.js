import { configureStore } from '@reduxjs/toolkit'
import subcategoriesReducer from "./reducers/subcategories"
import productsReducer from "./reducers/products"
import globalReducer from "./reducers/global"

export const storeAdmin = configureStore({
    reducer: {
        products: productsReducer,
        // users: usersReducer,
        // sellers: sellersReducer,
        subcategories: subcategoriesReducer,
        global: globalReducer,
        // transactions: transactionsReducer,
        // comments: commentsReducer,
    }
})