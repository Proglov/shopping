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

export const getTotalPrice = (products) => products.reduce((accumulator, currentObject) => {
  if (currentObject?.which === 'major' && currentObject.number >= currentObject?.quantity)
    return accumulator + (currentObject.price * currentObject.number) * (1 - currentObject?.majorOffPercentage / 100)

  if (currentObject?.which === 'festival' && currentObject?.until > Date.now())
    return accumulator + (currentObject.price * currentObject.number) * (1 - currentObject?.festivalOffPercentage / 100)

  return accumulator + currentObject.price * currentObject.number
}, 0).toString() | "0";

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
        number: product.number,
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

export const setOffCodeToken = ({ token, body, productsIds, maxOffPrice, minBuy, offPercentage }) => {
  const now = Date.now()
  localStorage.setItem("offCode", JSON.stringify({
    token,
    body,
    productsIds,
    maxOffPrice,
    minBuy,
    offPercentage,
    date: now
  }));
}

export const getOffCodeBody = () => {
  const obj = JSON.parse(localStorage.getItem("offCode"));
  if (obj === null) return '';

  const now = Date.now();

  if (now - obj?.date > 300000) {
    localStorage.removeItem('offCode')
    return ''
  }

  return obj
}