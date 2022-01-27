import React, { createContext, useReducer, useContext} from "react";
import products from "../products";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const initialState = { cart: [] };

function reducer(state, { type, payload }) {
  switch (type) {
    case 'ADD':
      return {
        ...state,
        cart: [...state.cart, products.find((p) => p.sku === payload)]
      };
    case 'REMOVE':
      const indexInCart = state.cart.findIndex((p) => p.sku === payload);
      const newCart = [...state.cart];
      newCart.splice(indexInCart, 1);
      return { ...state, cart: newCart };
    case 'EMPTY':
      return { cart: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addItem = (sku) => dispatch({ type: 'ADD', payload: sku });
  const removeItem = (sku) => dispatch({ type: 'REMOVE', payload: sku });
  const emptyCart = () => dispatch({ type: 'EMPTY' });

  function countItemsInCart(sku) {
    const itemsInCart = state.cart.filter((p) => p.sku === sku) ?? [];
    return itemsInCart.length
  }

  function groupCartItems() {
    return state.cart.reduce((newCart, product) => {
      // check newCart for product
      const indexInCart = newCart.findIndex(p => p.sku === product.sku);
      const isInCart = indexInCart !== -1;

      if (isInCart) {
        newCart[indexInCart].quantity += 1;
        return newCart
      }

      // if not in array, add it
      newCart.push({ ...product, quantity: 1 });
      return newCart;
    }, [])

  }

  function totalPrice() {
    return groupCartItems().reduce((totalPrice, product) => {
      return totalPrice + product.price * product.quantity;
    }, 0)
  }

  return (
    <CartContext.Provider value={{
      addItem,
      removeItem,
      emptyCart,
      cart: state.cart,
      cartGroupedByItems: groupCartItems(),
      countItemsInCart,
      totalPrice: totalPrice()
    }}>
      {children}
    </CartContext.Provider>
  )
}