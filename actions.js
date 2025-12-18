export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
export const LOAD_USER_CART = 'LOAD_USER_CART';

export const addToCart = (film) => {
  return {
    type: ADD_TO_CART,
    payload: film
  };
};

export const removeFromCart = (item) => {
  return {
    type: REMOVE_FROM_CART,
    payload: item 
  };
};

export const increaseQuantity = (item) => {
  return {
    type: INCREASE_QUANTITY,
    payload: item 
  };
};

export const decreaseQuantity = (item) => {
  return {
    type: DECREASE_QUANTITY,
    payload: item 
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART
  };
};

export const loadUserCart = () => {
  const getCartKey = () => {
    const userEmail = localStorage.getItem('userEmail');
    return userEmail ? `cart_${userEmail}` : 'cart_guest';
  };

  try {
    const cartKey = getCartKey();
    const serializedState = localStorage.getItem(cartKey);
    if (serializedState === null) {
      return {
        type: LOAD_USER_CART,
        payload: { items: [] }
      };
    }
    return {
      type: LOAD_USER_CART,
      payload: JSON.parse(serializedState)
    };
  } catch (err) {
    console.error('Error loading user cart:', err);
    return {
      type: LOAD_USER_CART,
      payload: { items: [] }
    };
  }
};

