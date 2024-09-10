import { configureStore } from '@reduxjs/toolkit'
import globalReducer from "./reducers/global"
import subcategoriesReducer from "./reducers/subcategories"
import productsReducer from "./reducers/products"
import usersReducer from "./reducers/users"
import sellersReducer from "./reducers/sellers"
import commentsReducer from "./reducers/comments"
import transactionsReducer from "./reducers/transactions"
import transactionInPersonsReducer from "./reducers/transactionInPersons"
import festivalsReducer from "./reducers/discounts/festivals"
import majorShoppingsReducer from "./reducers/discounts/majorShopping"
import CompanyCouponForSomeProductsReducer from "./reducers/discounts/companyCouponForSomeProducts"

export const storeAdmin = configureStore({
    reducer: {
        products: productsReducer,
        users: usersReducer,
        sellers: sellersReducer,
        subcategories: subcategoriesReducer,
        global: globalReducer,
        transactions: transactionsReducer,
        transactionInPersons: transactionInPersonsReducer,
        comments: commentsReducer,
        festivals: festivalsReducer,
        majorShoppings: majorShoppingsReducer,
        companyCouponForSomeProducts: CompanyCouponForSomeProductsReducer,
    }
})