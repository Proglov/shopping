
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