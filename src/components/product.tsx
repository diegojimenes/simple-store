import { ShoppingOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CartSliceI, saveCart } from '../Redux/Reducers/CartReducer'
import './product.css'

interface productI {
    image: string,
    name: string,
    price: string,
    stock: number
}

export const Product = (props: productI) => {
    const { image, name, price, stock } = props
    const cart = useSelector((state: CartSliceI) => state.CartSlice.cart)

    const [load, setLoad] = useState(false)
    const dispatch = useDispatch()

    const removeFromCart = () => {
        setLoad(true)
        let cartParse = JSON.parse(cart)
        const Item = cartParse.find((item: any) => item.name === name)
        const newCart = cartParse.filter((item: any) => {
            return item.key !== Item.key
        })
        localStorage.setItem('myCart', JSON.stringify(newCart))
        dispatch(saveCart(JSON.stringify(newCart)))
        setLoad(false)
    }

    const addToCart = async () => {
        setLoad(true)
        let cartParse = JSON.parse(cart)
        let product = {
            key: cartParse.length + 1,
            image: image,
            name: name,
            amount: 1,
            price: price,
            stock
        }
        const newCart = [...cartParse, product]
        await localStorage.setItem('myCart', JSON.stringify(newCart))
        dispatch(saveCart(JSON.stringify(newCart)))
        setLoad(false)
    }

    const icart = () => JSON.parse(cart).find((item: any) => item.name === name)

    return <>
        <div className="container">
            <div className="wrap-image">
                <img src={image} alt="" />
            </div>
            <div className="middle">
                <div className="product-description-home">
                    <h2>
                        {name}
                    </h2>
                    <div>
                        <span>
                            {parseFloat(price).toLocaleString('BRL', { style: 'currency', currency: 'BRL' })}
                        </span>
                        {icart() ?
                            <Button icon={<ShoppingOutlined />} size={'large'} loading={load} onClick={removeFromCart}>
                                remove from cart
                            </Button>
                            : <Button icon={<ShoppingOutlined />} size={'large'} loading={load} onClick={addToCart}>
                                Add to cart
                            </Button>}
                    </div>
                </div>
            </div>
            <div className="product-description-home-mobile">
                <h2>
                    {name}
                </h2>
                <div>
                    <span>
                        {parseFloat(price).toLocaleString('BRL', { style: 'currency', currency: 'BRL' })}
                    </span>
                    {icart() ?
                        <Button icon={<ShoppingOutlined />} size={'large'} onClick={removeFromCart}>
                            remove from cart
                        </Button>
                        : <Button icon={<ShoppingOutlined />} size={'large'} onClick={addToCart}>
                            Add to cart
                        </Button>}
                </div>
            </div>
        </div>
    </>
}