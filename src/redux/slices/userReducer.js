import { createSlice } from "@reduxjs/toolkit"

const initialState = {
userId:'', token:'', myProducts:[]
}

export const userSlice = createSlice({
  name: 'user', 
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setUserId: (state, action) => {
      state.userId = action.payload
    },
    setMyProduct: (state, action) => {
      state.myProducts.push(action.payload)
    },
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    editMyProduct: (state, action) => {
      const curentProd = state.myProducts.findIndex((el) => el._id === action.payload._id)
      state.myProducts.splice(curentProd, 1, action.payload )
    },
    dellMyProduct: (state, action) => {
      state.myProducts = state.myProducts.filter((el) => el._id !== action.payload._id)
    }
  }
})

export const {
  setToken, setUserId, setMyProduct, editMyProduct, dellMyProduct
} = userSlice.actions;

export default userSlice.reducer;