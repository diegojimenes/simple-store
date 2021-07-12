import { ShopOutlined } from '@ant-design/icons'
import { Button, Col, Result } from 'antd'
import _ from 'lodash'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Product } from '../../components/product'
import { Products, ProductsSliceI } from '../../Redux/Reducers/ProductsReducer'
import './home.css'

export const Home = () => {
    const products = useSelector((state: ProductsSliceI) => state.ProductsSlice.filteredProducts)
    const [page, setPage] = useState(0)
    const prods = _.chunk(products, 11).reduce((prod: Array<Products>, chuck: Array<Products>, index: number) => {
        if (index <= page) {
            return [...prod, ...chuck]
        } else {
            return [...prod]
        }
    }, [])

    const renderProducts = () => {
        if (prods.length === 0) return <div style={{ width: "100%" }}>
            <Result
                icon={<ShopOutlined />}
                title="No products found :("
            />
        </div>

        return prods.map(({ image, name, price, stock }, index) => {
            return <Product key={'product' + index} image={image} name={name} price={price} stock={stock} />
        })
    }

    const loadeMore = () => {
        let newPage = page + 1
        if (products.length !== newPage) {
            setPage(newPage)
        }
        else setPage(page)
    }
    
    return <div>
        <Col span={20} offset={2}>
            <main className="main-products">
                {renderProducts()}
            </main>
            {
                _.chunk(products, 11).length !== (page + 1) ?
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