import React, { createContext, useState } from "react";

// Create Cart Context
export const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  // Update or add item to the cart with the quantity
  const updateCart = (foodItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === foodItem.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === foodItem.id ? { ...item, quantity: foodItem.quantity } : item
        );
      } else {
        return [...prevCart, foodItem];
      }
    });
  };

  const setUserInformation = (foodItem) => {
    setUserInfo()
  }
  // Clear the cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, updateCart, setCart, clearCart, userInfo, setUserInformation }}>
      {children}
    </CartContext.Provider>
  );
};
