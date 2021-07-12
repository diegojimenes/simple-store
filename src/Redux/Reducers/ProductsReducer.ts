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
    products: Array<Products>,
    filteredProducts: Array<Products>
}
export interface ProductsSliceI {
    ProductsSlice: {
        products: Array<Products>,
        filteredProducts: Array<Products>
    }
}

const initialState: ProductsState = {
    products: [],
    filteredProducts: []
}

export const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        saveProduct: (state: ProductsState, action) => {
            state.products = action.payload
            state.filteredProducts = state.products
        },
        filterProduct: (state: ProductsState, action) => {
            if(!action.payload) state.filteredProducts = state.products
            else state.filteredProducts = state.products.filter(({ name }) => name.toUpperCase().includes(action.payload.toUpperCase()))
        },
    },
})

export const { saveProduct, filterProduct } = ProductsSlice.actions

export default ProductsSlice.reducer