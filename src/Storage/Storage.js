export const loadState = () => {
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

