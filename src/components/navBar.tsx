import './navBar.css'
import {
    ShoppingCartOutlined,
    SearchOutlined,
} from '@ant-design/icons'
import { Tooltip } from 'antd'
import { Link } from 'react-router-dom'

export const NavBar = () => {

    return <div>
        <nav className="main-nav">
            <div>
                <h2>LOGO</h2>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </div>
            <div>
                <Tooltip title="Search">
                    <button className="nav-button"><SearchOutlined /></button>
                </Tooltip>
                <Tooltip title="Cart">
                    <button className="nav-button"><ShoppingCartOutlined /></button>
                </Tooltip>
            </div>
        </nav>
    </div>
}