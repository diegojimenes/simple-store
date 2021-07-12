import './navBar.css'
import {
    ShoppingCartOutlined,
    SearchOutlined,
} from '@ant-design/icons'
import { Badge, Input, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { filterProduct } from '../Redux/Reducers/ProductsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { CartSliceI } from '../Redux/Reducers/CartReducer';
const { Search } = Input;
export const NavBar = () => {
    const [search, setSearch] = useState(false)
    const cart = useSelector((state: CartSliceI) => state.CartSlice.cart)
    const dispatch = useDispatch()
    return <div>
        <nav className="main-nav">
            <div>
                <h2>LOGO</h2>
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </div>
            <div>
                <Tooltip title="Search">
                    <button className="nav-button" onClick={() => setSearch(!search)}><SearchOutlined /></button>
                </Tooltip>
                <Tooltip title="Cart">
                    <Badge count={JSON.parse(cart).length}>
                        <Link to="/cart"><button className="nav-button"><ShoppingCartOutlined /></button></Link>
                    </Badge>
                </Tooltip>

            </div>
        </nav>
        {
            search ?
                <Search
                    placeholder="Search a product"
                    size="large"
                    onChange={(e) => {
                        dispatch(filterProduct(e.target.value))
                    }}
                    style={{
                        width: '81vw',
                        marginLeft: '9vw',
                        marginTop: 15
                    }} />
                : null
        }
    </div>
}