import { ShoppingOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import './product.css'

interface productI {
    image: string,
    name: string,
    price: string
}

export const Product = (props: productI) => {
    const { image, name, price } = props
    return <>
        <div className="container">
            <img src={image} alt="Avatar" className="image" />
            <div className="middle">
                <div className="product-description-home">
                    <h2>
                        {name}
                    </h2>
                    <div>
                        <span>
                            {parseFloat(price).toLocaleString('BRL', { style: 'currency', currency: 'BRL' })}
                        </span>
                        <Button icon={<ShoppingOutlined />} size={'large'}>
                            Add to cart
                        </Button>
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
                    <Button icon={<ShoppingOutlined />} size={'large'}>
                        Add to cart
                    </Button>
                </div>
            </div>
        </div>
    </>
}