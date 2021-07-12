import { configureStore } from '@reduxjs/toolkit'
import ProductsSlice from './Reducers/ProductsReducer'
import CartSlice from './Reducers/CartReducer'

export const store = configureStore({
  reducer: {
    ProductsSlice,
    CartSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch