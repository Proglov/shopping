import { configureStore } from '@reduxjs/toolkit'
import subcategoriesReducer from "./reducers/subcategories"
import globalReducer from "./reducers/global"

export const storeAdmin = configureStore({
    reducer: {
        // products: productsReducer,
        // users: usersReducer,
        // sellers: sellersReducer,
        subcategories: subcategoriesReducer,
        global: globalReducer,
        // transactions: transactionsReducer,
        // comments: commentsReducer,
    }
})

export const storeSeller = configureStore({
    reducer: {
        // products: productsReducer,
        // users: usersReducer,
        // sellers: sellersReducer,
        // categories: categoriesReducer,
        // subcategories: subcategoriesReducer,
        // transactions: transactionsReducer,
        // comments: commentsReducer,
    }
})