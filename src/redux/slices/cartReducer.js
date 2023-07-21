import { createSlice } from "@reduxjs/toolkit"
import calculatePriceAndCount from "../../utils/calculatePriceAndCount"

const initialState = {
items:[], totalPrice:0, totalCount:0
}

export const cartSlice = createSlice({
  name: 'cart', 
  initialState,
  reducers: {
    addItem: (state, action) => {
      const curentItem = state.items.find((obj) => obj._id === action.payload._id)
      if (curentItem) {
        curentItem.count++
      } else {
        state.items.push({...action.payload, count:1})
      }
      calculatePriceAndCount(state)
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((obj) => obj._id !== action.payload._id)
      calculatePriceAndCount(state)
    },
    decrement: (state, action) => {
      const curentItem = state.items.find((obj) => obj._id === action.payload._id)
      if (curentItem) {
        curentItem.count--
      } 
      calculatePriceAndCount(state)
    },
    dellCurt: (state, action) => {
      state.items = []
      state.totalCount = 0
      state.totalPrice = 0
    }
  }
})

export const {
  addItem, deleteItem, decrement, dellCurt
} = cartSlice.actions;

export default cartSlice.reducer;