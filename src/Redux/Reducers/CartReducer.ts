import { createSlice } from '@reduxjs/toolkit'

export interface CartState {
    cart: string
}
export interface CartSliceI {
    CartSlice: {
        cart: string
    }
}

const initialState: CartState = {
    cart: '[]',
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        saveCart: (state: CartState, action) => {
            state.cart = action.payload
        },
    },
})

export const { saveCart } = CartSlice.actions

export default CartSlice.reducer