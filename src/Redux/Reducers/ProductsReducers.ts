import { createSlice } from '@reduxjs/toolkit'

export interface Products {
    id: string,
    createdAt: string,
    name: string,
    price: string,
    image: string,
    stock: number
}

export interface ProductsState {
    products: Array<Products>
}
export interface ProductsSliceI {
    ProductsSlice: {
        products: Array<Products>
    }
}

const initialState: ProductsState = {
    products: [],
}

export const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        saveProduct: (state: ProductsState, action) => {
            state.products = action.payload
        },
    },
})

export const { saveProduct } = ProductsSlice.actions

export default ProductsSlice.reducer