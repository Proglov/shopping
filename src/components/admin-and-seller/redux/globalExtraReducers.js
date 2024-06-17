
// categories
export const getCategoryPending = (state) => {
    state.loading = true
};
export const getCategoryFulfilled = (state, action) => {
    state.items = action.payload.categories
    state.itemsCount = action.payload.allCategoriesCount
    state.lastPage = Math.ceil(action.payload?.allCategoriesCount / state.itemsPerPage)
    state.loading = false
};
export const getCategoryReject = (state, action) => {
    state.error = action.payload.message
    state.loading = false
};
export const addCategoryFulfilled = (state, action) => {
    state.items.push(action.payload.category);
    state.itemsCount++;
};


//subcategories
export const getSubcategoriesPending = (state) => {
    state.loading = true
}
export const getSubcategoriesFulfilled = (state, action) => {
    state.items = action.payload.subcategories
    state.itemsCount = action.payload.allSubcategoriesCount
    state.lastPage = Math.ceil(action.payload?.allSubcategoriesCount / state.itemsPerPage)
    state.loading = false
}
export const getSubcategoriesReject = (state, action) => {
    state.error = action.payload.message
    state.loading = false
}
export const addSubcategoriesFulfilled = (state, action) => {
    state.items.push(action.payload.subcategory)
    state.itemsCount++;
}


//products
export const getProductsPending = (state) => {
    state.loading = true
}
export const getProductsFulfilled = (state, action) => {
    state.items = action.payload.products
    state.itemsCount = action.payload.allProductsCount
    state.lastPage = Math.ceil(action.payload?.allProductsCount / state.itemsPerPage)
    state.loading = false
}
export const getProductsReject = (state, action) => {
    state.error = action.payload.message
    state.loading = false
}
export const addProductsFulfilled = (state, action) => {
    state.items.push(action.payload.subcategory)
    state.itemsCount++;
}