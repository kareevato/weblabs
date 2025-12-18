import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CLEAR_CART
} from './actions';

const loadCartFromStorage = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return { items: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading cart from localStorage:', err);
    return { items: [] };
  }
};

const saveCartToStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    console.error('Error saving cart to localStorage:', err);
  }
};

const initialState = loadCartFromStorage();

const cartReducer = (state = initialState, action) => {
  let newState;
  
  switch (action.type) {
    case ADD_TO_CART: {
      const payloadQuality = action.payload.quality || 720;
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && (item.quality || 720) === payloadQuality
      );
      
      if (existingItem) {
        newState = {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id && (item.quality || 720) === payloadQuality
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }]
        };
      }
      saveCartToStorage(newState);
      return newState;
    }

    case REMOVE_FROM_CART: {
      const payloadId = action.payload.id || action.payload;
      const payloadQuality = action.payload.quality || 720;
      
      newState = {
        ...state,
        items: state.items.filter(item => 
          !(item.id === payloadId && (item.quality || 720) === payloadQuality)
        )
      };
      saveCartToStorage(newState);
      return newState;
    }

    case INCREASE_QUANTITY: {
      const payloadId = action.payload.id || action.payload;
      const payloadQuality = action.payload.quality || 720;
      
      newState = {
        ...state,
        items: state.items.map(item =>
          item.id === payloadId && (item.quality || 720) === payloadQuality
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
      saveCartToStorage(newState);
      return newState;
    }

    case DECREASE_QUANTITY: {
      const payloadId = action.payload.id || action.payload;
      const payloadQuality = action.payload.quality || 720;
      
      newState = {
        ...state,
        items: state.items.map(item =>
          item.id === payloadId && (item.quality || 720) === payloadQuality
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
      };
      saveCartToStorage(newState);
      return newState;
    }

    case CLEAR_CART:
      newState = {
        ...state,
        items: []
      };
      saveCartToStorage(newState);
      return newState;

    default:
      return state;
  }
};

export default cartReducer;


