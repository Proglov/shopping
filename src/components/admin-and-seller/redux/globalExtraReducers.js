
export const reject = (state, action) => {
    state.error = action.payload.message
    state.loading = false
};
export const pending = (state) => {
    state.loading = true
}

// categories
export const getCategoryFulfilled = (state, action) => {
    state.items = action.payload.categories
    state.itemsCount = action.payload.allCategoriesCount
    state.lastPage = Math.ceil(action.payload?.allCategoriesCount / state.itemsPerPage)
    state.loading = false
};
export const addCategoryFulfilled = (state, action) => {
    state.items.push(action.payload.category);
    state.itemsCount++;
};


//subcategories
export const getSubcategoriesFulfilled = (state, action) => {
    state.items = action.payload.subcategories
    state.itemsCount = action.payload.allSubcategoriesCount
    state.lastPage = Math.ceil(action.payload?.allSubcategoriesCount / state.itemsPerPage)
    state.loading = false
}
export const addSubcategoriesFulfilled = (state, action) => {
    state.items.push(action.payload.subcategory)
    state.itemsCount++;
}


//products
export const getProductsFulfilled = (state, action) => {
    state.items = action.payload.products
    state.itemsCount = action.payload.allProductsCount
    state.lastPage = Math.ceil(action.payload?.allProductsCount / state.itemsPerPage)
    state.loading = false
}
export const addProductsFulfilled = (state, action) => {
    state.items.push(action.payload.product)
    state.itemsCount++;
}
export const deleteProductFulfilled = (state, action) => {
    state.items = state.items.filter(item => item._id !== action.payload._id)
    state.itemsCount--;
}
export const updateProductFulfilled = (state, action) => {
    state.items = state.items.map(item => {
        if (item._id === action.payload.product._id) {
            return action.payload.product
        }
        return item
    })
}


//users
export const getUsersFulfilled = (state, action) => {
    state.items = action.payload.users
    state.itemsCount = action.payload.usersCount
    state.lastPage = Math.ceil(action.payload?.usersCount / state.itemsPerPage)
    state.loading = false
}
export const deleteUserFulfilled = (state, action) => {
    state.items = state.items.filter(item => item._id !== action.payload._id)
    state.itemsCount--;
}


//sellers
export const getInvalidatedSellersFulfilled = (state, action) => {
    state.items = action.payload.sellers
    state.itemsCount = action.payload.allSellersCount
    state.lastPage = Math.ceil(action.payload?.allSellersCount / state.itemsPerPage)
    state.loading = false
}
export const deleteSellerFulfilled = (state, action) => {
    state.items = state.items.filter(item => item._id !== action.payload.id)
    state.itemsCount--;
}
export const validateSellerFulfilled = (state, action) => {
    state.items = state.items.filter(item => item._id !== action.payload.seller._id)
    state.itemsCount--;
}


//comments
export const getInvalidatedCommentsFulfilled = (state, action) => {
    state.items = action.payload.comments
    state.itemsCount = action.payload.allCommentsCount
    state.lastPage = Math.ceil(action.payload?.allCommentsCount / state.itemsPerPage)
    state.loading = false
}
export const deleteCommentFulfilled = (state, action) => {
    state.items = state.items.filter(item => item._id !== action.payload.id)
    state.itemsCount--;
}
export const validateCommentFulfilled = (state, action) => {
    state.items = state.items.filter(item => item._id !== action.payload.comment._id)
    state.itemsCount--;
}


//TXs
export const getFutureTXsFulfilled = (state, action) => {
    state.items = action.payload.transactions
    state.itemsCount = action.payload.transactionsCount
    state.lastPage = Math.ceil(action.payload?.transactionsCount / state.itemsPerPage)
    state.loading = false
}
export const updateTXDoneFulfilled = (state, action) => {
    state.items = state.items.map(item => {
        if (item._id === action.payload.transaction._id)
            item.done = !item.done
        return item
    })
}