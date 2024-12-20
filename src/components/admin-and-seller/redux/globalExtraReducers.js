
export const reject = (state, action) => {
    state.error = action.payload.message
    state.loading = false
    state.addDataLoading = false
};
export const pending = (state) => {
    state.loading = true
}
export const addDataPending = (state) => {
    state.addDataLoading = true
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

// provinces
export const getProvinceFulfilled = (state, action) => {
    state.items = action.payload.provinces
    state.itemsCount = action.payload.allProvincesCount
    state.lastPage = Math.ceil(action.payload?.allProvincesCount / state.itemsPerPage)
    state.loading = false
};
export const addProvinceFulfilled = (state, action) => {
    state.items.push(action.payload.province);
    state.itemsCount++;
};

//cities
export const getCitiesFulfilled = (state, action) => {
    state.items = action.payload.cities
    state.itemsCount = action.payload.allCitiesCount
    state.lastPage = Math.ceil(action.payload?.allCitiesCount / state.itemsPerPage)
    state.loading = false
}
export const addCitiesFulfilled = (state, action) => {
    state.items.push(action.payload.city)
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
    state.addDataLoading = false
}
export const updateProductFulfilled = (state, action) => {
    state.items = state.items.map(item => {
        if (item._id === action.payload.product._id) {
            return action.payload.product
        }
        return item
    })
}

//warehouses
export const getWarehousesFulfilled = (state, action) => {
    state.items = action.payload.warehouses
    state.itemsCount = action.payload.allWarehousesCount
    state.lastPage = Math.ceil(action.payload?.allWarehousesCount / state.itemsPerPage)
    state.loading = false
}
export const addWarehousesFulfilled = (state, action) => {
    state.items.push(action.payload.warehouse)
    state.itemsCount++;
    state.addDataLoading = false
}
export const updateWarehouseFulfilled = (state, action) => {
    state.items = state.items.map(item => {
        if (item._id === action.payload.warehouse._id) {
            return action.payload.warehouse
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


//userInPersons
export const getUserInPersonsFulfilled = (state, action) => {
    state.items = action.payload.users
    state.itemsCount = action.payload.usersCount
    state.lastPage = Math.ceil(action.payload?.usersCount / state.itemsPerPage)
    state.loading = false
}
export const addUserInPersonFulfilled = (state, action) => {
    state.items.push(action.payload.user)
    state.itemsCount++;
    state.addDataLoading = false
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
export const updateTXStatusFulfilled = (state, action) => {
    state.items.forEach(item => {
        if (item._id === action.payload.id) item.status = action.payload.newStatus
        return item
    });
}
export const cancelTXFulfilled = (state, action) => {
    state.items.forEach(item => {
        if (item._id === action.payload.id) item.status = 'Canceled'
        return item
    });
}


//transactionInPersons
export const getTransactionInPersonsFulfilled = (state, action) => {
    state.items = action.payload.transactions
    state.itemsCount = action.payload.transactionsCount
    state.lastPage = Math.ceil(action.payload?.transactionsCount / state.itemsPerPage)
    state.loading = false
}
export const addTransactionInPersonFulfilled = (state, action) => {
    state.items.push(action.payload.transaction)
    state.itemsCount++;
    state.addDataLoading = false
}

//festivals
export const GetFestivalProductsFulfilled = (state, action) => {
    state.items = action.payload.products
    state.itemsCount = action.payload.allProductsCount
    state.lastPage = Math.ceil(action.payload?.allProductsCount / state.itemsPerPage)
    state.loading = false
}
export const addFestivalFulfilled = (state, action) => {
    if (action.payload.status === 400) {
        state.error = action.payload.message
    } else {
        state.items.push(action.payload)
        state.itemsCount++;
    }
    state.addDataLoading = false
}
export const deleteFestivalFulfilled = (state, action) => {
    state.items = state.items.filter((item) => item._id !== action.payload)
    state.itemsCount--;
}

//majorShoppings
export const GetMajorShoppingProductsFulfilled = (state, action) => {
    state.items = action.payload.products
    state.itemsCount = action.payload.allProductsCount
    state.lastPage = Math.ceil(action.payload?.allProductsCount / state.itemsPerPage)
    state.loading = false
}
export const addMajorShoppingFulfilled = (state, action) => {
    if (action.payload.status === 400) {
        state.error = action.payload.message
    } else {
        state.items.push(action.payload)
        state.itemsCount++;
    }
    state.addDataLoading = false
}
export const deleteMajorShoppingFulfilled = (state, action) => {
    state.items = state.items.filter((item) => item._id !== action.payload)
    state.itemsCount--;
}

//companyCouponForSomeProducts
export const GetCompanyCouponForSomeProductsProductsFulfilled = (state, action) => {
    state.items = action.payload.products
    state.itemsCount = action.payload.allProductsCount
    state.lastPage = Math.ceil(action.payload?.allProductsCount / state.itemsPerPage)
    state.loading = false
}
export const addCompanyCouponForSomeProductsFulfilled = (state, action) => {
    if (action.payload.status === 400) {
        state.error = action.payload.message
    } else {
        state.items.push(action.payload)
        state.itemsCount++;
    }
    state.addDataLoading = false
}
export const deleteCompanyCouponForSomeProductsFulfilled = (state, action) => {
    state.items = state.items.filter((item) => item._id !== action.payload)
    state.itemsCount--;
}