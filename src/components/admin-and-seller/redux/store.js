import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from "./reducers/categories"

export const storeAdmin = configureStore({
    reducer: {
        // products: productsReducer,
        // users: usersReducer,
        // sellers: sellersReducer,
        categories: categoriesReducer,
        // subcategories: subcategoriesReducer,
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