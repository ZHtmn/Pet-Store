import { createSlice } from "@reduxjs/toolkit"

const initialState = {
items:[]
}

export const favoritesReducer = createSlice({
  name: 'favorite', 
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      const curentItem = state.items.find((obj) => obj._id === action.payload._id)
      if (curentItem) {
      }
      else {
        state.items.push(action.payload)
      }
    },
    deleteFavorite: (state, action) => {
      state.items = state.items.filter((obj) => obj._id !== action.payload._id)
    },
    dellCurt: (state, action) => {
      state.items = []
    }
  }
})
export const selectCurentItem = (id) => (state) => state.favorite.items.find((obj) => obj._id === id)

export const selectItems = (state) => state.favorite.items

export const {
  addFavourite, deleteFavorite, dellCurt
} = favoritesReducer.actions;

export default favoritesReducer.reducer;