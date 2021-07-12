import { Button, Col } from 'antd'
import _ from 'lodash'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Product } from '../../components/product'
import { ProductsSliceI } from '../../Redux/Reducers/ProductsReducers'
import './home.css'

export const Home = () => {
    const products = _.chunk(useSelector((state: ProductsSliceI) => state.ProductsSlice.products), 11)
    const [page, setPage] = useState(0)
    const [currentProduct, setCurrentProduct] = useState(products[page])

    const renderProducts = () => {
        return currentProduct.map(({ image, name, price, stock }, index) => {
            return <Product key={'product' + index} image={image} name={name} price={price} stock={stock} />
        })
    }

    const loadeMore = () => {
        let newPage = page + 1
        if (products.length !== newPage) {
            setPage(newPage)
            setCurrentProduct([...currentProduct, ...products[newPage]])
        }
        else setPage(page)
    }

    return <div>
        <Col span={20} offset={2}>
            <main className="main-products">
                {renderProducts()}
            </main>
            {
                products.length !== (page + 1) ?
                    <div style={{ margin: 15 }}>
                        <Button
                            style={{ fontWeight: 'bold' }}
                            block
                            onClick={loadeMore}
                            size={'large'}>
                            Load more
                        </Button>
                    </div>
                    : null
            }
        </Col>
    </div>
}