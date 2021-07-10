import { configureStore } from '@reduxjs/toolkit'
import ProductsSlice from './Reducers/ProductsReducers'

export const store = configureStore({
  reducer: {
    ProductsSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch