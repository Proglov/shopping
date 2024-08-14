import Api from "@/services/withoutAuthActivities/product"

export const loadCartState = () => {
  try {
    const serialState = localStorage.getItem("cart");
    if (serialState === null) {
      return [];
    }
    return JSON.parse(serialState);
  } catch (err) {
    return [];
  }
};

export const loadAddressAndTimeState = () => {
  try {
    const serialState = localStorage.getItem("AddressAndTime");
    return JSON.parse(serialState) || { address: '', day: 0, time: 0 };
  } catch (err) {
    return {};
  }
};


export const getCounterProducts = () => loadCartState()?.reduce((accumulator, currentObject) => accumulator + currentObject.number, 0).toString() | "0";

export const getCounterProductsWithoutLS = products => products?.reduce((accumulator, currentObject) => accumulator + currentObject.number, 0).toString() | "0";

export const getTotalPrice = (products) => products.reduce((accumulator, currentObject) => accumulator + currentObject.price * currentObject.number, 0).toString() | "0";

export const getCartProductsFromServer = async () => {
  const { getSomeProducts } = Api
  const products = loadCartState();
  const ids = products.map(obj => obj._id)
  let newProducts = []
  try {
    const res = await getSomeProducts(ids)
    products.map(product => {
      const indx = res.products.findIndex(item => item._id === product._id)
      const { __v, imagesName, ...obj } = res.products[indx]
      newProducts.push({
        ...obj,
        number: product.number
      })
    })
    return newProducts
  } catch (error) {
    return []
  }
}

export const calculateDate = (day, time) => {
  const date = new Date();

  date.setDate(date.getDate() + day)
  date.setHours(time + 7)
  date.setMinutes(0)

  return date
}