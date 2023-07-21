import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartReducer";
import favoritesReducer from "./slices/favoritesReducer";
import userReducer from "./slices/userReducer";

const persistaedState = localStorage.getItem('reduxState')?JSON.parse(localStorage.getItem('reduxState')):{}


export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    favorite: favoritesReducer
  },
  preloadedState: persistaedState
})

store.subscribe(() => localStorage.setItem('reduxState', JSON.stringify(store.getState())));